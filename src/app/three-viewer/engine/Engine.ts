import { IDestroyable } from './interface/IDestroyable';
import { RendererHolder } from './holder/RendererHolder';
import { IResizable } from './interface/IResizable';
import { IUpdatable } from './interface/IUpdatable';
import { WindowSize } from './handler/size/IWindowSize';
import { Mesh, Scene } from 'three';
import { ControlsHolder } from './holder/ControlsHolder';
import { CameraHolder } from './holder/CameraHolder';
import { World } from './world/World';
import { TimeHandler } from './handler/time/TimeHandler';
import { SizeHandler } from './handler/size/SizeHandler';
import { Subscription } from 'rxjs';
import { DebugGUI } from './debug/DebugGUI';

/**
 * Core element of the viewer.
 * It orchestrates the instantiation of the core ThreeJS ecosystem's components (scene,
 * renderer, ...).
 * It is listening to some handlers to communicate the behaviour to follow to its "children".
 */
export class Engine implements IResizable, IUpdatable, IDestroyable {
  /**
   * Instance of the lil-gui panel to tweak your elements.
   * @private
   */
  private readonly debugGUI = new DebugGUI();

  /**
   * Handler that notifies on each frame, and gives some information on elapsed time and so on.
   * Engine uses it to update the elements of the 3D experience.
   * @private
   */
  private readonly timeHandler: TimeHandler = new TimeHandler();
  /**
   * Handler that informs about the size of the viewport, and the pixel ratio of the device.
   * Engine uses it to resize the elements of the 3D experience when the resize event occurs.
   * @private
   */
  private readonly sizeHandler: SizeHandler = new SizeHandler();

  /**
   * ThreeJS scene
   * @private
   */
  private readonly scene = new Scene();

  /**
   * Holder that sets up the ThreeJS camera.
   * @private
   */
  private readonly cameraHolder = new CameraHolder(this.scene, this.sizeHandler.getSize());
  /**
   * Holder that sets up the ThreeJS renderer with all the settings of the experience.
   * @private
   */
  private readonly rendererHolder = new RendererHolder(this.scene, this.cameraHolder.instance, this.canvas, this.sizeHandler.getSize());
  /**
   * Holder that binds the controls to the camera and sets the controls' parameters.
   * @private
   */
  private readonly controlsHolder = new ControlsHolder(this.cameraHolder.instance, this.canvas);

  /**
   * Container for all the 3D objects that will show up in the scene with their resources loaded.
   * @private
   */
  private readonly world = new World(this.scene, this.timeHandler, this.debugGUI);

  /**
   * List of the elements that need to be updated on each tick.
   * @private
   */
  private readonly updatableList: IUpdatable[] = [
    this.rendererHolder,
    this.controlsHolder,
    this.world
  ];
  /**
   * List of the elements that need to be resized when the event is triggered
   * @private
   */
  private readonly resizableList: IResizable[] = [
    this.cameraHolder,
    this.rendererHolder,
  ];
  /**
   * List of the elements that need to be disposed/destroyed at the end of the engine's lifecycle.
   * @private
   */
  private readonly destroyableList: IDestroyable[] = [
    this.controlsHolder,
    this.rendererHolder,
    this.debugGUI
  ];

  /**
   * List of the subscriptions that need to be revoked at the end of the engine's lifecycle to avoid memory leaks.
   * @private
   */
  private readonly subscriptionList: Subscription[] = [];

  /**
   * Constructor
   * @param canvas Reference to the canvas of the parent viewer
   */
  constructor(readonly canvas: HTMLCanvasElement,
  ) {
    this.subscriptionList.push(
      this.sizeHandler.listen()
          .subscribe((size) => this.resize(size)),
      this.timeHandler.listen()
          .subscribe(() => this.update())
    );
  }

  /**
   * Resizes all the elements contained in the list of updatable objects
   * @param size New information about the size and the new pixel ratio
   */
  resize(size: WindowSize): void {
    this.resizableList.forEach((resizable) => resizable.resize(size));
  }

  /**
   * Update all the elements that were added to the updatable list on each frame.
   */
  update(): void {
    this.updatableList.forEach((updatable) => updatable.update());
  }

  /**
   * Destroys all the destroyable elements of the corresponding list, unsubscribe from handlers' observable and dispose from all the left elements of the scene.
   */
  destroy(): void {
    this.subscriptionList.forEach((subscription) => subscription.unsubscribe());
    this.scene.traverse((child) => {
      if (child instanceof Mesh) {
        child.geometry.dispose();

        for (const key in child.material) {
          const value = child.material[key];
          if (value && typeof value.dispose === 'function') {
            value.dispose();
          }
        }
      }
    });
    this.destroyableList.forEach((destroyable) => destroyable.destroy());
  }

}

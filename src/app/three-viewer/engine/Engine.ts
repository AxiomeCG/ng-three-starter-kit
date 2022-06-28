import { IDestroyable } from './interface/IDestroyable';
import { RendererHolder } from './holder/RendererHolder';
import { IResizable } from './interface/IResizable';
import { IUpdatable } from './interface/IUpdatable';
import { ISize } from './service/size/ISize';
import { Mesh, Scene } from 'three';
import { ControlsHolder } from './holder/ControlsHolder';
import { CameraHolder } from './holder/CameraHolder';
import { World } from './world/World';
import { DebugGUI } from './debug/DebugGUI';
import { IExperienceTime } from './service/time/IExperienceTime';
import { IPointerSensible } from './interface/IPointerSensible';

/**
 * Core element of the viewer.
 * It orchestrates the instantiation of the core ThreeJS ecosystem's components (scene,
 * renderer, ...).
 */
export class Engine implements IResizable, IUpdatable, IDestroyable, IPointerSensible {
  /**
   * Instance of the lil-gui panel to tweak your elements.
   * @private
   */
  private readonly debugGUI = new DebugGUI();

  /**
   * ThreeJS scene
   * @private
   */
  private readonly scene = new Scene();

  /**
   * Holder that sets up the ThreeJS camera.
   * @private
   */
  private readonly cameraHolder;
  /**
   * Holder that sets up the ThreeJS renderer with all the settings of the experience.
   * @private
   */
  private readonly rendererHolder;
  /**
   * Holder that binds the controls to the camera and sets the controls' parameters.
   * @private
   */
  private readonly controlsHolder;

  /**
   * Container for all the 3D objects that will show up in the scene with their resources loaded.
   * @private
   */
  private readonly world = new World(this.scene, this.debugGUI);

  /**
   * List of the elements that need to be updated on each tick.
   * @private
   */
  private readonly updatableList: IUpdatable[];
  /**
   * List of the elements that need to be resized when the event is triggered
   * @private
   */
  private readonly resizableList: IResizable[];
  /**
   * List of the elements that need to be disposed/destroyed at the end of the engine's lifecycle.
   * @private
   */
  private readonly destroyableList: IDestroyable[];

  /**
   * Constructor
   * @param canvas Reference to the canvas of the parent viewer
   */
  constructor(canvas: HTMLCanvasElement) {
    this.cameraHolder = new CameraHolder(this.scene);
    this.rendererHolder = new RendererHolder(this.scene, this.cameraHolder.instance, canvas);
    this.controlsHolder = new ControlsHolder(this.cameraHolder.instance, canvas);

    this.updatableList = [
      this.rendererHolder,
      this.controlsHolder,
      this.world
    ];

    this.resizableList = [
      this.cameraHolder,
      this.rendererHolder,
    ];

    this.destroyableList = [
      this.controlsHolder,
      this.rendererHolder
    ];
  }

  /**
   * Resizes all the elements contained in the list of updatable objects
   * @param size New information about the size and the new pixel ratio
   */
  resize(size: ISize): void {
    this.resizableList.forEach((resizable) => resizable.resize(size));
  }

  /**
   * Update all the elements that were added to the updatable list on each frame.
   * @param experienceTime Bundle of time information about the frame
   */
  update(experienceTime: IExperienceTime): void {
    this.updatableList.forEach((updatable) => updatable.update(experienceTime));
  }

  /**
   * Reacts to the pointer event by passing it down to the children objects that implements the {@link IPointerSensible} interface.
   * @param pointerEvent Pointer move event
   */
  reactToPointer(pointerEvent: PointerEvent): void {
    // Add objects sensible to the pointer (example: the camera)
  }


  /**
   * Destroys all the destroyable elements of the corresponding list and disposes
   * from all the left elements of the scene.
   */
  destroy(): void {
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

    DebugGUI.destroy();
  }

}

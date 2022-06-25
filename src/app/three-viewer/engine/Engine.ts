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

export class Engine implements IResizable, IUpdatable, IDestroyable {

  private readonly debugGUI = new DebugGUI();

  private readonly timeHandler: TimeHandler = new TimeHandler();
  private readonly sizeHandler: SizeHandler = new SizeHandler();

  private readonly scene = new Scene();

  private readonly cameraHolder = new CameraHolder(this.scene, this.sizeHandler.getSize());
  private readonly rendererHolder = new RendererHolder(this.scene, this.cameraHolder.instance, this.canvas, this.sizeHandler.getSize());
  private readonly controlsHolder = new ControlsHolder(this.cameraHolder.instance, this.canvas);

  private readonly world = new World(this.scene, this.timeHandler, this.debugGUI);

  private readonly updatableList: IUpdatable[] = [
    this.rendererHolder,
    this.controlsHolder,
    this.world
  ];
  private readonly resizableList: IResizable[] = [
    this.cameraHolder,
    this.rendererHolder,
  ];
  private readonly destroyableList: IDestroyable[] = [
    this.controlsHolder,
    this.rendererHolder,
    this.debugGUI
  ];
  private readonly subscriptionList: Subscription[] = [];

  constructor(readonly canvas: HTMLCanvasElement,
  ) {
    this.subscriptionList.push(
      this.sizeHandler.listen()
          .subscribe((size) => this.resize(size)),
      this.timeHandler.listen()
          .subscribe(() => this.update())
    );
  }

  resize(size: WindowSize): void {
    this.resizableList.forEach((resizable) => resizable.resize(size));
  }

  update(): void {
    this.updatableList.forEach((updatable) => updatable.update());
  }

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

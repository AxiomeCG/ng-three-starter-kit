import { IResizable } from '../interface/IResizable';
import { ISize } from '../handler/size/ISize';
import { PerspectiveCamera } from 'three';
import { Scene } from 'three/src/scenes/Scene';

/**
 * Holder of the perspective camera chosen for the scene.
 */
export class CameraHolder implements IResizable {
  /**
   * Instance of the ThreeJS camera.
   */
  readonly instance: PerspectiveCamera;

  /**
   * Constructor
   * @param scene ThreeJS scene to add the camera to it.
   * @param initialSize Initial viewport size to set up the aspect ratio.
   */
  constructor(private readonly scene: Scene, initialSize: ISize) {
    this.instance = new PerspectiveCamera(
      35,
      initialSize.width / initialSize.height,
      0.1,
      100
    );
    this.instance.position.set(6, 4, 8);
    this.scene.add(this.instance);
  }

  /**
   * Change the camera properties to follow the viewport size changes.
   * @param size New size to consider for the calculations
   */
  resize(size: ISize): void {
    this.instance.aspect = size.width / size.height;
    this.instance.updateProjectionMatrix();
  }
}

import { IResizable } from '../interface/IResizable';
import { WindowSize } from '../handler/size/IWindowSize';
import { PerspectiveCamera } from 'three';
import { Scene } from 'three/src/scenes/Scene';

export class CameraHolder implements IResizable {
  readonly instance: PerspectiveCamera;

  constructor(private readonly scene: Scene, initialSize: WindowSize) {
    this.instance = new PerspectiveCamera(
      35,
      initialSize.width / initialSize.height,
      0.1,
      100
    );
    this.instance.position.set(6, 4, 8);
    this.scene.add(this.instance);
  }

  resize(size: WindowSize) {
    this.instance.aspect = size.width / size.height;
    this.instance.updateProjectionMatrix();
  }
}

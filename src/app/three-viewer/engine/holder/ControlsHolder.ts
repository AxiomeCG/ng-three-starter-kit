import { Camera } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { IUpdatable } from '../interface/IUpdatable';
import { IDestroyable } from '../interface/IDestroyable';

export class ControlsHolder implements IUpdatable, IDestroyable {
  private readonly instance: OrbitControls;

  constructor(private readonly camera: Camera, private readonly canvas: HTMLCanvasElement) {
    this.instance = new OrbitControls(camera, canvas);
    this.instance.enableDamping = true;
  }

  update() {
    this.instance.update();
  }

  destroy(): void {
    this.instance.dispose();
  }
}

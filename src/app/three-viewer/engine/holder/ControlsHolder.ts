import { Camera } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { IUpdatable } from '../interface/IUpdatable';
import { IDestroyable } from '../interface/IDestroyable';

/**
 * Holder for the OrbitControls chosen for the camera
 */
export class ControlsHolder implements IUpdatable, IDestroyable {
  /**
   * Instance of the ThreeJS OrbitControls
   * @private
   */
  private readonly instance: OrbitControls;

  /**
   * Constructor
   * @param camera Camera to bind to the controls
   * @param canvas HTML canvas element of the viewer
   */
  constructor(private readonly camera: Camera, private readonly canvas: HTMLCanvasElement) {
    this.instance = new OrbitControls(camera, canvas);
    this.instance.enableDamping = true;
  }

  /**
   * Requests update on the controls instance
   */
  update() {
    this.instance.update();
  }

  /**
   * Disposes of the controls
   */
  destroy(): void {
    this.instance.dispose();
  }
}

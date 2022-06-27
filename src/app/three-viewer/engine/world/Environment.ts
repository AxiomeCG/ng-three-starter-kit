import { ResourceHandler } from '../handler/resource/ResourceHandler';
import { DebugGUI } from '../debug/DebugGUI';
import { DirectionalLight, Scene } from 'three';
import GUI from 'lil-gui';

/**
 * Object representing the 3D scene environment properties like lights.
 */
export class Environment {
  /**
   * Debug tool objects to tweak the lights.
   * @private
   */
  private readonly debugFolder: GUI | undefined;
  /**
   * Directional light of the scene.
   * @private
   */
  private readonly sunLight: DirectionalLight;

  /**
   * Constructor
   * @param scene ThreeJS scene to add the lights
   * @param resourceHandler Resources loaded in the project
   * @param debugGUI
   */
  constructor(private readonly scene: Scene,
              private readonly resourceHandler: ResourceHandler,
              private readonly debugGUI: DebugGUI
  ) {
    if (this.debugGUI.ui) {
      this.debugFolder = this.debugGUI.ui.addFolder('environment');
    }
    this.sunLight = new DirectionalLight('#ffffff', 3);
    this.configureSunLight();
  }

  configureSunLight(): void {
    this.sunLight.position.set(0.25, 3, -2.25);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 15;
    this.sunLight.shadow.mapSize.set(1024, 1024);
    this.sunLight.shadow.normalBias = 0.02;

    this.scene.add(this.sunLight);

    if (this.debugFolder) {
      this.debugFolder?.add(this.sunLight, 'intensity')
          .name('sunLightIntensity')
          .min(0)
          .max(10)
          .step(0.001);
      this.debugFolder.add(this.sunLight.position, 'x')
          .name('sunLightX')
          .min(-5)
          .max(5)
          .step(0.001);
      this.debugFolder.add(this.sunLight.position, 'y')
          .name('sunLightY')
          .min(-5)
          .max(5)
          .step(0.001);
      this.debugFolder.add(this.sunLight.position, 'z')
          .name('sunLightZ')
          .min(-5)
          .max(5)
          .step(0.001);
    }
  }


}

import { ResourceHandler } from '../handler/resource/ResourceHandler';
import { DebugGUI } from '../debug/DebugGUI';
import {
  DirectionalLight,
  Material,
  Mesh,
  MeshLambertMaterial,
  MeshPhongMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Scene,
  sRGBEncoding,
  Texture
} from 'three';
import GUI from 'lil-gui';

/**
 * Properties of the environment map
 */
interface EnvironmentMapHolder {
  /**
   * Intensity of the environment map
   */
  intensity: number;
  /**
   * Cube texture of the environment
   */
  texture: Texture;
  /**
   * Updates the scene to apply the envMap to each material of the scene that supports environment maps.
   */
  updateMaterials(): void;
}

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
   * Environment map of the scene to generate the lights on supported materials
   * @private
   */
  private readonly environmentMap: EnvironmentMapHolder;

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
    this.environmentMap = {
      intensity: 0.4,
      texture: this.resourceHandler.items.get('environmentMapTexture') as Texture,
      updateMaterials: () => {
        this.scene.traverse((child) => {
          if (child instanceof Mesh && Environment.isEnvMappable(child.material)) {
            child.material.envMap = this.environmentMap.texture;
            child.material.envMapIntensity = this.environmentMap.intensity;
            child.material.needsUpdate = true;
          }
        });
      }
    };

    this.configureEnvironmentMap();
  }

  /**
   * Sets up the directional light of the scene (position, shadow casting, shadow optimization ...)
   */
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

  /**
   * Sets up the environment map of the scene and applies it to the supported materials of the scene.
   */
  configureEnvironmentMap() {

    this.environmentMap.texture.encoding = sRGBEncoding;

    this.scene.environment = this.environmentMap.texture;

    this.environmentMap.updateMaterials();

    if (this.debugGUI.ui) {
      this.debugFolder?.add(this.environmentMap, 'intensity')
          .name('envMapIntensity')
          .min(0)
          .max(4)
          .step(0.001)
          .onChange(() => this.environmentMap.updateMaterials());
    }
  }


  /**
   * Checks if there are the correct properties on the material for setting the environment map and the environment map
   * intensity.
   * @param material Material to check
   * @private
   * @returns true if the object possesses the correct attributes to apply the environment map
   */
  private static isEnvMappable(material: Material): boolean {
    return material instanceof MeshStandardMaterial
      || material instanceof MeshLambertMaterial
      || material instanceof MeshPhongMaterial
      || material instanceof MeshPhysicalMaterial;
  }

}

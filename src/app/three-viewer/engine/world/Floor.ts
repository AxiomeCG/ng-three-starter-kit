import { CircleGeometry, Mesh, MeshStandardMaterial, RepeatWrapping, sRGBEncoding, Texture } from 'three';
import { Scene } from 'three/src/scenes/Scene';
import { ResourceLoader } from '../resource/ResourceLoader';
import { IDestroyable } from '../interface/IDestroyable';

/**
 * Contains the 3D floor of the scene
 */
export class Floor implements IDestroyable {
  /**
   * ThreeJS geometry of the floor.
   * @private
   */
  private readonly geometry: CircleGeometry = new CircleGeometry(5, 64);
  /**
   * ThreeJS textures loaded to be applied on the floor.
   * @private
   */
  private readonly textures: { color: Texture, normal: Texture } = {
    color: this.resourceLoader.items.get('grassColorTexture') as Texture,
    normal: this.resourceLoader.items.get('grassNormalTexture') as Texture,
  };
  /**
   * ThreeJS Material used on the floor to apply the textures.
   * @private
   */
  private readonly material: MeshStandardMaterial = new MeshStandardMaterial({
    map: this.textures.color,
    normalMap: this.textures.normal
  });
  /**
   * ThreeJS mesh that holds the geometry and the material of the floor.
   * @private
   */
  private mesh: Mesh = new Mesh(this.geometry, this.material);

  /**
   * Constructor
   * @param scene Scene to which is added the floor mesh
   * @param resourceLoader Resource that has loaded the textures to apply on the floor
   */
  constructor(private readonly scene: Scene,
              private readonly resourceLoader: ResourceLoader) {
    this.configureTextures();
    this.configureMesh();
  }

  /**
   * Configures the color and map textures (encoding and tiling)
   */
  configureTextures() {
    this.textures.color.encoding = sRGBEncoding;
    this.textures.color.repeat.set(1.5, 1.5);
    this.textures.color.wrapS = RepeatWrapping;
    this.textures.color.wrapT = RepeatWrapping;

    this.textures.normal.repeat.set(1.5, 1.5);
    this.textures.normal.wrapS = RepeatWrapping;
    this.textures.normal.wrapT = RepeatWrapping;
  }

  /**
   * Configure the floor to position it correctly in the scene.
   * Activates the capacity of receiving shadows.
   */
  configureMesh() {
    this.mesh.rotation.x = -Math.PI * 0.5;
    this.mesh.receiveShadow = true;
    this.scene.add(this.mesh);
  }

  /**
   * Dispose of the floor
   */
  destroy(): void {
    this.scene.remove(this.mesh);
    this.geometry.dispose();
    this.material.dispose();
  }
}

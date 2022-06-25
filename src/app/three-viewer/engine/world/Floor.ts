import { CircleGeometry, Mesh, MeshStandardMaterial, RepeatWrapping, sRGBEncoding, Texture } from 'three';
import { Scene } from 'three/src/scenes/Scene';
import { ResourceHandler } from '../handler/resource/ResourceHandler';

export class Floor {

  private readonly geometry: CircleGeometry = new CircleGeometry(5, 64);
  private readonly textures: { color: Texture, normal: Texture } = {
    color: this.resourceHandler.items.get('grassColorTexture') as Texture,
    normal: this.resourceHandler.items.get('grassNormalTexture') as Texture,
  };
  private readonly material: MeshStandardMaterial = new MeshStandardMaterial({
    map: this.textures.color,
    normalMap: this.textures.normal
  });
  private mesh: Mesh = new Mesh(this.geometry, this.material);

  constructor(private readonly scene: Scene,
              private readonly resourceHandler: ResourceHandler) {
    this.configureTextures();
    this.configureMesh();
  }

  configureTextures() {
    this.textures.color.encoding = sRGBEncoding;
    this.textures.color.repeat.set(1.5, 1.5);
    this.textures.color.wrapS = RepeatWrapping;
    this.textures.color.wrapT = RepeatWrapping;

    this.textures.normal.repeat.set(1.5, 1.5);
    this.textures.normal.wrapS = RepeatWrapping;
    this.textures.normal.wrapT = RepeatWrapping;
  }

  configureMesh() {
    this.mesh.rotation.x = -Math.PI * 0.5;
    this.mesh.receiveShadow = true;
    this.scene.add(this.mesh);
  }
}

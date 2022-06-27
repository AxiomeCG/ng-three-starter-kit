import { ISource, SourceType } from './ISource';

/**
 * List of the resources to load
 */
export const sourceList: ISource[] = [
  {
    name: 'environmentMapTexture',
    type: SourceType.CUBE_TEXTURE,
    pathList: [
      './assets/textures/environmentMap/px.jpg',
      './assets/textures/environmentMap/nx.jpg',
      './assets/textures/environmentMap/py.jpg',
      './assets/textures/environmentMap/ny.jpg',
      './assets/textures/environmentMap/pz.jpg',
      './assets/textures/environmentMap/nz.jpg'
    ]
  }, {
    name: 'grassColorTexture',
    type: SourceType.TEXTURE,
    path: './assets/textures/dirt/color.jpg'
  }, {
    name: 'grassNormalTexture',
    type: SourceType.TEXTURE,
    path: './assets/textures/dirt/normal.jpg'
  }, {
    name: 'foxModel',
    type: SourceType.GLTF,
    path: './assets/models/Fox/glTF/Fox.gltf'
  }
];

export interface Source {
  name: string,
  type: SourceType,
  path?: string;
  pathList?: string[]
}

export enum SourceType {
  GLTF = 'gltfModel',
  TEXTURE = 'texture',
  CUBE_TEXTURE = 'cubeTexture',
}

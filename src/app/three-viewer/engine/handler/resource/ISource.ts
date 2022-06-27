/**
 * Source information mandatory to be loaded to the project.
 */
export interface ISource {
  /**
   * Name of the resource
   */
  name: string,
  /**
   * Type of resource
   */
  type: SourceType,
  /**
   * Path to the single source file (used here for GLTF and for Texture)
   */
  path?: string;
  /**
   * Path to multiple required sources (used here for the CubeTexture)
   */
  pathList?: string[]
}

/**
 * Type of resource available
 */
export enum SourceType {
  GLTF = 'gltfModel',
  TEXTURE = 'texture',
  CUBE_TEXTURE = 'cubeTexture',
}

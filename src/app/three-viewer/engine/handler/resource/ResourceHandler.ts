import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { CubeTexture, CubeTextureLoader, LoadingManager, Mesh, Texture, TextureLoader } from 'three';
import { IListenable } from '../../interface/IListenable';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { ISource, SourceType } from './ISource';
import { IDestroyable } from '../../interface/IDestroyable';

/**
 * Type of objects that can be loaded into the project
 */
export type Item = GLTF | Texture | CubeTexture;

/**
 * Handles the loading of the project's resources (textures, models...)
 */
export class ResourceHandler implements IDestroyable, IListenable<void> {
  /**
   * Map of the resource items loaded
   */
  readonly items = new Map<string, Item>();
  /**
   * Emits when the loading is done
   * @private
   */
  private readonly eventEmitter = new EventEmitter<void>();
  /**
   * ThreeJS loading manager
   * @private
   */
  private readonly loadingManager = new LoadingManager(() => this.onLoad(),
    (url: string, itemsLoaded: number, itemsTotal: number) => this.onProgress(url, itemsLoaded, itemsTotal),
    (url: string) => this.onError(url)
  );

  /**
   * Loader for GLTF models
   * @private
   */
  private readonly gltfLoader = new GLTFLoader(this.loadingManager);
  /**
   * Loader for Textures
   * @private
   */
  private readonly textureLoader = new TextureLoader(this.loadingManager);
  /**
   * Loader for the Cube Texture for the environment map
   * @private
   */
  private readonly cubeTextureLoader = new CubeTextureLoader(this.loadingManager);

  /**
   * Constructor
   * @param sourceList List of the source to load
   */
  constructor(private readonly sourceList: ISource[]) {
    this.startLoading();
  }


  /**
   * Starts the loading of the resource by using the correct loader depending on the type of the resource.
   */
  startLoading() {
    // Load each source
    for (const source of this.sourceList) {
      switch (source.type) {
        case SourceType.GLTF:
          if (!source.path) {
            throw new Error('Cannot load the GLTF model due to missing path property. Check the source file.');
          }
          this.gltfLoader.load(
            source.path,
            (file) => {
              this.sourceLoaded(source, file);
            }
          );
          break;
        case SourceType.TEXTURE:
          if (!source.path) {
            throw new Error('Cannot load the Texture due to missing path property. Check the source file.');
          }
          this.textureLoader.load(
            source.path,
            (file) => {
              this.sourceLoaded(source, file);
            }
          );
          break;
        case SourceType.CUBE_TEXTURE:
          if (!source.pathList) {
            throw new Error('Cannot load the CubeTexture due to missing pathlist property. Check the source file.');
          }
          this.cubeTextureLoader.load(
            source.pathList,
            (file) => {
              this.sourceLoaded(source, file);
            }
          );
          break;
        default:
          throw new Error('Type of loader does not exists');
      }
    }
  }

  /**
   * Adds to the map the item loaded
   * @param source Source of the resource loaded
   * @param item Item loaded
   */
  sourceLoaded(source: ISource, item: Item): void {
    this.items.set(source.name, item);
  }

  /**
   * Returns an observable that notifies the subscribers when the loading is fully completed.
   */
  listen(): Observable<void> {
    return this.eventEmitter.asObservable();
  }

  /**
   * Callback for the loading manager to call when the Loading is completed. It fires the event of the event emitter.
   * @private
   */
  private onLoad(): void {
    console.log('Loading complete!');
    this.eventEmitter.emit();
  }

  /**
   * Callback for the loading manager to call when an item is loaded.
   * @param url URL of the object loaded.
   * @param itemsLoaded Number of items that have been loaded.
   * @param itemsTotal Total number of items that needs to be loaded to consider the loading done.
   * @private
   */
  private onProgress(url: string, itemsLoaded: number, itemsTotal: number): void {
    console.log(`Loading file: ${url}.\nLoaded ${itemsLoaded} of ${itemsTotal} files.`);
  }

  /**
   * Callback for the loading manager to call when an error occurs when loading an item.
   * @param url URL of the item that can't be loaded due to an error.
   * @private
   */
  private onError(url: string): void {
    console.log('There was an error loading ' + url);
  }

  /**
   * Disposes the resources loaded
   */
  destroy(): void {
    this.items.forEach((item) => {
      if ('scene' in item) {
        item.scene.traverse((object) => {
          if (object instanceof Mesh) {
            object.geometry.dispose();
            object.material.dispose();
          }
        });
      } else {
        item.dispose();
      }
    });
  }
}

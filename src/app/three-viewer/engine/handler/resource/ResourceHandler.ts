import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { CubeTexture, CubeTextureLoader, LoadingManager, Texture, TextureLoader } from 'three';
import { IListenable } from '../../interface/IListenable';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Source, SourceType } from './Source';

export type Item = GLTF | Texture | CubeTexture;

export class ResourceHandler implements IListenable<void> {
  readonly items = new Map<string, Item>();
  private readonly eventEmitter = new EventEmitter<void>();
  private readonly loadingManager = new LoadingManager(() => this.onLoad(),
    (url: string, itemsLoaded: number, itemsTotal: number) => this.onProgress(url, itemsLoaded, itemsTotal),
    (url: string) => this.onError(url)
  );

  private readonly gltfLoader = new GLTFLoader(this.loadingManager);
  private readonly textureLoader = new TextureLoader(this.loadingManager);
  private readonly cubeTextureLoader = new CubeTextureLoader(this.loadingManager);

  constructor(private readonly sourceList: Source[]) {
    this.startLoading();
  }

  startLoading() {
    // Load each source
    for (const source of this.sourceList) {
      switch (source.type) {
        case SourceType.GLTF:
          this.gltfLoader.load(
            source.path!!,
            (file) => {
              this.sourceLoaded(source, file);
            }
          );
          break;
        case SourceType.TEXTURE:
          this.textureLoader.load(
            source.path!!,
            (file) => {
              this.sourceLoaded(source, file);
            }
          );
          break;
        case SourceType.CUBE_TEXTURE:
          this.cubeTextureLoader.load(
            source.pathList!!,
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

  sourceLoaded(source: Source, item: Item) {
    this.items.set(source.name, item);
  }

  listen(): Observable<void> {
    return this.eventEmitter.asObservable();
  }

  private onLoad() {
    console.log('Loading complete!');
    this.eventEmitter.emit();
  }

  private onProgress(url: string, itemsLoaded: number, itemsTotal: number) {
    console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
  }

  private onError(url: string) {
    console.log('There was an error loading ' + url);
  }
}

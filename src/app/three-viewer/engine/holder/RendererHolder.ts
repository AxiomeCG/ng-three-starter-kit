import { WebGLRenderer } from 'three/src/renderers/WebGLRenderer';
import { IResizable } from '../interface/IResizable';
import { PCFShadowMap, ReinhardToneMapping, sRGBEncoding } from 'three';
import { WindowSize } from '../handler/size/IWindowSize';
import { IUpdatable } from '../interface/IUpdatable';
import { Scene } from 'three/src/scenes/Scene';
import { Camera } from 'three/src/cameras/Camera';
import { IDestroyable } from '../interface/IDestroyable';

export class RendererHolder implements IResizable, IUpdatable, IDestroyable {
  private readonly instance: WebGLRenderer;

  constructor(private readonly scene: Scene, private readonly camera: Camera, private readonly canvas: HTMLCanvasElement, initialSize: WindowSize) {
    this.instance = new WebGLRenderer(
      {
        canvas: canvas,
        antialias: true
      }
    );

    this.instance.physicallyCorrectLights = true;
    this.instance.outputEncoding = sRGBEncoding;
    this.instance.toneMapping = ReinhardToneMapping;
    this.instance.toneMappingExposure = 3;
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = PCFShadowMap;
    this.instance.setClearColor('#211d20');
    this.instance.setSize(initialSize.width, initialSize.height);
    this.instance.setPixelRatio(initialSize.pixelRatio);
  }


  resize(size: WindowSize) {
    this.instance.setSize(size.width, size.height);
    this.instance.setPixelRatio(size.pixelRatio);
  }

  update(): void {
    this.instance.render(this.scene, this.camera);
  }

  destroy(): void {
    this.instance.dispose();
  }

}

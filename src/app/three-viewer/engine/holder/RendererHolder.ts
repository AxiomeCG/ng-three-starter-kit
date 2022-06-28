import { WebGLRenderer } from 'three/src/renderers/WebGLRenderer';
import { IResizable } from '../interface/IResizable';
import { PCFShadowMap, ReinhardToneMapping, sRGBEncoding } from 'three';
import { ISize } from '../service/size/ISize';
import { IUpdatable } from '../interface/IUpdatable';
import { Scene } from 'three/src/scenes/Scene';
import { Camera } from 'three/src/cameras/Camera';
import { IDestroyable } from '../interface/IDestroyable';
import { ScreenSizeService } from '../service/size/screen-size.service';

/**
 * Holder that sets up the WebGL Renderer for the 3D scene.
 */
export class RendererHolder implements IResizable, IUpdatable, IDestroyable {
  /**
   * Instance of the ThreeJS WebGL renderer.
   * @private
   */
  private readonly instance: WebGLRenderer;

  /**
   * Constructor
   * @param scene ThreeJS scene to render
   * @param camera ThreeJS camera used to render the scene
   * @param canvas HTML canvas element of the viewer
   */
  constructor(private readonly scene: Scene,
              private readonly camera: Camera,
              private readonly canvas: HTMLCanvasElement) {
    const initialSize = ScreenSizeService.getSize();
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


  /**
   * Resizes the renderer to the new size of the viewport. Sets also the new pixel ratio.
   * @param size New size information of the viewport
   */
  resize(size: ISize) {
    this.instance.setSize(size.width, size.height);
    this.instance.setPixelRatio(size.pixelRatio);
  }

  /**
   * Renders the scene at the considered frame.
   */
  update(): void {
    this.instance.render(this.scene, this.camera);
  }

  /**
   * Disposes of the renderer.
   */
  destroy(): void {
    this.instance.dispose();
  }

}

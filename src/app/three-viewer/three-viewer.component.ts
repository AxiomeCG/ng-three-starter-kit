import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Engine } from './engine/Engine';

/**
 * ThreeJS viewer containing the canvas to display the WebGL experience and the engine that runs the whole.
 */
@Component({
  selector: 'app-three-viewer',
  templateUrl: './three-viewer.component.html',
  styleUrls: ['./three-viewer.component.scss'],
})
export class ThreeViewerComponent implements OnInit, OnDestroy {
  /**
   * Canvas that displays the 3D experience
   * Made static to ensure that the canvas is available in the ngOnInit part.
   */
  @ViewChild('canvas', { static: true }) canvasRef: ElementRef<HTMLCanvasElement> | undefined;
  private engine: Engine | undefined;

  ngOnInit() {
    if (!this.canvasRef) {
      throw new Error('Canvas should be defined to bootstrap the WebGL Engine');
    }
    this.engine = new Engine(this.canvasRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.engine?.destroy();
  }
}

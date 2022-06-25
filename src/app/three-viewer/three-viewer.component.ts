import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Engine } from './engine/Engine';

@Component({
  selector: 'app-three-viewer',
  templateUrl: './three-viewer.component.html',
  styleUrls: ['./three-viewer.component.scss'],
})
export class ThreeViewerComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef: ElementRef<HTMLCanvasElement> | undefined;
  private engine: Engine | undefined;

  ngOnInit() {
    this.engine = new Engine(this.canvasRef?.nativeElement!!);
  }

  ngOnDestroy(): void {
    this.engine?.destroy();
  }
}

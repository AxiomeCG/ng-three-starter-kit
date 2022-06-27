import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Engine } from './engine/Engine';
import { TimeService } from './engine/service/time/time.service';
import { ScreenSizeService } from './engine/service/size/screen-size.service';

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
  /**
   * Engine of the 3D experience to generate the ThreeJS scene.
   * @private
   */
  private engine: Engine | undefined;

  /**
   * Constructor
   * @param timeService Service that handles the animation loop and the time of the 3D experience engine
   * @param screenSizeService Service that handles the screen resize for the 3D experience engine
   */
  constructor(private readonly timeService: TimeService,
              private readonly screenSizeService: ScreenSizeService) {}

  /**
   * Bootstraps the 3D engine
   * @throws Error if the canvas to display the experience is undefined
   */
  ngOnInit() {
    if (!this.canvasRef) {
      throw new Error('Canvas should be defined to bootstrap the WebGL Engine');
    }
    this.engine = new Engine(this.canvasRef.nativeElement, this.screenSizeService.getSize());

    this.timeService.setConsumer((experienceTime) => this.engine?.update(experienceTime));
    this.timeService.tick(); //First impulsion of the tick loop

    this.screenSizeService.setConsumer((size) => this.engine?.resize(size));
  }

  /**
   * Cleans up the engine on component destruction
   */
  ngOnDestroy(): void {
    this.engine?.destroy();
  }
}

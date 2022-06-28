import { Injectable, NgZone } from '@angular/core';
import { ISize } from './ISize';
import { Consumer } from '../type/Consumer';

/**
 * Service that handles the size of the screen (viewport) and it listens on the resize events outside of Angular
 */
@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService {
  /**
   * Constructor
   * Listen to the resize outside of Angular to execute the Engine's consumer to avoid ChangeDetection triggers
   */
  constructor(private readonly ngZone: NgZone) {
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('resize', () => {
        this.engineConsumer(ScreenSizeService.getSize());
      });
    });
  }

  /**
   * Returns the current width of the viewport.
   */
  static getWidth(): number {
    return window.innerWidth;
  }

  /**
   * Returns the current height of the viewport.
   */
  static getHeight(): number {
    return window.innerHeight;
  }

  /**
   * Returns the current pixel ratio to apply. Can be either 1 or 2 (above 2 would be overkill)
   */
  static getPixelRatio(): number {
    return Math.min(window.devicePixelRatio, 2);
  }

  /**
   * Returns an information bundle about the viewport size
   */
  static getSize(): ISize {
    return {
      width: ScreenSizeService.getWidth(),
      height: ScreenSizeService.getHeight(),
      pixelRatio: ScreenSizeService.getPixelRatio(),
    };
  }

  /**
   * Sets the consumer that will be used by the engine to determine its resize behaviour based on the new size and new
   * pixel ratio
   * @param consumer Callback that needs to be executed outside the NgZone to avoid heavy change detection processes.
   */
  setConsumer(consumer: Consumer<ISize>) {
    this.engineConsumer = consumer;
  }

  /**
   * Slot to keep track of the engine consumer to execute out of the NgZone on resize
   */
  private engineConsumer: Consumer<ISize> = () => {};
}

import { Injectable, NgZone } from '@angular/core';
import { ISize } from './ISize';

/**
 * Handler for the size of the screen (viewport)
 */
@Injectable({
  providedIn: 'root'
})
export class ScreenSizeHandlerService {

  /**
   * Constructor
   * Listen to the resize outside of Angular to execute the Engine's consumer to avoid ChangeDetection triggers
   */
  constructor(private readonly ngZone: NgZone) {
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('resize', () => {
        console.log('resize');
        this.engineConsumer(this.getSize());
      });
    });
  }

  /**
   * Returns the current width of the viewport.
   */
  getWidth(): number {
    return window.innerWidth;
  }

  /**
   * Returns the current height of the viewport.
   */
  getHeight(): number {
    return window.innerHeight;
  }

  /**
   * Returns the current pixel ratio to apply. Can be either 1 or 2 (above 2 would be overkill)
   */
  getPixelRatio(): number {
    return Math.min(window.devicePixelRatio, 2);
  }

  /**
   * Returns an information bundle about the viewport size
   */
  getSize(): ISize {
    return {
      width: this.getWidth(),
      height: this.getHeight(),
      pixelRatio: this.getPixelRatio(),
    };
  }

  setConsumer(consumer: (size: ISize) => void) {
    this.engineConsumer = consumer;
  }

  private engineConsumer: (size: ISize) => void = () => {};
}

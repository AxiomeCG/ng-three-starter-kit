import { EventEmitter } from '@angular/core';
import { ISize } from './ISize';
import { Observable } from 'rxjs';
import { IListenable } from '../../interface/IListenable';

/**
 * Handler for the size of the screen (viewport)
 */
export class ScreenSizeHandler implements IListenable<ISize> {

  /**
   * Emits on the stream the new size on resizing event triggered by the browser
   * @private
   */
  private readonly eventEmitter = new EventEmitter<ISize>();

  /**
   * Constructor
   */
  constructor() {
    window.addEventListener('resize', () => {
      this.eventEmitter.emit({
        width: this.getWidth(),
        height: this.getHeight(),
        pixelRatio: this.getPixelRatio(),
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

  /**
   * Exposes an observable for subscribers that needs to be informed on the size changes.
   * @returns an observable that emits the new size and the new pixel ratio in the stream.
   */
  listen(): Observable<ISize> {
    return this.eventEmitter.asObservable();
  }
}

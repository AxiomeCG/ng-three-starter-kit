import { EventEmitter } from '@angular/core';
import { WindowSize } from './IWindowSize';
import { Observable } from 'rxjs';
import { IListenable } from '../../interface/IListenable';

export class SizeHandler implements IListenable<WindowSize> {

  private readonly eventEmitter = new EventEmitter<WindowSize>();

  constructor() {
    window.addEventListener('resize', () => {
      this.eventEmitter.emit({
        width: this.getWidth(),
        height: this.getHeight(),
        pixelRatio: this.getPixelRatio(),
      });
    });
  }

  getWidth(): number {
    return window.innerWidth;
  }

  getHeight(): number {
    return window.innerHeight;
  }

  getPixelRatio(): number {
    return Math.min(window.devicePixelRatio, 2);
  }

  getSize(): WindowSize {
    return {
      width: this.getWidth(),
      height: this.getHeight(),
      pixelRatio: this.getPixelRatio(),
    };
  }

  listen(): Observable<WindowSize> {
    return this.eventEmitter.asObservable();
  }
}

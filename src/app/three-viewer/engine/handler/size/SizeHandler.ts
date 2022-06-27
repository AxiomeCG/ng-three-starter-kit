import { EventEmitter } from '@angular/core';
import { ISize } from './ISize';
import { Observable } from 'rxjs';
import { IListenable } from '../../interface/IListenable';

export class SizeHandler implements IListenable<ISize> {

  private readonly eventEmitter = new EventEmitter<ISize>();

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

  getSize(): ISize {
    return {
      width: this.getWidth(),
      height: this.getHeight(),
      pixelRatio: this.getPixelRatio(),
    };
  }

  listen(): Observable<ISize> {
    return this.eventEmitter.asObservable();
  }
}

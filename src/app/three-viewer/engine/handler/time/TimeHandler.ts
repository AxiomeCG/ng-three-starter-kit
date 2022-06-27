import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { IListenable } from '../../interface/IListenable';

/**
 * Handler for the time of the 3D experience. It notifies subscribers on each frame.
 */
export class TimeHandler implements IListenable<void> {

  /**
   * Emits an empty event on each frame to inform the subscribers.
   * @private
   */
  private readonly eventEmitter = new EventEmitter<void>();

  private start: number = Date.now();
  private delta: number = 0;
  private current: number = 0;
  private elapsed: number = 0;

  constructor() {
    window.requestAnimationFrame(() => this.tick());
    this.tick();
  }

  tick() {
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;

    this.elapsed = this.current - this.start;

    this.eventEmitter.emit();
    window.requestAnimationFrame(() => this.tick());
  }

  getDeltaTime() {
    return this.delta;
  }

  getCurrentTime() {
    return this.current;
  }

  getElapsedTime() {
    return this.elapsed;
  }

  listen(): Observable<void> {
    return this.eventEmitter.asObservable();
  }
}

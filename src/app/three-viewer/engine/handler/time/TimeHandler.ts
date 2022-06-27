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

  /**
   * Start time of the application (at the instantiation of the TimeHandler).
   * Used to calculate the elapsed time from the start of the experience.
   * @private
   */
  private readonly start: number = Date.now();
  /**
   * Delta time between the current frame and the old one.
   * Used to provide the same experience on every framerate.
   * @private
   */
  private delta = 0;
  /**
   * Current time used to calculate the elapsed time and the delta time.
   * @private
   */
  private current = 0;
  /**
   * Elapsed time from the start of the experience.
   * @private
   */
  private elapsed = 0;

  /**
   * Constructor
   */
  constructor() {
    window.requestAnimationFrame(() => this.tick());
    this.tick();
  }

  /**
   * Handles the time of the experience by emitting on each frame an event to forward updates.
   */
  tick() {
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;

    this.elapsed = this.current - this.start;

    this.eventEmitter.emit();
    window.requestAnimationFrame(() => this.tick());
  }

  /**
   * Returns the delta time
   * @returns The time between the current frame and the previous one.
   */
  getDeltaTime() {
    return this.delta;
  }

  /**
   * Returns the current time
   * @returns A number representing the number of milliseconds for the current frame since January 1, 1970, 00:00:00,
   *   UTC.
   */
  getCurrentTime() {
    return this.current;
  }

  /**
   * Returns the elapsed time from the beginning of the experience.
   * Commonly used to add time uniform to shaders, for example.
   * @returns the time elapsed since the application started up
   */
  getElapsedTime() {
    return this.elapsed;
  }

  /**
   * Exposes an observable that emits an empty event on the stream to announce a new frame.
   */
  listen(): Observable<void> {
    return this.eventEmitter.asObservable();
  }
}

import { Injectable, NgZone } from '@angular/core';


/**
 * Handler for the time of the 3D experience.
 */
@Injectable({
  providedIn: 'root'
})
export class TimeHandlerService {

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
  constructor(private readonly ngZone: NgZone) {
  }

  setConsumer(consumer: (deltaTime: number) => void): void {
    this.engineConsumer = consumer;
  }

  /**
   * Handles the time of the experience by emitting on each frame an event to forward updates.
   */
  tick() {
    this.ngZone.runOutsideAngular(() => {
      const currentTime = Date.now();
      this.delta = currentTime - this.current;
      this.current = currentTime;

      this.elapsed = this.current - this.start;

      this.engineConsumer(this.delta);
      window.requestAnimationFrame(() => this.tick());
    });
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

  private engineConsumer: (deltaTime: number) => void = () => {};

}

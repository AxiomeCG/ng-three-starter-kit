import { Injectable, NgZone } from '@angular/core';
import { IExperienceTime } from './IExperienceTime';


/**
 * Handler for the time of the 3D experience.
 */
@Injectable({
  providedIn: 'root'
})
export class TimeHandlerService {

  /**
   * Bundle to keep information about the time of the experience.
   * @private
   */
  private readonly experienceTime: IExperienceTime = {
    start: Date.now(),
    delta: 0,
    elapsed: 0,
    current: 0,
  };

  /**
   * Constructor
   */
  constructor(private readonly ngZone: NgZone) {
  }

  /**
   * Sets the consumer that will be used by the engine to determine its update behaviour based on the new time bundle
   * @param consumer Callback that needs to be executed outside the NgZone to avoid heavy change detection processes.
   */
  setConsumer(consumer: (experienceTime: IExperienceTime) => void): void {
    this.engineConsumer = consumer;
  }

  /**
   * Handles the time of the experience by emitting on each frame an event to forward updates.
   * Executed outside the NgZone to avoid heavy load and performance issues due to the Change Detection.
   */
  tick() {
    this.ngZone.runOutsideAngular(() => {
      const currentTime = Date.now();
      this.experienceTime.delta = currentTime - this.experienceTime.current;
      this.experienceTime.current = currentTime;

      this.experienceTime.elapsed = this.experienceTime.current - this.experienceTime.start;

      this.engineConsumer(this.experienceTime);
      window.requestAnimationFrame(() => this.tick());
    });
  }

  /**
   * Gets the time object of the experience that contains the information like delta time, elapsed time from the start
   * of the experience.
   */
  getExperienceTime() {
    return { ...this.experienceTime };
  }

  /**
   * Slot to keep track of the engine consumer to execute out of the NgZone on tick
   */
  private engineConsumer: (experienceTime: IExperienceTime) => void = () => {};

}

import { Injectable, NgZone } from '@angular/core';
import { IExperienceTime } from './IExperienceTime';


/**
 * Handler for the time of the 3D experience.
 */
@Injectable({
  providedIn: 'root'
})
export class TimeHandlerService {

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

  setConsumer(consumer: (experienceTime: IExperienceTime) => void): void {
    this.engineConsumer = consumer;
  }

  /**
   * Handles the time of the experience by emitting on each frame an event to forward updates.
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

  private engineConsumer: (experienceTime: IExperienceTime) => void = () => {};

}

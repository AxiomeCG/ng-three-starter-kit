import { IExperienceTime } from '../handler/time/IExperienceTime';

/**
 * Contract that symbolizes that the class needs updates at each frame, and exposes the method to do so.
 */
export interface IUpdatable {
  /**
   * Updates the object to the next frame state.
   * @param experienceTime Bundle of time information about the frame
   */
  update(experienceTime: IExperienceTime): void;
}

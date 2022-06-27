/**
 * Information about the experience time.
 */
export interface IExperienceTime {
  /**
   * Start time of the application (at the instantiation of the TimeHandler).
   * Used to calculate the elapsed time from the start of the experience.
   */
  start: number;
  /**
   * Delta time between the current frame and the old one.
   * Used to provide the same experience on every framerate.
   */
  delta: number;
  /**
   * Current time used to calculate the elapsed time and the delta time.
   */
  current: number;
  /**
   * Elapsed time from the start of the experience.
   */
  elapsed: number;

}

/**
 * Contract that symbolizes that the class needs updates at each frame, and exposes the method to do so.
 */
export interface IUpdatable {
  /**
   * Updates the object to the next frame state.
   */
  update(): void;
}

/**
 * Contract for objects that need to be disposed to avoid memory leaks and so on.
 */
export interface IDestroyable {
  /**
   * Disposes the reserved resources for a clean lifecycle
   */
  destroy(): void;
}

import { Consumer } from '../service/type/Consumer';

/**
 * Contract that makes objects that implements it sensible to the pointermove event.
 */
export interface IPointerSensible {
  /**
   * Consumes the pointer event and reacts to it
   */
  reactToPointer: Consumer<PointerEvent>;
}

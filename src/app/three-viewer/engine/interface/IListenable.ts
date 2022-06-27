import { Observable } from 'rxjs';

/**
 * Contract for objects that will emit through an Observable object, useful to listen and to be notified on specific
 * occasions.
 */
export interface IListenable<T> {
  /**
   * Returns an observable object that can emit some events on the stream.
   */
  listen(): Observable<T>;
}

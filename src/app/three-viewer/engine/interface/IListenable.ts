import { Observable } from 'rxjs';

export interface IListenable<T> {
  listen(): Observable<T>;
}

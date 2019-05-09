import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
 
import { Secretary } from './secretary';
import { MessageService } from '../message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class SecretaryService {

  private secretaryUrl = 'api/secretaries';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET secretaries from the server */
  getSecretaries (): Observable<Secretary[]> {
    return this.http.get<Secretary[]>(this.secretaryUrl)
      .pipe(
        tap(_ => this.log('fetched secretaries')),
        catchError(this.handleError<Secretary[]>('getSecretaries', []))
      );
  }

  /** GET secretary by id. Return `undefined` when id not found */
  getSecretaryNo404<Data>(id: string): Observable<Secretary> {
    const url = `${this.secretaryUrl}/?id=${id}`;
    return this.http.get<Secretary[]>(url)
      .pipe(
        map(secretaries => secretaries[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} secretary id=${id}`);
        }),
        catchError(this.handleError<Secretary>(`getSecretary id=${id}`))
      );
  }

  /** GET secretary by id. Will 404 if id not found */
  getSecretary(id: string): Observable<Secretary> {
    const url = `${this.secretaryUrl}/${id}`;
    return this.http.get<Secretary>(url).pipe(
      tap(_ => this.log(`fetched secretary id=${id}`)),
      catchError(this.handleError<Secretary>(`getSecretary id=${id}`))
    );
  }

  //////// Save methods //////////
 
  /** POST: add a new secretary to the server */
  addSecretary (secretary: Secretary): Observable<Secretary> {
    return this.http.post<Secretary>(this.secretaryUrl, secretary, httpOptions).pipe(
      tap((newSecretary: Secretary) => this.log(`added secretary w/ id=${newSecretary.id}`)),
      catchError(this.handleError<Secretary>('addSecretary'))
    );
  }

  /** DELETE: delete the secretary from the server */
  deleteSecretary (secretary: Secretary | string): Observable<Secretary> {
    const id = typeof secretary === 'string' ? secretary : secretary.id;
    const url = `${this.secretaryUrl}/${id}`;
 
    return this.http.delete<Secretary>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted secretary id=${id}`)),
      catchError(this.handleError<Secretary>('deleteSecretary'))
    );
  }

  /** PUT: update the secretary on the server */
  updateSecretary (secretary: Secretary): Observable<any> {
    return this.http.put(this.secretaryUrl, secretary, httpOptions).pipe(
      tap(_ => this.log(`updated secretary id=${secretary.id}`)),
      catchError(this.handleError<any>('updateSecretary'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`SecretaryService: ${message}`);
  }
}
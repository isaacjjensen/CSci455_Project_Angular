import { Injectable } 				from '@angular/core';
import { HttpClient, HttpHeaders } 	from '@angular/common/http';
 
import { Observable, of } 			from 'rxjs';
import { catchError, map, tap } 	from 'rxjs/operators';
 
import { Nurse } 					from './nurse';
import { MessageService } 			from '../message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class NurseService {

  private nurseUrl = 'api/nurses';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET nurses from the server */
  getNurses (): Observable<Nurse[]> {
    return this.http.get<Nurse[]>(this.nurseUrl)
      .pipe(
        tap(_ => this.log('fetched nurses')),
        catchError(this.handleError<Nurse[]>('getNurses', []))
      );
  }

  /** GET nurse by id. Return `undefined` when id not found */
  getNurseNo404<Data>(id: string): Observable<Nurse> {
    const url = `${this.nurseUrl}/?id=${id}`;
    return this.http.get<Nurse[]>(url)
      .pipe(
        map(nurses => nurses[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} nurse id=${id}`);
        }),
        catchError(this.handleError<Nurse>(`getNurse id=${id}`))
      );
  }

  /** GET nurse by id. Will 404 if id not found */
  getNurse(id: string): Observable<Nurse> {
    const url = `${this.nurseUrl}/${id}`;
    return this.http.get<Nurse>(url).pipe(
      tap(_ => this.log(`fetched nurse id=${id}`)),
      catchError(this.handleError<Nurse>(`getNurse id=${id}`))
    );
  }

  //////// Save methods //////////
 
  /** POST: add a new nurse to the server */
  addNurse (nurse: Nurse): Observable<Nurse> {
    return this.http.post<Nurse>(this.nurseUrl, nurse, httpOptions).pipe(
      tap((newNurse: Nurse) => this.log(`added nurse w/ id=${newNurse.id}`)),
      catchError(this.handleError<Nurse>('addNurse'))
    );
  }

  /** DELETE: delete the nurse from the server */
  deleteNurse (nurse: Nurse | string): Observable<Nurse> {
    const id = typeof nurse === 'string' ? nurse : nurse.id;
    const url = `${this.nurseUrl}/${id}`;
 
    return this.http.delete<Nurse>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted nurse id=${id}`)),
      catchError(this.handleError<Nurse>('deleteNurse'))
    );
  }

  /** PUT: update the nurse on the server */
  updateNurse (nurse: Nurse): Observable<any> {
    return this.http.put(this.nurseUrl, nurse, httpOptions).pipe(
      tap(_ => this.log(`updated nurse id=${nurse.id}`)),
      catchError(this.handleError<any>('updateNurse'))
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
    this.messageService.add(`NurseService: ${message}`);
  }
}
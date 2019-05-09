import { Injectable } 				from '@angular/core';
import { HttpClient, HttpHeaders } 	from '@angular/common/http';
 
import { Observable, of } 			from 'rxjs';
import { catchError, map, tap } 	from 'rxjs/operators';
 
import { Institution } 				from './institution';
import { MessageService } 			from '../message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class InstitutionService {

  private institutionUrl = 'api/institutions';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET institutions from the server */
  getInstitutions (): Observable<Institution[]> {
    return this.http.get<Institution[]>(this.institutionUrl)
      .pipe(
        tap(_ => this.log('fetched institutions')),
        catchError(this.handleError<Institution[]>('getInstitutions', []))
      );
  }

  /** GET institution by id. Return `undefined` when id not found */
  getInstitutionNo404<Data>(id: string): Observable<Institution> {
    const url = `${this.institutionUrl}/?id=${id}`;
    return this.http.get<Institution[]>(url)
      .pipe(
        map(institutions => institutions[0]), // returns a {0|1} element array
        tap(i => {
          const outcome = i ? 'fetched' : 'did not find';
          this.log(`${outcome} institution id=${id}`);
        }),
        catchError(this.handleError<Institution>(`getInstitution id=${id}`))
      );
  }

  /** GET institution by id. Will 404 if id not found */
  getInstitution(id: string): Observable<Institution> {
    const url = `${this.institutionUrl}/${id}`;
    return this.http.get<Institution>(url).pipe(
      tap(_ => this.log(`fetched institution id=${id}`)),
      catchError(this.handleError<Institution>(`getInstitution id=${id}`))
    );
  }

  //////// Save methods //////////
 
  /** POST: add a new institution to the server */
  addInstitution (institution: Institution): Observable<Institution> {
    return this.http.post<Institution>(this.institutionUrl, institution, httpOptions).pipe(
      tap((newInstitution: Institution) => this.log(`added institution w/ id=${newInstitution.id}`)),
      catchError(this.handleError<Institution>('addInstitution'))
    );
  }

  /** DELETE: delete the institution from the server */
  deleteInstitution (institution: Institution | string): Observable<Institution> {
    const id = typeof institution === 'string' ? institution : institution.id;
    const url = `${this.institutionUrl}/${id}`;
 
    return this.http.delete<Institution>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted institution id=${id}`)),
      catchError(this.handleError<Institution>('deleteInstitution'))
    );
  }

  /** PUT: update the institution on the server */
  updateInstitution (institution: Institution): Observable<any> {
    return this.http.put(this.institutionUrl, institution, httpOptions).pipe(
      tap(_ => this.log(`updated institution id=${institution.id}`)),
      catchError(this.handleError<any>('updateInstitution'))
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
    this.messageService.add(`InstitutionService: ${message}`);
  }
}
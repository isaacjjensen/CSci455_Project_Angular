import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
 
import { Prescription } from './prescription';
import { MessageService } from '../message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class PrescriptionService {

  private prescriptionUrl = 'api/prescriptions';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET prescriptions from the server */
  getPrescriptions (): Observable<Prescription[]> {
    return this.http.get<Prescription[]>(this.prescriptionUrl)
      .pipe(
        tap(_ => this.log('fetched prescriptions')),
        catchError(this.handleError<Prescription[]>('getPrescriptions', []))
      );
  }

  /** GET prescription by id. Return `undefined` when id not found */
  getPrescriptionNo404<Data>(id: string): Observable<Prescription> {
    const url = `${this.prescriptionUrl}/?id=${id}`;
    return this.http.get<Prescription[]>(url)
      .pipe(
        map(prescriptions => prescriptions[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} prescription id=${id}`);
        }),
        catchError(this.handleError<Prescription>(`getPrescription id=${id}`))
      );
  }

  /** GET prescription by id. Will 404 if id not found */
  getPrescription(id: string): Observable<Prescription> {
    const url = `${this.prescriptionUrl}/${id}`;
    return this.http.get<Prescription>(url).pipe(
      tap(_ => this.log(`fetched prescription id=${id}`)),
      catchError(this.handleError<Prescription>(`getPrescription id=${id}`))
    );
  }

  //////// Save methods //////////
 
  /** POST: add a new prescription to the server */
  addPrescription (prescription: Prescription): Observable<Prescription> {
    return this.http.post<Prescription>(this.prescriptionUrl, prescription, httpOptions).pipe(
      tap((newPrescription: Prescription) => this.log(`added prescription w/ id=${newPrescription.id}`)),
      catchError(this.handleError<Prescription>('addPrescription'))
    );
  }

  /** DELETE: delete the prescription from the server */
  deletePrescription (prescription: Prescription | string): Observable<Prescription> {
    const id = typeof prescription === 'string' ? prescription : prescription.id;
    const url = `${this.prescriptionUrl}/${id}`;
 
    return this.http.delete<Prescription>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted prescription id=${id}`)),
      catchError(this.handleError<Prescription>('deletePrescription'))
    );
  }

  /** PUT: update the prescription on the server */
  updatePrescription (prescription: Prescription): Observable<any> {
    return this.http.put(this.prescriptionUrl, prescription, httpOptions).pipe(
      tap(_ => this.log(`updated prescription id=${prescription.id}`)),
      catchError(this.handleError<any>('updatePrescription'))
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
    this.messageService.add(`PrescriptionService: ${message}`);
  }
}
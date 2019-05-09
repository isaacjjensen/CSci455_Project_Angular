import { Injectable }                from '@angular/core';
import { HttpClient, HttpHeaders }   from '@angular/common/http';
 
import { Observable, of }            from 'rxjs';
import { catchError, map, tap }      from 'rxjs/operators';
 
import { Patient }                   from './patient';
import { MedicalRecord }             from './medical-record';
import { MessageService }            from '../message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class MedicalRecordService {

  private medicalRecordUrl = 'api/medical-records';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getMedicalRecord(id: string): Observable<MedicalRecord> {
    const url = `${this.medicalRecordUrl}/${id}`;
    return this.http.get<MedicalRecord>(url).pipe(
      tap(_ => this.log(`fetched medical record id=${id}`)),
      catchError(this.handleError<MedicalRecord>(`getMedicalRecord id=${id}`))
    );
  }

  /** POST: add a new medical record to the server */
  addMedicalRecord (medicalRecord: MedicalRecord): Observable<MedicalRecord> {
    return this.http.post<MedicalRecord>(this.medicalRecordUrl, medicalRecord, httpOptions).pipe(
      tap((newMedicalRecord: MedicalRecord) => this.log(`added medical record w/ id=${newMedicalRecord.id}`)),
      catchError(this.handleError<MedicalRecord>('addMedicalRecord'))
    );
  }

  /** DELETE: delete the medical record from the server */
  deleteMedicalRecord (medicalRecord: MedicalRecord | string): Observable<MedicalRecord> {
    const id = typeof medicalRecord === 'string' ? medicalRecord : medicalRecord.id;
    const url = `${this.medicalRecordUrl}/${id}`;

    return this.http.delete<MedicalRecord>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted medical record id=${id}`)),
      catchError(this.handleError<MedicalRecord>('deleteMedicalRecord'))
    );
  }

  /** PUT: update the medical record on the server */
  updateMedicalRecord (medicalRecord: MedicalRecord): Observable<any> {
    return this.http.put(this.medicalRecordUrl, medicalRecord, httpOptions).pipe(
      tap(_ => this.log(`updated medical record id=${medicalRecord.id}`)),
      catchError(this.handleError<any>('updateMedicalRecord'))
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

  /** Log a PatientService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`MedicalRecordService: ${message}`);
  }
}
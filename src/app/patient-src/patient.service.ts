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
export class PatientService {

  private patientUrl = 'api/patients';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getPatients (): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.patientUrl)
      .pipe(
        tap(_ => this.log('fetched patients')),
        catchError(this.handleError<Patient[]>('getPatients', []))
      );
  }

  getPatientNo404<Data>(id: string): Observable<Patient> {
    const url = `${this.patientUrl}/?id=${id}`;
    return this.http.get<Patient[]>(url)
      .pipe(
        map(patients => patients[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} patient id=${id}`);
        }),
        catchError(this.handleError<Patient>(`getPatient id=${id}`))
      );
  }

  getPatient(id: string): Observable<Patient> {
    const url = `${this.patientUrl}/${id}`;
    return this.http.get<Patient>(url).pipe(
      tap(_ => this.log(`fetched patient id=${id}`)),
      catchError(this.handleError<Patient>(`getPatient id=${id}`))
    );
  }

  searchPatients(term: string): Observable<Patient[]> {
    if (!term.trim()) {
      // if not search term, return empty patient array.
      return of([]);
    }
    return this.http.get<Patient[]>(`${this.patientUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found patients matching "${term}"`)),
      catchError(this.handleError<Patient[]>('searchPatients', []))
    );
  }

  // Adds, Deletes, and Updates link medical records and with the patient

  /** POST: add a new patient to the server */
  addPatient (patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(this.patientUrl, patient, httpOptions).pipe(
      tap((newPatient: Patient) => this.log(`added patient w/ id=${newPatient.id}`)),
      catchError(this.handleError<Patient>('addPatient'))
    );
  }

  /** DELETE: delete the patient from the server */
  deletePatient (patient: Patient | string): Observable<Patient> {
    const id = typeof patient === 'string' ? patient : patient.id;
    const url = `${this.patientUrl}/${id}`;

    return this.http.delete<Patient>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted patient id=${id}`)),
      catchError(this.handleError<Patient>('deletePatient'))
    );
  }

  /** PUT: update the patient on the server */
  updatePatient (patient: Patient): Observable<any> {
    return this.http.put(this.patientUrl, patient, httpOptions).pipe(
      tap(_ => this.log(`updated patient id=${patient.id}`)),
      catchError(this.handleError<any>('updatePatient'))
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
    this.messageService.add(`PatientService: ${message}`);
  }
}
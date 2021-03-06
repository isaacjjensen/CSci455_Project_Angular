import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
 
import { Appointment } from './appointment';
import { MessageService } from '../message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class AppointmentService {

  private appointmentUrl = 'api/appointments';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET appointments from the server */
  getAppointments (): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.appointmentUrl)
      .pipe(
        tap(_ => this.log('fetched appointments')),
        catchError(this.handleError<Appointment[]>('getAppointments', []))
      );
  }

  /** GET appointment by id. Return `undefined` when id not found */
  getAppointmentNo404<Data>(id: string): Observable<Appointment> {
    const url = `${this.appointmentUrl}/?id=${id}`;
    return this.http.get<Appointment[]>(url)
      .pipe(
        map(appointments => appointments[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} appointment id=${id}`);
        }),
        catchError(this.handleError<Appointment>(`getAppointment id=${id}`))
      );
  }

  /** GET appointment by id. Will 404 if id not found */
  getAppointment(id: string): Observable<Appointment> {
    const url = `${this.appointmentUrl}/${id}`;
    return this.http.get<Appointment>(url).pipe(
      tap(_ => this.log(`fetched appointment id=${id}`)),
      catchError(this.handleError<Appointment>(`getAppointment id=${id}`))
    );
  }

  //////// Save methods //////////
 
  /** POST: add a new appointment to the server */
  addAppointment (appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(this.appointmentUrl, appointment, httpOptions).pipe(
      tap((newAppointment: Appointment) => this.log(`added appointment w/ id=${newAppointment.id}`)),
      catchError(this.handleError<Appointment>('addAppointment'))
    );
  }

  /** DELETE: delete the appointment from the server */
  deleteAppointment (appointment: Appointment | string): Observable<Appointment> {
    const id = typeof appointment === 'string' ? appointment : appointment.id;
    const url = `${this.appointmentUrl}/${id}`;
 
    return this.http.delete<Appointment>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted appointment id=${id}`)),
      catchError(this.handleError<Appointment>('deleteAppointment'))
    );
  }

  /** PUT: update the appointment on the server */
  updateAppointment (appointment: Appointment): Observable<any> {
    return this.http.put(this.appointmentUrl, appointment, httpOptions).pipe(
      tap(_ => this.log(`updated appointment id=${appointment.id}`)),
      catchError(this.handleError<any>('updateAppointment'))
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
    this.messageService.add(`AppointmentService: ${message}`);
  }
}
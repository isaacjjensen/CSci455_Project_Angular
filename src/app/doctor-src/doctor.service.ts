import { Injectable } 				      from '@angular/core';
import { HttpClient, HttpHeaders } 	from '@angular/common/http';
 
import { Observable, of } 			    from 'rxjs';
import { catchError, map, tap } 	  from 'rxjs/operators';

import { Doctor } 					        from './doctor';
import { MessageService } 			    from '../message.service';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class DoctorService {

  private doctorUrl = 'api/doctors';

  constructor(
  	private http: HttpClient,
  	private messageService: MessageService) { }

  /** GET doctors from server */
  getDoctors (): Observable<Doctor[]> {
  	return this.http.get<Doctor[]>(this.doctorUrl)
  		.pipe(
  			tap(_ => this.log('fetched doctors')),
  			catchError(this.handleError<Doctor[]>('getDoctors', []))
  		);
  }

  /** GET doctor by id. Return 'undefined' when id not found */
  getDoctorNo404<Data>(id: string): Observable<Doctor> {
  	const url = `${this.doctorUrl}/?id=${id}`;
  	return this.http.get<Doctor[]>(url)
  		.pipe(
  			map(doctors => doctors[0]),
  			tap(h => {
  				const outcome = h ? 'fetched' : 'did not find';
  				this.log(`${outcome} doctor id=${id}`);
  			}),
  			catchError(this.handleError<Doctor>(`getDoctor id=${id}`))
  		);
  }

  /** GET doctor by id. Will 404 if id not found */
  getDoctor(id: string): Observable<Doctor> {
  	const url = `${this.doctorUrl}/${id}`;
  	return this.http.get<Doctor>(url).pipe(
  		tap(_ => this.log(`fetched doctor id=${id}`)),
  		catchError(this.handleError<Doctor>(`getDoctor id=${id}`))
  	);
  }

  /** GET doctors whose name contains search term */
  searchDoctors(term: string): Observable<Doctor[]> {
  	if (!term.trim()) {
  		return of([]);
  	}
  	return this.http.get<Doctor[]>(`${this.doctorUrl}/$name=${term}`).pipe(
  		tap(_ => this.log(`found doctors matching "${term}"`)),
  		catchError(this.handleError<Doctor[]>('searchDoctors', []))
  	);
  }

  private handleError<T> (operation = 'operation', result?: T) {
  	return (error: any): Observable<T> => {
  		console.error(error);
  		this.log(`${operation} failed: ${error.message}`);
  		return of(result as T);
  	}
  }

  private log(message: string) {
  	this.messageService.add(`DoctorService: ${message}`);
  }
}

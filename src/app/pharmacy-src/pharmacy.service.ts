import { Injectable } 					from '@angular/core';
import { HttpClient, HttpHeaders } 		from '@angular/common/http';
 
import { Observable, of } 				from 'rxjs';
import { catchError, map, tap } 		from 'rxjs/operators';
 
import { Pharmacy } 					from './pharmacy';
import { MessageService } 				from '../message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class PharmacyService {

  private pharmacyUrl = 'api/pharmacies';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET pharmacies from the server */
  getPharmacies (): Observable<Pharmacy[]> {
    return this.http.get<Pharmacy[]>(this.pharmacyUrl)
      .pipe(
        tap(_ => this.log('fetched pharmacies')),
        catchError(this.handleError<Pharmacy[]>('getPharmacies', []))
      );
  }

  /** GET pharmacy by id. Return `undefined` when id not found */
  getPharmacyNo404<Data>(id: string): Observable<Pharmacy> {
    const url = `${this.pharmacyUrl}/?id=${id}`;
    return this.http.get<Pharmacy[]>(url)
      .pipe(
        map(pharmacies => pharmacies[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} pharmacy id=${id}`);
        }),
        catchError(this.handleError<Pharmacy>(`getPharmacy id=${id}`))
      );
  }

  /** GET pharmacy by id. Will 404 if id not found */
  getPharmacy(id: string): Observable<Pharmacy> {
    const url = `${this.pharmacyUrl}/${id}`;
    return this.http.get<Pharmacy>(url).pipe(
      tap(_ => this.log(`fetched pharmacy id=${id}`)),
      catchError(this.handleError<Pharmacy>(`getPharmacy id=${id}`))
    );
  }

  //////// Save methods //////////
 
  /** POST: add a new pharmacy to the server */
  addPharmacy (pharmacy: Pharmacy): Observable<Pharmacy> {
    return this.http.post<Pharmacy>(this.pharmacyUrl, pharmacy, httpOptions).pipe(
      tap((newPharmacy: Pharmacy) => this.log(`added pharmacy w/ id=${newPharmacy.id}`)),
      catchError(this.handleError<Pharmacy>('addPharmacy'))
    );
  }

  /** DELETE: delete the pharmacy from the server */
  deletePharmacy (pharmacy: Pharmacy | string): Observable<Pharmacy> {
    const id = typeof pharmacy === 'string' ? pharmacy : pharmacy.id;
    const url = `${this.pharmacyUrl}/${id}`;
 
    return this.http.delete<Pharmacy>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted pharmacy id=${id}`)),
      catchError(this.handleError<Pharmacy>('deletePharmacy'))
    );
  }

  /** PUT: update the pharmacy on the server */
  updatePharmacy (pharmacy: Pharmacy): Observable<any> {
    return this.http.put(this.pharmacyUrl, pharmacy, httpOptions).pipe(
      tap(_ => this.log(`updated pharmacy id=${pharmacy.id}`)),
      catchError(this.handleError<any>('updatePharmacy'))
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
    this.messageService.add(`PharmacyService: ${message}`);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
 
import { Payment } from './payment';
import { MessageService } from '../message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class PaymentService {

  private paymentUrl = 'api/payments';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET payments from the server */
  getPayments (): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.paymentUrl)
      .pipe(
        tap(_ => this.log('fetched payments')),
        catchError(this.handleError<Payment[]>('getPayments', []))
      );
  }

  /** GET payment by id. Return `undefined` when id not found */
  getPaymentNo404<Data>(id: string): Observable<Payment> {
    const url = `${this.paymentUrl}/?id=${id}`;
    return this.http.get<Payment[]>(url)
      .pipe(
        map(payments => payments[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} payment id=${id}`);
        }),
        catchError(this.handleError<Payment>(`getPayment id=${id}`))
      );
  }

  /** GET payment by id. Will 404 if id not found */
  getPayment(id: string): Observable<Payment> {
    const url = `${this.paymentUrl}/${id}`;
    return this.http.get<Payment>(url).pipe(
      tap(_ => this.log(`fetched payment id=${id}`)),
      catchError(this.handleError<Payment>(`getPayment id=${id}`))
    );
  }

  //////// Save methods //////////
 
  /** POST: add a new payment to the server */
  addPayment (payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(this.paymentUrl, payment, httpOptions).pipe(
      tap((newPayment: Payment) => this.log(`added payment w/ id=${newPayment.id}`)),
      catchError(this.handleError<Payment>('addPayment'))
    );
  }

  /** DELETE: delete the payment from the server */
  deletePayment (payment: Payment | string): Observable<Payment> {
    const id = typeof payment === 'string' ? payment : payment.id;
    const url = `${this.paymentUrl}/${id}`;
 
    return this.http.delete<Payment>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted payment id=${id}`)),
      catchError(this.handleError<Payment>('deletePayment'))
    );
  }

  /** PUT: update the payment on the server */
  updatePayment (payment: Payment): Observable<any> {
    return this.http.put(this.paymentUrl, payment, httpOptions).pipe(
      tap(_ => this.log(`updated payment id=${payment.id}`)),
      catchError(this.handleError<any>('updatePayment'))
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
    this.messageService.add(`PaymentService: ${message}`);
  }
}
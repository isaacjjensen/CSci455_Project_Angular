import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
 
import { Department } from './department';
import { MessageService } from '../message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class DepartmentService {

  private departmentUrl = 'api/departments';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET departments from the server */
  getDepartments (): Observable<Department[]> {
    return this.http.get<Department[]>(this.departmentUrl)
      .pipe(
        tap(_ => this.log('fetched departments')),
        catchError(this.handleError<Department[]>('getDepartments', []))
      );
  }

  /** GET department by id. Return `undefined` when id not found */
  getDepartmentNo404<Data>(id: string): Observable<Department> {
    const url = `${this.departmentUrl}/?id=${id}`;
    return this.http.get<Department[]>(url)
      .pipe(
        map(departments => departments[0]), // returns a {0|1} element array
        tap(d => {
          const outcome = d ? 'fetched' : 'did not find';
          this.log(`${outcome} department id=${id}`);
        }),
        catchError(this.handleError<Department>(`getDepartment id=${id}`))
      );
  }

  /** GET department by id. */
  getDepartment(id: string): Observable<Department> {
    const url = `${this.departmentUrl}/${id}`;
    return this.http.get<Department>(url).pipe(
      tap(_ => this.log(`fetched department id=${id}`)),
      catchError(this.handleError<Department>(`getDepartment id=${id}`))
    );
  }

  //////// Save methods //////////
 
  /** POST: add a new department to the server */
  addDepartment (department: Department): Observable<Department> {
    return this.http.post<Department>(this.departmentUrl, department, httpOptions).pipe(
      tap((newDepartment: Department) => this.log(`added department w/ id=${newDepartment.id}`)),
      catchError(this.handleError<Department>('addDepartment'))
    );
  }

  /** DELETE: delete the department from the server */
  deleteDepartment (department: Department | string): Observable<Department> {
    const id = typeof department === 'string' ? department : department.id;
    const url = `${this.departmentUrl}/${id}`;
 
    return this.http.delete<Department>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted department id=${id}`)),
      catchError(this.handleError<Department>('deleteDepartment'))
    );
  }

  /** PUT: update the department on the server */
  updateDepartment (department: Department): Observable<any> {
    return this.http.put(this.departmentUrl, department, httpOptions).pipe(
      tap(_ => this.log(`updated department id=${department.id}`)),
      catchError(this.handleError<any>('updateDepartment'))
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
    this.messageService.add(`DepartmentService: ${message}`);
  }
}
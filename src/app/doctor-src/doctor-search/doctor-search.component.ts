import { Component, OnInit } 	from '@angular/core';
 
import { Observable, Subject } 	from 'rxjs';
 
import {
   debounceTime, distinctUntilChanged, switchMap
 } 								from 'rxjs/operators';
 
import { Doctor } 				from '../doctor';
import { DoctorService } 		from '../doctor.service';
 
@Component({
  selector: 'app-doctor-search',
  templateUrl: './doctor-search.component.html',
  styleUrls: [ './doctor-search.component.css' ]
})
export class DoctorSearchComponent implements OnInit {
  doctors$: Observable<Doctor[]>;
  private searchTerms = new Subject<string>();
 
  constructor(private doctorService: DoctorService) {}
 
  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
 
  ngOnInit(): void {
    this.doctors$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
 
      // ignore new term if same as previous term
      distinctUntilChanged(),
 
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.doctorService.searchDoctors(term)),
    );
  }
}
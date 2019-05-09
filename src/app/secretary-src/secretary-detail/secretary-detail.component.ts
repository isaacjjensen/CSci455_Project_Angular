import { Component, OnInit, Input } 		from '@angular/core';
import { ActivatedRoute } 				    from '@angular/router';
import { Location } 					    from '@angular/common';
 
import { Secretary }         				from '../secretary';
import { SecretaryService }  				from '../secretary.service';

@Component({
  selector: 'app-secretary-detail',
  templateUrl: './secretary-detail.component.html',
  styleUrls: ['./secretary-detail.component.css']
})
export class SecretaryDetailComponent implements OnInit {
  @Input() secretary: Secretary;
 
  constructor(
    private route: ActivatedRoute,
    private secretaryService: SecretaryService,
    private location: Location
  ) {}
 
  ngOnInit(): void {
    this.getSecretary();
  }
 
  getSecretary(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.secretaryService.getSecretary(id)
      .subscribe(secretary => this.secretary = secretary);
  }
 
  goBack(): void {
    this.location.back();
  }
 
 save(): void {
    this.secretaryService.updateSecretary(this.secretary)
      .subscribe(() => this.goBack());
  }
}
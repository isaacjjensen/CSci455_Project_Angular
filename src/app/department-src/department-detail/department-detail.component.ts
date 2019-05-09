import { Component, OnInit, Input } 	from '@angular/core';
import { ActivatedRoute } 				    from '@angular/router';
import { Location } 					        from '@angular/common';
 
import { Department }         				from '../department';
import { DepartmentService }  				from '../department.service';

@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.css']
})
export class DepartmentDetailComponent implements OnInit {
  @Input() department: Department;
 
  constructor(
    private route: ActivatedRoute,
    private departmentService: DepartmentService,
    private location: Location
  ) {}
 
  ngOnInit(): void {
    this.getDepartment();
  }
 
  getDepartment(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.departmentService.getDepartment(id)
      .subscribe(department => this.department = department);
  }
 
  goBack(): void {
    this.location.back();
  }
 
 save(): void {
    this.departmentService.updateDepartment(this.department)
      .subscribe(() => this.goBack());
  }
}
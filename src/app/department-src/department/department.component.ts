import { Component, OnInit } 	from '@angular/core';

import { Department } 			from '../department';
import { DepartmentService }	from '../department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  departments: Department[];
 
  constructor(private departmentService: DepartmentService) { }
 
  ngOnInit() {
    this.getDepartments();
  }
 
  getDepartments(): void {
    this.departmentService.getDepartments()
    .subscribe(departments => this.departments = departments);
  }
 
  add(id: string, d_num: number, d_name: string, phone: string, 
  	  head_id: string, inst_id: string): void {
    id = id.trim();
    d_name = d_name.trim();
    phone = phone.trim();
    head_id = head_id.trim();
    inst_id = inst_id.trim();
    this.departmentService.addDepartment({ id, d_num, d_name, phone, head_id, inst_id } as Department)
      .subscribe(department => {
        this.departments.push(department);
      });
  }
 
  delete(department: Department): void {
    this.departments = this.departments.filter(d => d !== department);
    this.departmentService.deleteDepartment(department).subscribe();
  }
 
}
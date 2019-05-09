import { Component, OnInit, Input } 	from '@angular/core';
import { ActivatedRoute } 				from '@angular/router';
import { Location } 					from '@angular/common';
 
import { Payment }         				from '../payment';
import { PaymentService }  				from '../payment.service';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.css']
})
export class PaymentDetailComponent implements OnInit {
  @Input() payment: Payment;
 
  constructor(
    private route: ActivatedRoute,
    private paymentService: PaymentService,
    private location: Location
  ) {}
 
  ngOnInit(): void {
    this.getPayment();
  }
 
  getPayment(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.paymentService.getPayment(id)
      .subscribe(payment => this.payment = payment);
  }
 
  goBack(): void {
    this.location.back();
  }
 
 save(): void {
    this.paymentService.updatePayment(this.payment)
      .subscribe(() => this.goBack());
  }
}
import { Component, OnInit } 	from '@angular/core';

import { Payment } 			  from '../payment';
import { PaymentService }	from '../payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  payments: Payment[];
 
  constructor(private paymentService: PaymentService) { }
 
  ngOnInit() {
    this.getPayments();
  }
 
  getPayments(): void {
    this.paymentService.getPayments()
    .subscribe(payments => this.payments = payments);
  }
 
  add(id: string, amount: number, paid: number, date: string,
  	  reason: string, status: string, insur_id: string): void {
    id = id.trim();
    date = date.trim();
    reason = reason.trim();
    status = status.trim();
    insur_id = insur_id.trim();
    this.paymentService.addPayment({ id, amount, paid, date, reason, status, insur_id } as Payment)
      .subscribe(payment => {
        this.payments.push(payment);
      });
  }
 
  delete(payment: Payment): void {
    this.payments = this.payments.filter(a => a !== payment);
    this.paymentService.deletePayment(payment).subscribe();
  }
 
}
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  @ViewChild('paymentRef', { static: true }) payment!: ElementRef;
  amount = 51;
  constructor(private router: Router) {}
  ngOnInit() {
    console.log(window.paypal);
    window.paypal
      .Buttons({
        style: {
          layout: 'horizontal',
          color: 'blue',
          shape: 'rect',
          label: 'paypal',
        },
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: this.amount.toString(),
                  currency: 'USD',
                },
              },
            ],
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((detail: any) => {
            console.log('approvedsection:', detail);
          });
        },
        onError: (error: any) => {
          console.log('errorsection:', error);
        },
      })
      .render(this.payment.nativeElement);
  }
  cancel() {
    this.router.navigate(['/']);
  }
}

import { NgxSpinnerService } from 'ngx-spinner';
import { PaymentService } from './../services/payment.service';
import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  paymentKey: string;
  constructor(
    private sanitizer: DomSanitizer,
    private spinner: NgxSpinnerService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.getPaymentKey();
  }
  getPaymentKey(): any {
    this.spinner.show();
    const obj = {
      firstName: 'Alaa',
      lastName: 'Darwish',
      email: 'alaadarwish93@gmail.com',
      phoneNumber: '01026481249',
      estimatedCost: 1,
    };
    this.paymentService.getPaymentKey(obj).subscribe(
      (data) => {
        this.paymentKey = data.paymentKey;
        this.spinner.hide();
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
      }
    );
  }
  getSafeIFrameUrl(): any {
    const paymentIframeUrl = `https://accept.paymobsolutions.com/api/acceptance/iframes/${environment.weAcceptIframeKey}?payment_token=${this.paymentKey}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(paymentIframeUrl);
  }
}

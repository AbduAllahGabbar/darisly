import { PromoCodeService } from '../services/promoCode.service';
import { PromoCode } from './promoCode';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-promo',
  templateUrl: './promo-code.component.html',
  styleUrls: ['./promo-code.component.css'],
})
export class PromoCodeComponent implements OnInit {
  @ViewChild('closeButton') closeButton: ElementRef;
  allPromoCodes = [];
  promoCode: PromoCode = new PromoCode();
  constructor(
    private promoCodeService: PromoCodeService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getAllPromoCodes();
  }
  getAllPromoCodes(): any {
    this.spinner.show();
    this.promoCodeService.getAllPromoCodes().subscribe((result) => {
      this.allPromoCodes = result;
      this.spinner.hide();
    });
  }
  save(): any {
    if (!this.promoCode.promoCode) {
      this.callSwal('Invalid !', 'Please enter promo code', 'warning');
      return false;
    }
    if (!this.promoCode.discount) {
      this.callSwal('Invalid !', 'Please enter type', 'warning');
      return false;
    }
    if (!this.promoCode.value) {
      this.callSwal('Invalid !', 'Please enter value', 'warning');
      return false;
    }
    if (!this.promoCode.expiryDate) {
      this.callSwal('Invalid !', 'Please enter expiry date', 'warning');
      return false;
    }
    this.spinner.show();
    this.promoCodeService.createPromoCode(this.promoCode).subscribe(
      (data) => {
        this.callSwal('Created !', '"Data created successfully', 'success');
        this.closeButton.nativeElement.click();
        this.spinner.hide();
        this.reset();
        this.getAllPromoCodes();
      },
      (err) => {
        if (err.error.code === 11000) {
          this.callSwal('Error !', 'Promo Code Is Already Saved', 'error');
        } else {
          this.callSwal(
            'Error !',
            'Something Went wrong,Please try again',
            'error'
          );
        }
        this.closeButton.nativeElement.click();
        this.spinner.hide();
        this.reset();
        this.getAllPromoCodes();
      }
    );
  }
  deletePromoCode(data): any {
    Swal.fire({
      title: 'Deletion Confirmation',
      text: 'Do you want to delete this promo code?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: 'rgb(0, 141, 96)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        this.promoCodeService.deletePromoCode(data._id).subscribe(
          (c) => {},
          (error) => {
            if (error.status === 404) {
              this.callSwal('Invalid !', 'Item is not found', 'error');
            } else {
              this.callSwal(
                'Deleted !',
                'Data deleted successfully',
                'success'
              );
            }
            this.spinner.hide();
            this.getAllPromoCodes();
          }
        );
      }
    });
  }
  callSwal(title, text, icon): any {
    return Swal.fire({
      title,
      text,
      icon,
      timer: 1500,
      showConfirmButton: false,
    });
  }
  reset(): any {
    this.promoCode = new PromoCode();
  }
}

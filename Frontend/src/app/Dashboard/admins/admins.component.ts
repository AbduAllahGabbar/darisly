import { DashboardAdminService } from './../services/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Admin } from './admin';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css'],
})
export class AdminsComponent {
  @ViewChild('closeButton') closeButton: ElementRef;
  allAdmins = [];
  admin: Admin = new Admin();
  constructor(
    private dashboardAdminService: DashboardAdminService,
    private spinner: NgxSpinnerService
  ) {
    this.getAllAdmins();
  }

  getAllAdmins(): any {
    this.spinner.show();
    this.dashboardAdminService.getAllAdmins().subscribe((result) => {
      this.allAdmins = result;
      this.spinner.hide();
    });
  }
  save(): any {
    if (!this.admin.username) {
      this.callSwal('Invalid !', 'Please enter username', 'warning');
      return false;
    }
    if (!this.admin.password) {
      this.callSwal('Invalid !', 'Please enter password', 'warning');
      return false;
    }
    if (this.admin.password.length < 6) {
      this.callSwal(
        'Invalid !',
        'Password must be at least 6 chars',
        'warning'
      );
      return false;
    }
    this.spinner.show();
    this.dashboardAdminService.createAdmin(this.admin).subscribe(
      (data) => {
        this.callSwal('Created !', '"Data created successfully', 'success');
        this.closeButton.nativeElement.click();
        this.spinner.hide();
        this.reset();
        this.getAllAdmins();
      },
      (err) => {
        if (err.error.code === 11000) {
          this.callSwal('Error !', 'Admin Is Already Saved', 'error');
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
        this.getAllAdmins();
      }
    );
  }
  deleteAdmin(data): any {
    Swal.fire({
      title: 'Deletion Confirmation',
      text: 'Do you want to delete this admin?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: 'rgb(0, 141, 96)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        this.dashboardAdminService.deleteAdmin(data._id).subscribe(
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
            this.getAllAdmins();
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
    this.admin = new Admin();
  }
}

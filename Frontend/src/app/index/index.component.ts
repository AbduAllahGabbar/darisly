import { AuthenticationService } from './../Auth/auth.service';
import { Admin } from '../admin';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  admin: Admin = new Admin();

  constructor(
    private router: Router,
    private adminService: AuthenticationService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {}
  login(): any {
    if (!this.admin.username) {
      this.callSwal('Invalid !', 'Please enter username', 'warning');
      return false;
    }
    if (!this.admin.password) {
      this.callSwal('Invalid !', 'Please enter password', 'warning');
      return false;
    }
    this.spinner.show();
    this.adminService
      .login(this.admin)
      .pipe(first())
      .subscribe(
        (data) => {
          this.spinner.hide();
          this.router.navigate(['dashboard/home']);
        },
        (err) => {
          let error;
          if (err.status === 0) {
            error = 'Server is down ,Please check again later';
          } else {
            error = err.error;
          }
          this.spinner.hide();

          this.callSwal('Error !', error, 'error');
        }
      );
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
}

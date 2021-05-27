import { EducationSystem } from './educationSystem';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { EducationSystemService } from '../services/education-system.service';

@Component({
  selector: 'app-education-system',
  templateUrl: './education-system.component.html',
  styleUrls: ['./education-system.component.css'],
})
export class EducationSystemComponent implements OnInit {
  @ViewChild('closeButton') closeButton: ElementRef;
  allEducationSystems = [];
  educationSystem: EducationSystem = new EducationSystem();
  constructor(
    private educationSystemService: EducationSystemService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getAllEducationSystems();
  }
  getAllEducationSystems(): any {
    this.spinner.show();
    this.educationSystemService.getAllEducationSystems().subscribe((result) => {
      this.allEducationSystems = result;
      this.spinner.hide();
    });
  }
  save(): any {
    if (!this.educationSystem.name) {
      this.callSwal('Invalid !', 'Please enter name', 'warning');
      return false;
    }
    if (!this.educationSystem.nameAr) {
      this.callSwal('Invalid !', 'Please enter arabic name', 'warning');
      return false;
    }
    this.spinner.show();
    this.educationSystemService
      .createEducationSystem(this.educationSystem)
      .subscribe(
        (data) => {
          this.callSwal('Created !', '"Data created successfully', 'success');
          this.closeButton.nativeElement.click();
          this.spinner.hide();
          this.reset();
          this.getAllEducationSystems();
        },
        (err) => {
          if (err.error.code === 11000) {
            this.callSwal(
              'Error !',
              'Education System Is Already Saved',
              'error'
            );
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
          this.getAllEducationSystems();
        }
      );
  }
  deleteEducationSystem(data): any {
    Swal.fire({
      title: 'Deletion Confirmation',
      text: 'Do you want to delete this education system?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: 'rgb(0, 141, 96)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        this.educationSystemService.deleteEducationSystem(data._id).subscribe(
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
            this.getAllEducationSystems();
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
    this.educationSystem = new EducationSystem();
  }
}

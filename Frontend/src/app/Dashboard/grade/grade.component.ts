import { EducationSystemService } from './../services/education-system.service';
import { GradeService } from './../services/grade.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { Grade } from './grade';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css'],
})
export class GradeComponent implements OnInit {
  @ViewChild('closeButton') closeButton: ElementRef;
  allGrades = [];
  allEducationSystems = [];
  grade: Grade = new Grade();
  constructor(
    private gradeService: GradeService,
    private educationSystemService: EducationSystemService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getAllGrades();
    this.getAllEducationSystems();
  }
  getAllGrades(): any {
    this.spinner.show();
    this.gradeService.getAllGradesWithoutPagination().subscribe((result) => {
      this.allGrades = result;
      this.spinner.hide();
    });
  }
  save(): any {
    if (!this.grade.name) {
      this.callSwal('Invalid !', 'Please enter name', 'warning');
      return false;
    }
    if (!this.grade.nameAr) {
      this.callSwal('Invalid !', 'Please enter arabic name', 'warning');
      return false;
    }
    if (
      !this.grade.educationSystems ||
      this.grade.educationSystems.length < 1
    ) {
      this.callSwal(
        'Invalid !',
        'Please select at least one education system',
        'warning'
      );
      return false;
    }
    this.spinner.show();
    this.gradeService.createGrade(this.grade).subscribe(
      (data) => {
        this.callSwal('Created !', '"Data created successfully', 'success');
        this.closeButton.nativeElement.click();
        this.spinner.hide();
        this.reset();
        this.getAllGrades();
      },
      (err) => {
        if (err.error.code === 11000) {
          this.callSwal('Error !', 'Grade Is Already Saved', 'error');
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
        this.getAllGrades();
      }
    );
  }
  deleteGrade(data): any {
    Swal.fire({
      title: 'Deletion Confirmation',
      text: 'Do you want to delete this grade?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: 'rgb(0, 141, 96)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        this.gradeService.deleteGrade(data._id).subscribe(
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
            this.getAllGrades();
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
    this.grade = new Grade();
  }
  getAllEducationSystems(): any {
    this.spinner.show();
    this.educationSystemService.getAllEducationSystems().subscribe((result) => {
      this.allEducationSystems = result;
      this.spinner.hide();
    });
  }
}

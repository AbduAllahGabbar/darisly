import { EducationSystemService } from './../services/education-system.service';
import { SubjectService } from './../services/subject.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { Subject } from './subject';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css'],
})
export class SubjectComponent implements OnInit {
  @ViewChild('closeButton') closeButton: ElementRef;
  allSubjects = [];
  allEducationSystems = [];
  subject: Subject = new Subject();
  constructor(
    private subjectService: SubjectService,
    private educationSystemService: EducationSystemService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getAllSubjects();
    this.getAllEducationSystems();
  }
  getAllSubjects(): any {
    this.spinner.show();
    this.subjectService
      .getAllSubjectsWithoutPagination()
      .subscribe((result) => {
        this.allSubjects = result;
        this.spinner.hide();
      });
  }
  save(): any {
    if (!this.subject.name) {
      this.callSwal('Invalid !', 'Please enter name', 'warning');
      return false;
    }
    if (!this.subject.nameAr) {
      this.callSwal('Invalid !', 'Please enter arabic name', 'warning');
      return false;
    }
    if (
      !this.subject.educationSystems ||
      this.subject.educationSystems.length < 1
    ) {
      this.callSwal(
        'Invalid !',
        'Please select at least one education system',
        'warning'
      );
      return false;
    }
    this.spinner.show();
    this.subjectService.createSubject(this.subject).subscribe(
      (data) => {
        this.callSwal('Created !', '"Data created successfully', 'success');
        this.closeButton.nativeElement.click();
        this.spinner.hide();
        this.reset();
        this.getAllSubjects();
      },
      (err) => {
        if (err.error.code === 11000) {
          this.callSwal('Error !', 'Subject Is Already Saved', 'error');
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
        this.getAllSubjects();
      }
    );
  }
  deleteSubject(data): any {
    Swal.fire({
      title: 'Deletion Confirmation',
      text: 'Do you want to delete this subject?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: 'rgb(0, 141, 96)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        this.subjectService.deleteSubject(data._id).subscribe(
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
            this.getAllSubjects();
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
    this.subject = new Subject();
  }
  getAllEducationSystems(): any {
    this.spinner.show();
    this.educationSystemService.getAllEducationSystems().subscribe((result) => {
      this.allEducationSystems = result;
      this.spinner.hide();
    });
  }
}

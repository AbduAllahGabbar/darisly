import { CourseService } from './../services/course.service';
import { SubjectService } from './../services/subject.service';
import { TeacherService } from './../services/teacher.service';
import { PackageService } from './../services/package.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { Package } from './package';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css'],
})
export class PackagesComponent implements OnInit {
  @ViewChild('closeButton') closeButton: ElementRef;
  allCourses = [];
  allPackages = [];
  allTeachers = [];
  allSubjects = [];
  package: Package = new Package();
  constructor(
    private packageService: PackageService,
    private teacherService: TeacherService,
    private subjectService: SubjectService,
    private courseService: CourseService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getAllPackages();
    this.getAllTeachers();
    this.getAllSubjects();
    this.getAllCourses();
  }
  getAllCourses(): any {
    this.spinner.show();
    this.courseService.getAllCoursesWithoutPagination().subscribe((result) => {
      this.allCourses = result;
      this.spinner.hide();
    });
  }
  getAllPackages(): any {
    this.spinner.show();
    this.packageService
      .getAllPackagesWithoutPagination()
      .subscribe((result) => {
        this.allPackages = result;
        this.spinner.hide();
      });
  }
  save(): any {
    if (!this.package.course) {
      this.callSwal('Invalid !', 'Please choose course', 'warning');
      return false;
    }
    if (!this.package.chapter) {
      this.callSwal('Invalid !', 'Please choose chapter', 'warning');
      return false;
    }
    if (!this.package.subjectId) {
      this.callSwal('Invalid !', 'Please choose subject', 'warning');
      return false;
    }
    if (!this.package.teacherId) {
      this.callSwal('Invalid !', 'Please choose teacher', 'warning');
      return false;
    }
    if (
      !this.package.packageLessons ||
      this.package.packageLessons.length < 1
    ) {
      this.callSwal('Invalid !', 'Please enter at least one lesson', 'warning');
      return false;
    }
    if (!this.package.oldPrice) {
      this.callSwal('Invalid !', 'Please enter old price', 'warning');
      return false;
    }
    if (!this.package.newPrice) {
      this.callSwal('Invalid !', 'Please enter new price', 'warning');
      return false;
    }
    if (!this.package.expiryDate) {
      this.callSwal('Invalid !', 'Please enter expiry date', 'warning');
      return false;
    }
    this.spinner.show();
    this.package.educationSystemId = this.package.course.educationSystemId;
    this.package.gradeId = this.package.course.gradeId;
    delete this.package.course;
    delete this.package.chapter;
    this.packageService.createPackage(this.package).subscribe(
      (data) => {
        this.callSwal('Created !', '"Data created successfully', 'success');
        this.closeButton.nativeElement.click();
        this.spinner.hide();
        this.reset();
        this.getAllPackages();
      },
      (err) => {
        if (err.error.code === 11000) {
          this.callSwal('Error !', 'Package Is Already Saved', 'error');
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
        this.getAllPackages();
      }
    );
  }
  deletePackage(data): any {
    Swal.fire({
      title: 'Deletion Confirmation',
      text: 'Do you want to delete this package?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: 'rgb(0, 141, 96)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        this.packageService.deletePackage(data._id).subscribe(
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
            this.getAllPackages();
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
    this.package = new Package();
  }
  getAllTeachers(): any {
    this.spinner.show();
    this.teacherService.getAllApprovedTeachers().subscribe((result) => {
      this.allTeachers = result;
      this.spinner.hide();
    });
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
  changeCourse(): any {
    this.package.chapter = '';
    this.package.teacherId = this.package.course.teacherId;
    this.package.subjectId = this.package.course.subjectId;
  }
  changeChapter(): any {
    this.package.packageLessons = '';
  }
}

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CodeService } from './../services/code.service';
import { CourseService } from './../services/course.service';
import { SubjectService } from './../services/subject.service';
import { TeacherService } from './../services/teacher.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { Code } from './code';
import { TableExport } from 'tableexport';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css'],
})
export class CodeComponent implements OnInit {
  @ViewChild('closeButton') closeButton: ElementRef;
  allCourses = [];
  allCodes = [];
  allTeachers = [];
  allSubjects = [];
  selectedCodes;
  codesModal = null;
  code: Code = new Code();
  constructor(
    private modalService: NgbModal,
    private codeService: CodeService,
    private teacherService: TeacherService,
    private subjectService: SubjectService,
    private courseService: CourseService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getAllCodes();
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
  getAllCodes(): any {
    this.spinner.show();
    this.codeService.getAllCodesWithoutPagination().subscribe((result) => {
      this.allCodes = result;
      this.spinner.hide();
    });
  }
  save(): any {
    if (!this.code.course) {
      this.callSwal('Invalid !', 'Please choose course', 'warning');
      return false;
    }
    if (!this.code.chapter) {
      this.callSwal('Invalid !', 'Please choose chapter', 'warning');
      return false;
    }
    if (!this.code.subjectId) {
      this.callSwal('Invalid !', 'Please choose subject', 'warning');
      return false;
    }
    if (!this.code.teacherId) {
      this.callSwal('Invalid !', 'Please choose teacher', 'warning');
      return false;
    }
    if (!this.code.codeLessons || this.code.codeLessons.length < 1) {
      this.callSwal('Invalid !', 'Please enter at least one lesson', 'warning');
      return false;
    }
    if (!this.code.numberOfCodes) {
      this.callSwal('Invalid !', 'Please enter number of codes', 'warning');
      return false;
    }
    this.spinner.show();
    this.code.educationSystemId = this.code.course.educationSystemId;
    this.code.gradeId = this.code.course.gradeId;
    this.code.courseId = this.code.course._id;
    delete this.code.course;
    delete this.code.chapter;
    this.codeService.createCode(this.code).subscribe(
      (data) => {
        this.callSwal('Created !', '"Data created successfully', 'success');
        this.closeButton.nativeElement.click();
        this.spinner.hide();
        this.reset();
        this.getAllCodes();
      },
      (err) => {
        if (err.error.code === 11000) {
          this.callSwal('Error !', 'Code Is Already Saved', 'error');
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
        this.getAllCodes();
      }
    );
  }
  deleteCode(data): any {
    Swal.fire({
      title: 'Deletion Confirmation',
      text: 'Do you want to delete this code?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: 'rgb(0, 141, 96)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        this.codeService.deleteCode(data._id).subscribe(
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
            this.getAllCodes();
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
    this.code = new Code();
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
    this.code.chapter = '';
    this.code.teacherId = this.code.course.teacherId;
    this.code.subjectId = this.code.course.subjectId;
  }
  changeChapter(): any {
    this.code.codeLessons = '';
  }
  showCodes(codes, content): any {
    this.selectedCodes = codes;
    this.codesModal = this.modalService.open(content, {
      size: 'lg',
      backdrop: 'static',
    });
  }
  exportCodes(): any {
    // this.codesModal.close();
    // let downloadLink;
    // const dataType = 'application/vnd.ms-excel';
    // const tableSelect = document.getElementById('codesData');
    // const tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
    // // Specify file name
    // const filename = 'Codes.xls';

    // // Create download link element
    // downloadLink = document.createElement('a');

    // document.body.appendChild(downloadLink);

    // if (navigator.msSaveOrOpenBlob) {
    //   const blob = new Blob(['\ufeff', tableHTML], {
    //     type: dataType,
    //   });
    //   navigator.msSaveOrOpenBlob(blob, filename);
    // } else {
    //   // Create a link to the file
    //   downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

    //   // Setting the file name
    //   downloadLink.download = filename;

    //   // triggering the function
    //   downloadLink.click();
    // }
    return new TableExport(document.getElementById('codesData'));
  }
}

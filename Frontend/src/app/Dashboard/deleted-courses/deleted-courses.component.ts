import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TeacherService } from './../services/teacher.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CourseService } from './../services/course.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-deleted-courses',
  templateUrl: './deleted-courses.component.html',
  styleUrls: ['./deleted-courses.component.css'],
})
export class DeletedCoursesComponent {
  @ViewChild('closeButton') closeButton: ElementRef;
  allCourses = [];
  allTeachers = [];
  selectedTutor = '';
  selectedCourse: any = '';
  clonedSelectedCourse: any = '';
  selectedChapter: any = '';
  courseSystems = ['American System', 'Egyptian System', 'British System'];
  viewCourseDetailsModal = null;
  selectedViewCourseContent;
  search;
  selectFromChapters = '';
  selectedLesson: any;
  selectedItem: any;
  editContentMode = false;

  constructor(
    private courseService: CourseService,
    private teacherService: TeacherService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService
  ) {
    this.getAllCourses();
  }
  getAllCourses(): any {
    this.spinner.show();
    this.courseService.getAllDeletedCourses().subscribe((result) => {
      result.forEach(async (element) => {
        if (element.teacher) {
          this.teacherService
            .getTeacherById(element.teacher)
            .subscribe((teacher) => {
              element.name = `${teacher.firstName} ${teacher.lastName}`;
            });
        }
      });
      this.allCourses = result;
      this.spinner.hide();
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
  openViewCourseDetailsModal(course, content): any {
    this.selectedCourse = { ...course };
    this.clonedSelectedCourse = { ...course };
    this.selectedViewCourseContent = content;
    this.viewCourseDetailsModal = this.modalService.open(content, {
      size: 'xl',
      backdrop: 'static',
    });
  }
  searchCourse(): any {
    if (this.search) {
      const searchData = { subject: this.search };
      this.courseService.searchCourse(searchData).subscribe((result) => {
        this.allCourses = result;
      });
    } else {
      this.getAllCourses();
    }
  }
  chosenChapter(data): any {
    if (data) {
      this.selectedCourse.chapters = [];
      this.selectedCourse.chapters.push(data);
    } else {
      this.selectedCourse = { ...this.clonedSelectedCourse };
    }
  }

  restoreCourse(data): any {
    Swal.fire({
      title: 'Restore Course Confirmation',
      text: 'Do you want to restore this course?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: 'rgb(0, 141, 96)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        data.isDeleted = false;
        this.courseService.updateCourse(data).subscribe((c) => {
          this.spinner.hide();
          this.getAllCourses();
          this.callSwal('Restored !', 'Data restored successfully', 'success');
        });
      }
    });
  }
}

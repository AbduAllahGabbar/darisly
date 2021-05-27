import { SubjectService } from './../services/subject.service';
import { GradeService } from './../services/grade.service';
import { EducationSystemService } from './../services/education-system.service';
import { environment } from './../../../environments/environment';
import { Content } from './content';
import { LessonService } from './../services/lesson.service';
import { Lesson } from './lesson';
import { ChapterService } from './../services/chapter.service';
import { Chapter } from './chapter';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TeacherService } from './../services/teacher.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CourseService } from './../services/course.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Swal from 'sweetalert2';
import { Course } from './course';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent {
  @ViewChild('closeButton') closeButton: ElementRef;
  allCourses = [];
  allGrades = [];
  allSubjects = [];
  allEducationSystems = [];
  course: Course = new Course();
  chapter: Chapter = new Chapter();
  lesson: Lesson = new Lesson();
  content: Content = new Content();
  allTeachers = [];
  selectedTutor = '';
  selectedCourse: any = '';
  selectedLiveSession: any = '';
  clonedSelectedCourse: any = '';
  selectedChapter: any = '';
  image;
  file;
  addChapterModal = null;
  addLessonModal = null;
  editLiveSessionModal = null;
  addContentModal = null;
  assignTeacherModal = null;
  viewCourseDetailsModal = null;
  selectedViewCourseContent;
  search;
  selectFromChapters = '';
  selectedLesson: any;
  selectedItem: any;
  editContentMode = false;
  apiUrl = environment.apiUrl;
  constructor(
    private courseService: CourseService,
    private chapterService: ChapterService,
    private lessonService: LessonService,
    private teacherService: TeacherService,
    private gradeService: GradeService,
    private educationSystemService: EducationSystemService,
    private modalService: NgbModal,
    private subjectService: SubjectService,
    private spinner: NgxSpinnerService
  ) {
    this.getAllCourses();
    this.getAllTeachers();
    this.getAllSubjects();
    this.getAllGrades();
    this.getAllEducationSystems();
  }

  // ngOnInit(): void {}
  getAllCourses(): any {
    this.spinner.show();
    this.courseService.getAllCourses().subscribe((result) => {
      this.allCourses = result;
      this.spinner.hide();
    });
  }
  createCourse(): any {
    if (!this.course.subjectId) {
      this.callSwal('Invalid !', 'Please enter subject', 'warning');
      return false;
    }
    if (!this.course.price) {
      this.callSwal('Invalid !', 'Please enter price', 'warning');
      return false;
    }
    if (!this.course.gradeId) {
      this.callSwal('Invalid !', 'Please enter grade', 'warning');
      return false;
    }
    if (!this.course.educationSystemId) {
      this.callSwal('Invalid !', 'Please enter education system', 'warning');
      return false;
    }
    if (!this.course.courseIntro) {
      this.callSwal('Invalid !', 'Please enter course intro', 'warning');
      return false;
    }
    if (!this.image) {
      this.callSwal('Invalid !', 'Please choose course icon', 'warning');
      return false;
    }
    this.spinner.show();
    this.course.courseIcon = this.image;
    this.courseService.createCourse(this.course).subscribe(
      (data) => {
        this.callSwal('Created !', '"Data created successfully', 'success');
        this.closeButton.nativeElement.click();
        this.spinner.hide();
        this.reset();
        this.getAllCourses();
      },
      (err) => {
        this.callSwal(
          'Error !',
          'Something Went wrong,Please try again',
          'error'
        );

        this.closeButton.nativeElement.click();
        this.spinner.hide();
        this.reset();
        this.getAllCourses();
      }
    );
  }
  reset(): any {
    this.course = new Course();
    this.image = '';
  }
  openAssignTeacherModal(course, content): any {
    this.selectedCourse = course;
    this.assignTeacherModal = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
    });
  }
  assignTeacherIntoCourse(): any {
    if (!this.selectedTutor) {
      this.callSwal('Invalid !', 'Please Select Tutor', 'warning');
      return false;
    }
    const obj = {
      _id: this.selectedCourse._id,
      teacherId: this.selectedTutor,
    };
    this.courseService.updateCourse(obj).subscribe((c) => {
      this.selectedTutor = '';
      this.spinner.hide();
      this.getAllCourses();
      this.callSwal('Updated !', '"Data updated successfully', 'success');
      this.assignTeacherModal.close();
    });
  }
  getAllTeachers(): any {
    this.spinner.show();
    this.teacherService.getAllApprovedTeachers().subscribe((result) => {
      this.allTeachers = result;
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
  changeImageBase($event): void {
    this.changeImageIntoBase64($event.target);
  }

  changeImageIntoBase64(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image = myReader.result;
    };
    myReader.readAsDataURL(file);
  }
  deleteCourse(data): any {
    Swal.fire({
      title: 'Deletion Confirmation',
      text: 'Do you want to delete this course?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: 'rgb(0, 141, 96)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        data.isDeleted = true;
        this.courseService.updateCourse(data).subscribe((c) => {
          this.spinner.hide();
          this.getAllCourses();
          this.callSwal('Deleted !', 'Data deleted successfully', 'success');
        });
      }
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
  openAddChapterIntoCourseModal(course, content): any {
    this.selectedCourse = course;
    this.addChapterModal = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
    });
  }
  addChapterIntoCourse(): any {
    if (!this.chapter.name) {
      this.callSwal('Invalid !', 'Please enter chapter name', 'warning');
      return false;
    }
    if (!this.chapter.nameAr) {
      this.callSwal('Invalid !', 'Please enter arabic chapter name', 'warning');
      return false;
    }
    this.chapter.courseId = this.selectedCourse._id;
    this.chapterService.createChapter(this.chapter).subscribe(
      (res) => {
        this.selectedCourse.chapters.push(res);
        this.getAllCourses();
        this.addChapterModal.close();
        this.spinner.hide();
        this.callSwal('Created !', '"Data created successfully', 'success');
        this.chapter = new Chapter();
      },
      (err) => {
        if (err.error.code === 11000) {
          this.callSwal('Error !', 'Chapter Is Already Saved', 'error');
        } else {
          this.callSwal(
            'Error !',
            'Something Went wrong,Please try again',
            'error'
          );
        }
      }
    );
  }
  searchCourse(): any {
    if (this.search) {
      this.search = this.search.toLowerCase();
      const newArray = [];
      this.allCourses.forEach((element) => {
        element.subject.name = element.subject.name.toLowerCase();
        if (element.subject.name.search(this.search) !== -1) {
          newArray.push(element);
        }
      });
      this.allCourses = newArray;
    } else {
      this.getAllCourses();
    }
  }
  openAddLessonIntoChapterModal(course, chapter, content): any {
    this.selectedCourse = course;
    this.selectedChapter = chapter;
    this.addLessonModal = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
    });
  }
  addLessonIntoChapter(): any {
    if (!this.lesson.name) {
      this.callSwal('Invalid !', 'Please enter lesson name', 'warning');
      return false;
    }
    if (!this.lesson.nameAr) {
      this.callSwal('Invalid !', 'Please enter arabic lesson name', 'warning');
      return false;
    }
    if (!this.lesson.price) {
      this.callSwal('Invalid !', 'Please enter lesson price', 'warning');
      return false;
    }
    if (!this.lesson.liveSession && !this.lesson.validFor) {
      this.callSwal('Invalid !', 'Please enter valid for (days)', 'warning');
      return false;
    }
    if (this.lesson.liveSession && !this.lesson.startDate) {
      this.callSwal('Invalid !', 'Please select start date', 'warning');
      return false;
    }
    if (this.lesson.liveSession && !this.lesson.startTime) {
      this.callSwal('Invalid !', 'Please select start time', 'warning');
      return false;
    }
    if (this.lesson.liveSession && !this.lesson.meetingId) {
      this.callSwal('Invalid !', 'Please enter meeting id', 'warning');
      return false;
    }
    if (this.lesson.liveSession && !this.lesson.meetingPassword) {
      this.callSwal('Invalid !', 'Please enter meeting password', 'warning');
      return false;
    }
    this.lesson.chapterId = this.selectedChapter._id;
    this.lessonService.createLesson(this.lesson).subscribe(
      (res) => {
        if (!this.selectedChapter.lessons) {
          this.selectedChapter.lessons = [];
        }
        this.selectedChapter.lessons.push(res);
        this.getAllCourses();
        this.addLessonModal.close();
        this.spinner.hide();
        this.callSwal('Created !', '"Data created successfully', 'success');
        this.lesson = new Lesson();
      },
      (err) => {
        if (err.error.code === 11000) {
          this.callSwal('Error !', 'Lesson Is Already Saved', 'error');
        } else {
          this.callSwal(
            'Error !',
            'Something Went wrong,Please try again',
            'error'
          );
        }
      }
    );
  }
  chosenChapter(data): any {
    if (data) {
      this.selectedCourse.chapters = [];
      this.selectedCourse.chapters.push(data);
    } else {
      this.selectedCourse = { ...this.clonedSelectedCourse };
    }
  }
  openAddContentIntoLessonModal(course, chapter, lesson, content): any {
    this.selectedCourse = course;
    this.selectedChapter = chapter;
    this.selectedLesson = lesson;
    this.addContentModal = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
    });
  }
  addContentIntoLesson(): any {
    if (!this.content.type) {
      this.callSwal('Invalid !', 'Please choose content type', 'warning');
      return false;
    }
    if (this.content.type !== 'Video' && !this.file) {
      this.callSwal('Invalid !', 'Please choose an file', 'warning');
      return false;
    }
    if (!this.content.name) {
      this.callSwal('Invalid !', 'Please enter content name', 'warning');
      return false;
    }
    if (!this.content.nameAr) {
      this.callSwal('Invalid !', 'Please enter arabic content name', 'warning');
      return false;
    }
    if (this.content.type === 'Video' && !this.content.value) {
      this.callSwal('Invalid !', 'Please enter content value', 'warning');
      return false;
    }
    if (this.content.type === 'Video' && !this.content.videoLength) {
      this.callSwal('Invalid !', 'Please enter video length', 'warning');
      return false;
    }
    if (!this.editContentMode) {
      this.selectedLesson.items.push(this.content);
    }
    if (this.content.type !== 'Video') {
      this.content.type = 'Attachment';
      this.content.value = this.file;
    }
    this.lessonService
      .addContentIntoLesson(this.selectedLesson._id, this.content)
      .subscribe((res) => {
        this.getAllCourses();
        this.addContentModal.close();
        this.spinner.hide();
        this.callSwal('Created !', 'Data created successfully', 'success');
        this.content = new Content();
      });
  }
  openEditLessonContent(course, chapter, lesson, item, content): any {
    this.content = item;
    this.selectedItem = item;
    this.editContentMode = true;
    this.openAddContentIntoLessonModal(course, chapter, lesson, content);
  }
  closeContentModal(): any {
    this.content = new Content();
    this.editContentMode = false;
    this.addContentModal.close();
  }
  deleteLessonContent(lesson, item): any {
    Swal.fire({
      title: 'Deletion Confirmation',
      text: 'Do you want to delete this item?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: 'rgb(0, 141, 96)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        const res = lesson.items.filter((it) => it !== item);
        lesson.items = res;
        this.lessonService.updateLesson(lesson).subscribe((c) => {
          this.spinner.hide();
          this.getAllCourses();
          this.callSwal('Deleted !', 'Data deleted successfully', 'success');
        });
      }
    });
  }
  changeImageUrl(imageUrl): any {
    return `${this.apiUrl}/attachments/courses/${imageUrl}`;
  }
  chosenFile($event): void {
    this.changeFileIntoBase64($event.target);
  }
  changeFileIntoBase64(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.file = myReader.result;
    };
    myReader.readAsDataURL(file);
  }
  getAllGrades(): any {
    this.spinner.show();
    this.gradeService.getAllGradesWithoutPagination().subscribe((result) => {
      this.allGrades = result;
      this.spinner.hide();
    });
  }
  getAllEducationSystems(): any {
    this.spinner.show();
    this.educationSystemService.getAllEducationSystems().subscribe((result) => {
      this.allEducationSystems = result;
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
  changeExclusive(course): any {
    this.spinner.show();
    course.exclusive = !course.exclusive;
    this.courseService.updateCourse(course).subscribe((c) => {
      this.spinner.hide();
      this.getAllCourses();
      this.callSwal('Updated !', '"Data updated successfully', 'success');
    });
  }
  deleteLesson(lesson): any {
    Swal.fire({
      title: 'Deletion Confirmation',
      text: 'Do you want to delete this live session?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: 'rgb(0, 141, 96)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        this.lessonService.deleteLesson(lesson._id).subscribe(
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
            this.getAllCourses();
            this.callSwal('Deleted !', 'Data deleted successfully', 'success');
            this.viewCourseDetailsModal.close();
          }
        );
      }
    });
  }
  editLiveSession(lesson): any {
    if (!lesson.meetingId) {
      this.callSwal('Invalid !', 'Please enter meeting id', 'warning');
      return false;
    }
    if (!lesson.meetingPassword) {
      this.callSwal('Invalid !', 'Please enter meeting password', 'warning');
      return false;
    }
    this.lessonService.updateLesson(lesson).subscribe((c) => {
      this.spinner.hide();
      this.getAllCourses();
      this.callSwal('Updated !', '"Data updated successfully', 'success');
      this.editLiveSessionModal.close();
    });
  }
  openUpdateLiveSession(lesson, content): any {
    this.selectedLiveSession = lesson;
    this.editLiveSessionModal = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
    });
  }
}

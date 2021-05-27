import { SubjectService } from './../services/subject.service';
import { EducationSystemService } from './../services/education-system.service';
import { GradeService } from './../services/grade.service';
import { TeacherService } from './../services/teacher.service';
import { GiftCard } from './giftCard';
import { GiftCardService } from './../services/gift-card.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gift-card',
  templateUrl: './gift-card.component.html',
  styleUrls: ['./gift-card.component.css'],
})
export class GiftCardComponent implements OnInit {
  @ViewChild('closeButton') closeButton: ElementRef;
  allGiftCards = [];
  allTeachers = [];
  allGrades = [];
  allSubjects = [];
  allEducationSystems = [];
  giftCard: GiftCard = new GiftCard();
  constructor(
    private giftCardService: GiftCardService,
    private teacherService: TeacherService,
    private gradeService: GradeService,
    private educationSystemService: EducationSystemService,
    private subjectService: SubjectService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getAllGiftCards();
    this.getAllTeachers();
    this.getAllGrades();
    this.getAllEducationSystems();
    this.getAllSubjects();
  }
  getAllGiftCards(): any {
    this.spinner.show();
    this.giftCardService.getAllGiftCards().subscribe((result) => {
      this.allGiftCards = result;
      this.spinner.hide();
    });
  }
  save(): any {
    if (!this.giftCard.type) {
      this.callSwal('Invalid !', 'Please enter type', 'warning');
      return false;
    }
    if (this.giftCard.type === 'forGroup' && !this.giftCard.subjectId) {
      this.callSwal('Invalid !', 'Please enter subject', 'warning');
      return false;
    }
    if (this.giftCard.type === 'forGroup' && !this.giftCard.educationSystemId) {
      this.callSwal('Invalid !', 'Please choose education system', 'warning');
      return false;
    }
    if (this.giftCard.type === 'forGroup' && !this.giftCard.gradeId) {
      this.callSwal('Invalid !', 'Please choose grade', 'warning');
      return false;
    }
    if (this.giftCard.type === 'forGroup' && !this.giftCard.teacherId) {
      this.callSwal('Invalid !', 'Please choose teacher', 'warning');
      return false;
    }
    if (!this.giftCard.price) {
      this.callSwal('Invalid !', 'Please enter price', 'warning');
      return false;
    }
    if (!this.giftCard.expiryDate) {
      this.callSwal('Invalid !', 'Please enter expiry date', 'warning');
      return false;
    }
    this.spinner.show();
    this.giftCardService.createGiftCard(this.giftCard).subscribe(
      (data) => {
        this.callSwal('Created !', '"Data created successfully', 'success');
        this.closeButton.nativeElement.click();
        this.spinner.hide();
        this.reset();
        this.getAllGiftCards();
      },
      (err) => {
        if (err.error.code === 11000) {
          this.callSwal('Error !', 'Gift Card Is Already Saved', 'error');
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
        this.getAllGiftCards();
      }
    );
  }
  deleteGiftCard(data): any {
    Swal.fire({
      title: 'Deletion Confirmation',
      text: 'Do you want to delete this gift card?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: 'rgb(0, 141, 96)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        this.giftCardService.deleteGiftCard(data._id).subscribe(
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
            this.getAllGiftCards();
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
    this.giftCard = new GiftCard();
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
}

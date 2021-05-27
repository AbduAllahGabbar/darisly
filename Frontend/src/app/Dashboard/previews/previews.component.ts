import { CourseService } from './../services/course.service';
import { PreviewService } from './../services/preview.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { Preview } from './preview';

@Component({
  selector: 'app-previews',
  templateUrl: './previews.component.html',
  styleUrls: ['./previews.component.css'],
})
export class PreviewsComponent implements OnInit {
  @ViewChild('closeButton') closeButton: ElementRef;
  allPreviews = [];
  allCourses = [];
  preview: Preview = new Preview();
  constructor(
    private previewService: PreviewService,
    private courseService: CourseService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getAllPreviews();
    this.getAllCourses();
  }
  getAllPreviews(): any {
    this.spinner.show();
    this.previewService.getAllPreviews().subscribe((result) => {
      this.allPreviews = result;
      this.spinner.hide();
    });
  }
  save(): any {
    if (!this.preview.course) {
      this.callSwal('Invalid !', 'Please select course', 'warning');
      return false;
    }
    if (!this.preview.videoUrl) {
      this.callSwal('Invalid !', 'Please enter video url', 'warning');
      return false;
    }
    this.spinner.show();
    this.previewService.createPreview(this.preview).subscribe(
      (data) => {
        this.callSwal('Created !', '"Data created successfully', 'success');
        this.closeButton.nativeElement.click();
        this.spinner.hide();
        this.reset();
        this.getAllPreviews();
      },
      (err) => {
        if (err.error.code === 11000) {
          this.callSwal('Error !', 'Preview Is Already Saved', 'error');
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
        this.getAllPreviews();
      }
    );
  }
  deletePreview(data): any {
    Swal.fire({
      title: 'Deletion Confirmation',
      text: 'Do you want to delete this preview?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: 'rgb(0, 141, 96)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        this.previewService.deletePreview(data._id).subscribe(
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
            this.getAllPreviews();
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
    this.preview = new Preview();
  }
  getAllCourses(): any {
    this.spinner.show();
    this.courseService.getAllCoursesWithoutPagination().subscribe((result) => {
      this.allCourses = result;
      this.spinner.hide();
    });
  }
}

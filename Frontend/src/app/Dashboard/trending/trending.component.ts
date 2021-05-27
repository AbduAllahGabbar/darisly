import { CourseService } from './../services/course.service';
import { TrendingService } from './../services/trending.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { Trending } from './trending';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css'],
})
export class TrendingComponent implements OnInit {
  @ViewChild('closeButton') closeButton: ElementRef;
  allTrending = [];
  allCourses = [];
  trending: Trending = new Trending();
  constructor(
    private trendingService: TrendingService,
    private courseService: CourseService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getAllTrending();
    this.getAllCourses();
  }
  getAllTrending(): any {
    this.spinner.show();
    this.trendingService.getAllTrending().subscribe((result) => {
      this.allTrending = result;
      this.spinner.hide();
    });
  }
  save(): any {
    if (!this.trending.course) {
      this.callSwal('Invalid !', 'Please select course', 'warning');
      return false;
    }
    this.spinner.show();
    this.trendingService.createTrending(this.trending).subscribe(
      (data) => {
        this.callSwal('Created !', '"Data created successfully', 'success');
        this.closeButton.nativeElement.click();
        this.spinner.hide();
        this.reset();
        this.getAllTrending();
      },
      (err) => {
        if (err.error.code === 11000) {
          this.callSwal('Error !', 'Trending Is Already Saved', 'error');
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
        this.getAllTrending();
      }
    );
  }
  deleteTrending(data): any {
    Swal.fire({
      title: 'Deletion Confirmation',
      text: 'Do you want to delete this trending?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: 'rgb(0, 141, 96)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        this.trendingService.deleteTrending(data._id).subscribe(
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
            this.getAllTrending();
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
    this.trending = new Trending();
  }
  getAllCourses(): any {
    this.spinner.show();
    this.courseService.getAllCoursesWithoutPagination().subscribe((result) => {
      this.allCourses = result;
      this.spinner.hide();
    });
  }
}

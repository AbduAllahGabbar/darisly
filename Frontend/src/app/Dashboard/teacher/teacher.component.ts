import { environment } from './../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { TeacherService } from './../services/teacher.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Teacher } from './teacher';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css'],
})
export class TeacherComponent {
  allTeachers = [];
  showChangeImageBtn = false;
  newImage;
  viewTeacherModal = null;
  teacher: Teacher = new Teacher();
  apiUrl = environment.apiUrl;
  constructor(
    private teacherService: TeacherService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService
  ) {
    this.getAllTeachers();
  }

  getAllTeachers(): any {
    this.spinner.show();
    this.teacherService.getAllTeachers().subscribe((result) => {
      this.allTeachers = result;
      this.showChangeImageBtn = false;
      this.spinner.hide();
    });
  }
  viewTeacherDetails(data, content): any {
    this.teacher = data;
    this.viewTeacherModal = this.modalService.open(content, {
      size: 'lg',
      backdrop: 'static',
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  activateTeacher(data): any {
    Swal.fire({
      title: 'Approve Confirmation',
      text: 'Do you want to activate this tutor?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(0, 141, 96)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        const obj = {
          approved: true,
        };
        data.approved = true;
        delete data.email;
        this.teacherService
          .updateTeacherStatus(data._id, obj)
          .subscribe((c) => {
            this.spinner.hide();
            this.getAllTeachers();
          });
        this.callSwal('Updated !', '"Data updated successfully', 'success');
      }
    });
  }
  deactivateTeacher(data): any {
    Swal.fire({
      title: 'Deactivation Confirmation',
      text: 'Do you want to deactivate this tutor?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(0, 141, 96)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        const obj = {
          approved: false,
        };
        data.approved = false;
        delete data.email;
        this.teacherService
          .updateTeacherStatus(data._id, obj)
          .subscribe((c) => {
            this.spinner.hide();
            this.getAllTeachers();
          });
        this.callSwal('Updated !', '"Data updated successfully', 'success');
      }
    });
  }
  deleteTeacher(data): any {
    Swal.fire({
      title: 'Deletion Confirmation',
      text: 'Do you want to delete this tutor?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: 'rgb(0, 141, 96)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        this.teacherService.deleteTeacher(data._id).subscribe(
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
            this.getAllTeachers();
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
  async viewImage(title, imageUrl): Promise<any> {
    imageUrl = `${this.apiUrl}/attachments/teachers/${imageUrl}`;
    Swal.fire({
      title,
      imageUrl,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: title,
    });
  }
  changeImage(): any {
    this.showChangeImageBtn = !this.showChangeImageBtn;
  }
  choseFile($event, obj): void {
    this.changeFileIntoBase64($event.target, obj);
  }
  changeFileIntoBase64(inputValue: any, obj): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.newImage = myReader.result;
      this.updateTeacherPersonalImage(obj);
    };
    myReader.readAsDataURL(file);
  }
  updateTeacherPersonalImage(obj): any {
    Swal.fire({
      title: 'Approve Confirmation',
      text: 'Do you want to change this tutor personal image?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(0, 141, 96)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        const newObj = {
          toDelete: obj.personalImage,
          attachment: this.newImage,
        };
        this.teacherService
          .updateTeacherPersonalImage(obj._id, newObj)
          .subscribe((c) => {
            this.spinner.hide();
            this.getAllTeachers();
            this.viewTeacherModal.close();
          });
        this.callSwal('Updated !', '"Data updated successfully', 'success');
      }
    });
  }
}

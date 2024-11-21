import { Component, ViewChild, inject } from '@angular/core';
import { Student } from '../../interfaces/Student';
import { StudentFormComponent } from '../student-form/student-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrl: './student-table.component.scss'
})

export class StudentTableComponent {

  studentData: Student[] = [
    // {
    //   id: 1,
    //   fullName: 'Swamiraj Anarse',
    //   gender: 'Male',
    //   dateOfBirth:  new Date(),
    //   phoneNumber: 1111,
    //   email: 'ww@gmail.com',
    //   address: {
    //     locality: 'www',
    //     country: 'India',
    //     state: 'Maharashtra',
    //     city: 'Pune',
    //     pincode: 123
    //   }
    // },
    // {
    //   id: 2,
    //   fullName: 'Swamiraj Anarse',
    //   gender: 'Male',
    //   dateOfBirth:  new Date(),
    //   phoneNumber: 1111,
    //   email: 'ww@gmail.com',
    //   address: {
    //     locality: 'www',
    //     country: 'India',
    //     state: 'Maharashtra',
    //     city: 'Pune',
    //     pincode: 123
    //   }
    // }
  ];

  snackBarConfig: MatSnackBarConfig = {
    verticalPosition: 'top',
    horizontalPosition: 'right',
    duration: 2000
  };
  displayedColumns: string[] = ['index', 'id', 'fullName', 'gender', 'dateOfBirth', 'email', 'phoneNumber', 'address', 'actions'];
  
  readonly dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);
  isEdit: boolean = false;

  openDialog(row?: Student) {
    let modalTitle;
    let formData;
    if (row?.id) {
      this.isEdit = true;
      modalTitle = 'Edit Student';
      formData = row;
    } else {
      this.isEdit = false;
      modalTitle = 'Add New Student';
      formData = {
        ...row,
        id: (this.studentData.length > 0) ? (this.studentData[0]?.id + 1) : 1
      }
    }
    const dialogRef = this.dialog.open(StudentFormComponent, {
      data: { 
        modalTitle: modalTitle,
        formData: formData,
        isEdit: this.isEdit
      },
      height: '70vh',
      width: "70%"
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        const findData = this.studentData.find(x => x.id === result?.id);
        if (findData) {
          this.studentData = this.studentData.map(item => {
            if (findData?.id === item?.id) {
              return result;
            };
            return item;
          });
          this._snackBar.open('Record Updated Successfully', 'close', this.snackBarConfig);
        } else {
          this.studentData = [result, ...this.studentData];
          this._snackBar.open('Record Added Successfully', 'close', this.snackBarConfig);
        }
      }
    });
  }

  onDelete(row: Student) {
    this.studentData = this.studentData.filter(x => x.id !== row.id);
    this._snackBar.open('Record Deleted Successfully', 'close', this.snackBarConfig);
  }
}

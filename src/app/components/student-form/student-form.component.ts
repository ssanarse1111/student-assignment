import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Select } from '../../interfaces/Select';
import { DataService } from '../../services/data.service';
import { Student } from '../../interfaces/Student';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.scss'
})
export class StudentFormComponent implements OnInit {

  readonly dialogRef = inject(MatDialogRef<StudentFormComponent>);
  readonly receivedData = inject<any>(MAT_DIALOG_DATA);
  formData = this.receivedData?.formData;

  genderList: Select[] = [];
  stateList: Select[] = [];

  private formBuilder = inject(FormBuilder);
  studentForm = this.formBuilder.group({
    id: [this.formData?.id || 0, Validators.required],
    fullName: [this.formData?.fullName || '', Validators.required],
    gender: [this.formData?.gender || '', Validators.required],
    dateOfBirth: [this.formData?.dateOfBirth, Validators.required],
    email: [this.formData?.email || '', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    phoneNumber: [this.formData?.phoneNumber, [Validators.required, Validators.maxLength(10)]],
    address: this.formBuilder.group({
      locality: [this.formData?.address?.locality || '', Validators.required],
      country: ['India'],
      state: [this.formData?.address?.state || '', Validators.required],
      city: [this.formData?.address?.city || '', Validators.required],
      pincode: [this.formData?.address?.pincode, Validators.required],
    })
  });

  disableFutureDates(date: Date | null) {
    const currentDate = date || new Date();
    return currentDate <= new Date();;
  };

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.genderList = this.dataService.getGenders();
    this.stateList = this.dataService.getStates();
  }

  getInputName(label: string) {
    return this.studentForm.get(label);
  }

  getAddressInputName(label: string) {
    return this.studentForm.get('address')?.get(label);
  }

  onCancel() {
    this.dialogRef.close();
    this.studentForm.reset();
  }

  onSave() {
    this.studentForm.markAsTouched();
    const data: any = {
      ...this.studentForm.value,
      fullName: this.studentForm.value.fullName.trim(),
      email: this.studentForm.value.email.trim(),
      address: {
        ...this.studentForm.value.address,
        locality: this.studentForm.value.address?.locality.trim(),
        city: this.studentForm.value.address?.city.trim()
      }
    }
    this.studentForm.setValue(data);
    if (this.studentForm.invalid) return;
    this.dialogRef.close(this.studentForm.value);
    this.studentForm.reset();
  }
}

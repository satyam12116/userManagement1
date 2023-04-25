import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {
  checkFlag=true;
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: any,private http:HttpClient,private dialog :MatDialogRef<any>,private _snackBar:MatSnackBar
  ) {}

  editForm = this.fb.group({
    fn: [this.data.fist_name, Validators.required],
    ln: [this.data.last_name, Validators.required],
    dor: [this.data.last_name, Validators.required],
    address: [this.data.city, Validators.required],
    phone: [this.data.contact_no, Validators.required],
    email: [this.data.email, Validators.required],
  });

  ngOnInit(): void {
    this.http.get<any>('http://localhost:3000/signup').subscribe(res=>{
          console.log('success')
    
         })
  }
  modify() {
    const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
   const body = {
      id:this.data.id,
      fist_name: this.editForm.get('fn')?.value,
      last_name: this.editForm.get('ln')?.value,
      Address: this.editForm.get('address')?.value,
      contact_no:this.editForm.get('phone')?.value,
      email: this.editForm.get('email')?.value,
    };
    console.log(this.editForm);
    this.http
      .put<any>(`http://localhost:7001/update-user/${this.data.id}`, body,httpOptions)
      .subscribe((res) => {
        this._snackBar.open("profile updated successfully", 'close', {
          horizontalPosition: 'start',
          verticalPosition: 'top',
        })
        this.dialog.close();
        if (res) {
        this.ngOnInit();
        
        } else {
          console.log('error');
        }
      });
  }

}

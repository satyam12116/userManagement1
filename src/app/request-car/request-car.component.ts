import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-request-car',
  templateUrl: './request-car.component.html',
  styleUrls: ['./request-car.component.scss']
})
export class RequestCarComponent implements OnInit {
  custId!:any;
  ans:any;
  closePopup=true;
  constructor(private fb: FormBuilder,private http:HttpClient,private _snackBar:MatSnackBar) {}
  createForm = this.fb.group({
    fn: ['', Validators.required],
    ln: ['', Validators.required],
    dor: ['', Validators.required],
    email: ['', Validators.required],
    address: ['', Validators.required],

  });
  ngOnInit(): void {

  }
  addUser() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let  ans1=new Date(this.createForm.get('requestDate')?.value) 
 
    let body={
      customerId:this.custId,
      carType:this.createForm.get('carType')?.value,
      days:this.createForm.get('days')?.value,
      requestDate:ans1.toJSON().slice(0,10) ,
      status: 'not approved',
    }
    if (this.createForm.valid) {
      this.http.post<any>('http://localhost:7001/create-user',body,httpOptions).subscribe((res:any)=>{
      if(res){
        this._snackBar.open("user added successfully", 'close', {
          horizontalPosition: 'start',
          verticalPosition: 'top',
        })
       this.closePopup=false;
      }
      else{
       console.log('err');

      }
      })
    }
  }
}

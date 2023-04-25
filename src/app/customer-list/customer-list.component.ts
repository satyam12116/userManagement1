import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditCustomerComponent } from '../edit-customer/edit-customer.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  customers!: any;

  constructor(private http:HttpClient,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:7001/get-all-users').subscribe(res=>{
      this.customers=res;
    })
  }
  update(customer: any) {
    const dialogRef = this.dialog.open(EditCustomerComponent, {
      data: customer,
      panelClass: 'editComp',
      height: '600px',
      width: '550px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
  delete(customer:any){
    this.http.delete<any>(`http://localhost:7001/delete-user/${customer.id}`).subscribe(res=>{

    })
  }
}

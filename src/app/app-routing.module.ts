
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { HomeComponent } from './home/home.component';
import { RequestCarComponent } from './request-car/request-car.component';


const routes: Routes = [
  
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'user-list',
    component: CustomerListComponent,
  },
  {
    path: 'create-user',
    component: RequestCarComponent,
  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

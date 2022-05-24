import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserComponent} from './user/user.component';
import {DriverComponent} from './driver/driver.component';

const routes: Routes = [
  {
    path:'driver',
    component:DriverComponent,
  },
  {
    path:'user',
    component:UserComponent,
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations:[]
})
export class AppRoutingModule { }

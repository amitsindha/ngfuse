import { Routes } from '@angular/router';

import { AppMembersComponent } from './app-members/app-members.component';


export const MembersRoutes: Routes = [
  {
    path: '',
    children: [{
      path: '',
      component: AppMembersComponent,
      data: { title: 'Members', breadcrumb: 'MEMBERS' }
    }] 
  }
]; 
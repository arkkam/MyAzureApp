import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Users } from './users/users';
import { AdminLayout } from './admin-layout/admin-layout';
import { ChatComponent } from './chat-component/chat-component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminLayout,
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'users', component: Users },
      { path: 'chat', component: ChatComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(ADMIN_ROUTES)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

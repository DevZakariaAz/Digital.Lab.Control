import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'login', loadChildren: () => import('./auth/auth-module').then(m => m.AuthModule) }, { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard-module').then(m => m.DashboardModule) }, { path: 'documents', loadChildren: () => import('./document/document-module').then(m => m.DocumentModule) }, { path: 'users', loadChildren: () => import('./user/user-module').then(m => m.UserModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

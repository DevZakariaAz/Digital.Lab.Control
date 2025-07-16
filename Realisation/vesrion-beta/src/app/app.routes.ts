import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CivilServantsComponent } from './pages/civil-servants/civil-servants.component';
import { UploadDocComponent } from './pages/upload-doc/upload-doc.component';

export default [
  { path: '', component: DashboardComponent },
  { path: 'civil-servants', component: CivilServantsComponent },
  { path: 'upload-doc', component: UploadDocComponent },
] as Routes;

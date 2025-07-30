import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Document } from './document';

const routes: Routes = [{ path: '', component: Document }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentRoutingModule { }

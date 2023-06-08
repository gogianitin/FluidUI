import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddRecordComponent } from './add-record/add-record.component';
import { SearchRecordComponent } from './search-record/search-record.component';

const routes: Routes = [
  {path:'searchWell', component:SearchRecordComponent},
  {path:'addWell',component:AddRecordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

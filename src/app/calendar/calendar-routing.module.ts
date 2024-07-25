import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar.component';
import { ViewCalandarComponent } from './view-calandar/view-calandar.component';

const routes: Routes = [
  { path: '', component: CalendarComponent },
  { path: '', component: ViewCalandarComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarRoutingModule {}

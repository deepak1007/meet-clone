import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JoinComponent } from './join/join.component';
import { MeetingComponent } from './meeting.component';

const routes: Routes = [
  { path: ':meetingId', component: MeetingComponent },
  {path : 'join/:meetingId', component: JoinComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeetingRoutingModule { }

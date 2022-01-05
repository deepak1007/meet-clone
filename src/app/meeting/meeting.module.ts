import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeetingRoutingModule } from './meeting-routing.module';
import { MeetingComponent } from './meeting.component';
import { MeetingDetailsComponent } from './meeting-details/meeting-details.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { JoinComponent } from './join/join.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { MatProgressBarModule} from '@angular/material/progress-bar';
import { LocalVideoElementComponent } from './local-video-element/local-video-element.component'

@NgModule({
  declarations: [
    MeetingComponent,
    MeetingDetailsComponent,
    JoinComponent,
    LocalVideoElementComponent
  ],
  imports: [
    CommonModule,
    MeetingRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule, 
    MatDividerModule,
    MatListModule,
    MatProgressBarModule
  ]
})
export class MeetingModule { }

import { Component, OnInit, Input } from '@angular/core';
import { MeetingDetails } from 'src/app/services/meeting.models';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-meeting-details',
  templateUrl: './meeting-details.component.html',
  styleUrls: ['./meeting-details.component.css']
})
export class MeetingDetailsComponent implements OnInit {
  	@Input("meetingDetails")
    set meetingDataFromParent(data : any){
      	this.meetingDetails = {...data};
    }

	meetingDetails : MeetingDetails;
	
	constructor() { }

	ngOnInit(): void {

	}

	copyToClipBoard() {
		navigator.clipboard.writeText(environment.frontend + '/meeting/join/' + this.meetingDetails.meetingId);
	}

}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreatorDetailsComponent } from '../creator-details/creator-details.component';
import { DataServiceService } from '../services/data-service.service';
import { JoinerDetails } from '../services/meeting.models';

export interface DialogData {
  email: string;
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
	creatorDetails : JoinerDetails = {
		name : "",
		email : ""
	}

	constructor(
		public dialog: MatDialog,
		private ds : DataServiceService,
		private router: Router
	) {}

	//open dialog for getting creator details if not available already.
	openDialog(): void {
		const dialogRef = this.dialog.open(CreatorDetailsComponent, {
			width: '250px',
			data: {name: this.creatorDetails.name, email: this.creatorDetails.email},
		});

		dialogRef.afterClosed().subscribe(result => {
			this.creatorDetails.email = result.email;
			this.creatorDetails.name = result.name
			this.createMeeting();
		});
	}


	createMeeting() {
		this.ds.createMeeting(this.creatorDetails).subscribe((response)=>{
		if(response.success) {
			const meetingId = response.data?.meetingId;
			sessionStorage.setItem('meetingVerificationToken', response.data?.meetingVerificationToken );
			this.router.navigate(['/meeting', meetingId])
		} else {
			alert(response.message);
		}
		}, this.handle_response.bind(this));
	}

	handle_response(error : HttpErrorResponse) {
		if(error.error instanceof ErrorEvent) {
			alert('something went wrong');
		} else {
			alert(error.error?.message || error.message);
		}
	}
}

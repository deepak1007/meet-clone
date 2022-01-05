import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from 'src/app/services/data-service.service';
import {MatDialog, } from '@angular/material/dialog';
import { CreatorDetailsComponent } from '../../creator-details/creator-details.component';
import { JoinerDetails } from 'src/app/services/meeting.models';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {
	@ViewChild('videoElement')
	videoElement : any;

	meetingId: string
	meetingDetail : any;
	srcObj : any = "";
	joinerDetails : JoinerDetails = {
		name: null, 
		email: null,
	}

	constructor(
		private ar: ActivatedRoute, 
		private router: Router, 
		private ds: DataServiceService, 
		public dialog: MatDialog,
	) { }

	ngOnInit(): void {
		this.meetingId = this.ar.snapshot.paramMap.get('meetingId');
		this.checkJoinerDetails();
		this.getUserMedia();
		this.checkMeeting();
	}

	checkJoinerDetails() {
		if(!this.joinerDetails.email || !this.joinerDetails.name) {
			this.openDialog();	
		}
	}

	openDialog(): void {
		const dialogRef = this.dialog.open(CreatorDetailsComponent, {
			width: '250px',
			data: {name: null, email: null},
			disableClose : true
		});

		dialogRef.afterClosed().subscribe(result => {
			this.joinerDetails.email = result.email;
			this.joinerDetails.name = result.name
		});
	}


	async getUserMedia() {

		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video : true })
			this.videoElement.nativeElement.srcObject = stream;
		
		} catch(error) {
			alert("there is some error in starting media device");
			console.log(error)
		};
		
		this.videoElement?.nativeElement?.play();

	}


	checkMeeting() : void {
		this.ds.checkMeeting(this.meetingId).subscribe((response)=>{
		if(response.success) {
			this.meetingDetail = response.data;
		} else {
			alert(response.message);
		}
		}, this.handle_error.bind(this));
	}


	joinMeeting() {
		this.ds.joinMeeting({...this.joinerDetails, meetingId: this.meetingId})
		.subscribe((response)=> {
			if(response.success) {
				console.log('resposne');
				const meetingId = response.data?.meetingId;
				sessionStorage.setItem('meetingVerificationToken', response.data?.meetingVerificationToken );
				this.router.navigate(['/meeting', meetingId])
			} else {
				alert(response.message);
			}
		}, this.handle_error.bind(this))
	}


	handle_error(error : HttpErrorResponse) {
		if(error.error instanceof ErrorEvent) {
			console.log("something went wrong on the browser");
		} else {
			console.log(error.error?.message || error.message);
		}
	}
}

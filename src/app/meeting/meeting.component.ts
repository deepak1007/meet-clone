import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from '../services/data-service.service';
import { MeetingServiceService } from '../services/meeting-service.service';

@Component({
    selector: 'app-meeting',
    templateUrl: './meeting.component.html',
    styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {
    meetingId : string = null;
    userDetails = {
        name: '',
        email: '',
        isOwner:false
    }

    meetingDetails: {creatorName: string, creatorEmail: string, meetingId: string}
    constructor(
        private ar : ActivatedRoute,
        private router: Router,
        private ds: DataServiceService,
        private meetingService : MeetingServiceService) { }

    ngOnInit(): void {
        this.meetingId = this.ar.snapshot.paramMap.get('meetingId');
        this.verifyMember();
    }

    verifyMember() : void{
        if(!sessionStorage.getItem('meetingVerificationToken')) {
            alert('meeting cannot be started');
            this.router.navigate(['/home']);
            return
        }

        this.ds.verifyMember({
            token: sessionStorage.getItem('meetingVerificationToken'), 
            meetingId: this.meetingId
        }).subscribe((response)=>{
            if(response.success) {
                console.log(response.data);
                this.userDetails = response.data
                if(this.userDetails.isOwner) {
                    this.meetingDetails = {
                        creatorName : this.userDetails.name,
                        creatorEmail : this.userDetails.email,
                        meetingId : this.meetingId,
                    }
                }

                this.meetingService.openConnection();
                this.meetingService.joinMeeting(sessionStorage.getItem('meetingVerificationToken'))
            } else {
                console.log("error");
            }
        }, this.handle_error.bind(this));
        
    }



    handle_error(error : HttpErrorResponse) {
        if(error.error instanceof ErrorEvent) {
            console.log("something went wrong on the browser");
        } else {
            console.log(error.error?.message || error.message);
        }
    }

}

import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class MeetingServiceService {
  meetingDetails : any = {};
  constructor(private socket: Socket) { }

  public openConnection(){
    this.socket.connect();
    this.socket.on('error', (error : {errorType: string, error: any})=>{
      alert('error occured');
      console.log(error);
    })

    this.socket.on('joined', (meetingDetails : any)=>{
      this.meetingDetails = meetingDetails
    })
    
  }


  public joinMeeting(token : string) {
    this.socket.emit('join-meeting', token);
  }

  
}

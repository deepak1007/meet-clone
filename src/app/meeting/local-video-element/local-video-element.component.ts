import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { JoinerDetails } from 'src/app/services/meeting.models';

@Component({
  selector: 'app-local-video-element',
  templateUrl: './local-video-element.component.html',
  styleUrls: ['./local-video-element.component.css']
})
export class LocalVideoElementComponent implements OnInit, AfterViewInit {
	@ViewChild('localVideoElement')
	localVideoElement: any;

	@Input('localUserDetail') 
	set localUserDetail(localUserDetail : JoinerDetails) {
		this._localUserDetail = localUserDetail;
	}
	_localUserDetail : JoinerDetails;

	constructor() { }

	ngOnInit(): void {
		
	}

	ngAfterViewInit() : void {
		this.getLocalVideoStream()
	}


    async getLocalVideoStream() {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video : true })
			this.localVideoElement.nativeElement.srcObject = stream;
			this.localVideoElement?.nativeElement?.play();

		} catch(error) {
			alert("there is some error in starting media device");
			console.log(error)
			//this.videoElement.nativeElement.src = URL.createObjectURL(stream);
		};
    }

}

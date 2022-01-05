import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpResponse, JoinerDetails } from './meeting.models'

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  baseUrl : string = environment.server;

  constructor(private http : HttpClient) { }

  createMeeting(data : {name: string, email: string}) : Observable<HttpResponse> {
    return this.http.post<HttpResponse>(`${this.baseUrl}/api/meeting/create`, data)
  }

  checkMeeting(meetingId : string) : Observable<HttpResponse>  {
    return this.http.get<HttpResponse>(`${this.baseUrl}/api/meeting/status/${encodeURIComponent(meetingId)}`); 
  }

  joinMeeting(joinDetails : JoinerDetails) : Observable<HttpResponse> {
    return this.http.post<HttpResponse>(`${this.baseUrl}/api/meeting/join`, joinDetails);
  }

  verifyMember(data : {token: string, meetingId: string}) : Observable<HttpResponse> {
    return this.http.post<HttpResponse>(`${this.baseUrl}/api/meeting/verify-member`, data)
  }


}

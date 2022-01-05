export interface JoinerDetails {
    name: string,
    email: string,
    meetingId?: string
}


export interface MeetingDetails {
    creatorName: string
    creatorEmail: string
    meetingId : string
}


export interface HttpResponse {
    success : boolean,
    message : string,
    data : any
  }
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Attendee } from './models/attendee';
import { AttendeeService } from './services/attendee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'conference-client';
  attendee: Attendee;

  constructor(private attendeeService: AttendeeService){

  }


  ngOnInit(): void {
    this.attendeeService.getRandomAttendee().subscribe(data => {
      sessionStorage.setItem('loggedInAttendeeId', data.id.toString());
      sessionStorage.setItem('firstName', data.firstName);
      sessionStorage.setItem('lastName', data.lastName);
      this.attendee = data;
    });

  }

  ngOnDestroy(): void { }
}

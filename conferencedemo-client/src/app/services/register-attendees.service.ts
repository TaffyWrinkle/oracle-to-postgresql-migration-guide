import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Registration } from '../models/registration';
import { Attendee} from '../models/attendee';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class RegisterAttendeesService {

  constructor(
    private http: HttpClient
  ) { }

  // Posting Attendee (Who) Detail before session Registration
  postAttendee(attendee: Attendee): Observable<Attendee[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'GET'
      })
    };

    return this.http.post<Attendee[]>(`${environment.webApiUrl}/attendees/`, attendee, httpOptions)
      .pipe(
        map(data => {
          return data
        }),
        catchError(data => {
          if (data instanceof HttpErrorResponse && data.status === 404) {
            return [];
          } else {
            this.handleError(data);
          }
        })
      );
  }

  // Posting Session Registration Details
  postRegistration(registration: Registration): Observable<Registration[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'GET'
      })
    };

    return this.http.post<Registration[]>(`${environment.webApiUrl}/registrations/`, registration, httpOptions)
      .pipe(
        map(data => {
          return data
        }),
        catchError(data => {
          if (data instanceof HttpErrorResponse && data.status === 404) {
            return [];
          } else {
            this.handleError(data);
          }
        })
      );
  }

  
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }


}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UserBody } from 'src/shared/models/userBody';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(private http: HttpClient) { }

  private getStandardOptions() : any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
  }

  getCities() {
    let options = this.getStandardOptions();

    const cityEndpoint = process.env['NEXTADVENTURE_API_ENDPOINT'] + '/cities';

    return this.http.get(cityEndpoint, options).pipe(catchError(this.handleError));
  }

  getFlights(departureCityID: string, arrivalCityID: string) {
    let options = this.getStandardOptions();

    const getFlightsEndpoint = `${process.env['NEXTADVENTURE_API_ENDPOINT']}/flights/${departureCityID}/${arrivalCityID}`;

    return this.http.get(getFlightsEndpoint, options).pipe(catchError(this.handleError));
  }

  bookFlight(flightID: string, body: UserBody) {
    let options = this.getStandardOptions();

    const bookFlightsEndpoint = process.env['NEXTADVENTURE_API_ENDPOINT'] + '/flights/book/' + flightID +'/ds';
    return this.http.patch(bookFlightsEndpoint, body, options).subscribe(
      (val) => {
          console.log("PATCH call successful value returned in body", val);
      },
      response => console.log(response),
      () => {
          console.log("The PATCH observable is now completed.");
      });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('There is an issue with the client or network:', error.error);
    } else {
      console.error('Server-side error: ', error.error)
    }

    return throwError(() => new Error('Cannot retrieve wishes from the server. Please try again.'));
  }
}

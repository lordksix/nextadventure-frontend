import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FlightService } from '../cities.service';
import { CityItem } from 'src/shared/models/cityItem';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {
  constructor(private flightsService: FlightService) { }
  cities : CityItem[] = [];
  flights : any[] = [];

  ngOnInit(): void {
    this.flightsService.getCities().subscribe(
      (data : any) => {
        this.cities = data.data;
      },
      (error : any) => {
        alert(error.message);
      }
    );
  }

  getFlightForm = new FormGroup({
    departureCity: new FormControl('', Validators.required),
    arrivalCity: new FormControl('', Validators.required),
  });

  bookForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    flightId: new FormControl('', Validators.required),
  });

  getFlightsForm() {
    if (this.getFlightForm.valid) {
      const { arrivalCity, departureCity} = this.getFlightForm.value;
      if(arrivalCity && departureCity) {
        this.flightsService.getFlights(departureCity, arrivalCity).subscribe(
          (data : any) => {
            this.flights = data.data;
          },
          (error : any) => {
            alert(error.message);
          }
        );
      }

    }
  }

  bookFlightForm() {
    if (this.bookForm.valid) {
      const { firstName, lastName, email, flightId } = this.bookForm.value;
      if(flightId && firstName && lastName && email) {
        const body = { firstName, lastName, email };
        console.log(body);
        this.flightsService.bookFlight(flightId, body);
        this.getFlightsForm();
      }
    }
  }
}

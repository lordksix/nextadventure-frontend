import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {
  constructor() { }

  cities = [
    {name: 'Arizona', id: '1'},
    {name: 'California', id: '2'},
    {name: 'Colorado', id: '3'},
    {name: 'New York', id: '4'},
    {name: 'Pennsylvania', id: '5'},
  ];

  ngOnInit(): void {}

  flightForm = new FormGroup({
    departureCity: new FormControl('', Validators.required),
    arrivalCity: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  submitForm() {
    if (this.flightForm.valid) {
      console.log(this.flightForm.value);
    }
  }
}

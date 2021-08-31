import {Component, Inject, Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  styleUrls: ['./fetch-data.component.scss'],
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public firstNPrimes: number[];
  public matrix: number[][];
  public httpClient: HttpClient;
  public baseUrl: string;
  public isLoading = true;

 // Even triggered form the HomeComponent
  @Input('nValue') set nValue(n: number) {
    // if the recieved number is valid, we call doGetData()
    if ( n !== null && n !== undefined) {
      this.doGetData(n);
    }
  }


  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.httpClient = http;
    this.baseUrl = baseUrl;
    this.doGetData(0);
  }

  doGetData(n: number) {
    this.isLoading = true;
    this.httpClient.get<number[]>(this.baseUrl + `nPrimeNumbers/?n=${n}`).subscribe(result => {
      // Retrieving an array with the first 'n' prime numbers, and storing it in 'firstNPrimes'
      this.firstNPrimes = result;
      this.processMatrix();
      this.isLoading = false;
    }, error => console.error(error));
  }

  // Processing the prime values into a multiplication table matrix
  processMatrix() {
    this.matrix = [];
    // Creating the first row (with '1' as the value on field 0)
    let firstRow = [];
    firstRow.push(1);
    const values = this.firstNPrimes.map( y => y);
    firstRow = firstRow.concat(values);
    this.matrix.push(firstRow);
    // Adding the remaining rows
    this.firstNPrimes.forEach( x => {
      let array = [];
      array.push(x);
      const otherValues = this.firstNPrimes.map( y => x * y);
      array = array.concat(otherValues);
      this.matrix.push(array);
    });
  }
}


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
  @Input('nValue') set nValue(n: number) {
      this.doGetData(n);
  }

  doGetData(n: number) {
    this.isLoading = true;
    this.httpClient.get<number[]>(this.baseUrl + `nPrimeNumbers/?n=${n}`).subscribe(result => {
      this.firstNPrimes = result;
      this.matrix = [];
      let firstRow = [];
      firstRow.push(1);
      const values = this.firstNPrimes.map( y => y);
      firstRow = firstRow.concat(values);
      this.matrix.push(firstRow);

      this.firstNPrimes.forEach( x => {
        let array = [];
        array.push(x);
        const otherValues = this.firstNPrimes.map( y => x * y);
        array = array.concat(otherValues);
        this.matrix.push(array);
      });
      debugger;
      this.isLoading = false;
    }, error => console.error(error));
  }

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.httpClient = http;
    this.baseUrl = baseUrl;
    this.doGetData(0);
  }
}


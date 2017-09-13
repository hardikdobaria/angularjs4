import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { Bike } from './bike';

@Injectable()
export class BikeService {
    // URLs for CRUD operations
    allBikesUrl = 'http://localhost:8080/api/allBikes';
    bikeUrl = 'http://localhost:8080/api/bike';
  // Create constructor to get Http instance
  constructor(private http: Http) {
  }
  // Fetch all Bikes
    getAllBikes(): Observable<Bike[]> {
        return this.http.get(this.allBikesUrl)
          .map(this.extractData)
            .catch(this.handleError);

    }

    // Create bike
    createBike(bike: Bike): Observable<number> {
      const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
      const options = new RequestOptions({ headers: cpHeaders });
      return this.http.post(this.bikeUrl, bike, options)
        .map(success => success.status)
        .catch(this.handleError);
    }

    // Update Bike
    updateBike(bike: Bike): Observable<number> {
      const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
      const options = new RequestOptions({ headers: cpHeaders });
      return this.http.put(this.bikeUrl, bike, options)
        .map(success => success.status)
        .catch(this.handleError);
    }

    // Fetch bike by id
    getBikeById(id: string): Observable<Bike> {
      const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
      const cpParams = new URLSearchParams();
      cpParams.set('id', id);
      const options = new RequestOptions({ headers: cpHeaders, params: cpParams });
      return this.http.get(this.bikeUrl, options)
        .map(this.extractData)
        .catch(this.handleError);
    }

    // Delete bike
    deleteBikeById(id: string): Observable<number> {
      console.log('deleteBikeById' + id);
      const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
      const cpParams = new URLSearchParams();
      cpParams.set('id', id);
      const options = new RequestOptions({ headers: cpHeaders, params: cpParams });
      return this.http.delete(this.bikeUrl, options)
        .map(success => success.status)
        .catch(this.handleError);
    }

  private extractData(res: Response) {
      const body = res.json();
        return body;
    }
    private handleError (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
    }
}

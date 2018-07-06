import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { deleteCar, getAllCars, getCar, saveCar } from '../graphql/cars.query';
import { DeleteCarMutationArgs, GetAllCars } from '@app/types';
import { ApolloQueryResult, WatchQueryOptions } from 'apollo-client';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class CarService {

  getCarsWq:QueryRef<GetAllCars.Query>;
  cars$:Observable<GetAllCars.Cars[]>;

  constructor(private apollo:Apollo) {
    this.getCarsWq = this.apollo.watchQuery<GetAllCars.Query>(<WatchQueryOptions>{query: getAllCars});
    this.cars$ = this.getCarsWq.valueChanges.pipe(
      map((result:ApolloQueryResult<GetAllCars.Query>) => result.data.cars)
    );
  }

  deleteCar(carId:number) {
    return this.apollo
      .mutate({
        mutation: deleteCar,
        variables: <DeleteCarMutationArgs>{
          id: carId
        },
        update: (proxy, {data: {deleteCar}}) => {
          // Read the data from our cache for this query.
          const data:any = proxy.readQuery({query: getAllCars});
          var index = data.cars.map(x => x.id).indexOf(carId);
          data.cars.splice(index, 1);
          // Write our data back to the cache.
          proxy.writeQuery({query: getAllCars, data});
        }
      });
  }

  getCar(id){
    return this.apollo.query({query: getCar, variables: {id: id}})
      .pipe(map((result:any) => result.data.car))
  }

  saveCar(car) {
    return this.apollo.mutate({
      mutation: saveCar,
      variables: {car: car},
      update: (proxy, {data: {saveCar}}) => {
        // Read the data from our cache for this query.
        const data:any = proxy.readQuery({query: getAllCars});
        if (car.id) {
          let index = data.cars.map(x => x.id).indexOf(car.id);
          data.cars[index] = saveCar;
        } else {
          data.cars.push(saveCar);
        }
        // Write our data back to the cache.
        proxy.writeQuery({query: getAllCars, data});
      }
    })
  }

  getCars() {
    return {query: this.getCarsWq, cars$: this.cars$}
  }

}

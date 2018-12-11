import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { TdDialogService } from '@covalent/core';
import { pluck } from 'rxjs/operators';

import { Car, DeleteCarGQL, GetCarGQL, ListCarsGQL, Long, SaveCarGQL } from '../../api';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent implements OnInit {
  car: Car;

  constructor(
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialogService: TdDialogService,
    private getCarGQL: GetCarGQL,
    private listCarsGQL: ListCarsGQL,
    private saveCarGQL: SaveCarGQL,
    private deleteCarGQL: DeleteCarGQL
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];

    if ('new' !== id) {
      this.getCarGQL
        .fetch({ id })
        .pipe(pluck('data', 'car'))
        .subscribe((car: Car) => {
          console.log('Car', car);
          if (car) {
            this.car = car;
          } else {
            console.log(`Car with id '${id}' not found, returning to list`);
            this.goBack();
          }
        });
    } else {
      this.car = {
        giphyUrl: null,
        id: null,
        isCool: false,
        name: null
      };
    }
  }

  save(car: Car): void {
    this.saveCarGQL
      .mutate(
        { car },
        {
          update: (proxy, { data: { saveCar } }) => {
            // Read the data from our cache for this query.
            const data: { cars: Car[] } = proxy.readQuery({ query: this.listCarsGQL.document });
            const cars: Car[] = data.cars;

            if (car.id) {
              const index = cars.map(x => x.id).indexOf(car.id);
              cars[index] = saveCar;
            } else {
              cars.push(saveCar);
            }
            // Write our data back to the cache.
            proxy.writeQuery({ query: this.listCarsGQL.document, data });
          }
        }
      )
      .subscribe(
        (newCar: Car) => {
          console.log('Car added', newCar);
          this.router.navigate(['/cars']);
        },
        error => {
          console.log('there was an error sending the query', error);
        }
      );
  }

  remove(id: Long): void {
    this.dialogService
      .openConfirm({
        title: 'Confirm',
        message: 'Are you sure you want to perform this action?'
      })
      .afterClosed()
      .subscribe((accept: boolean) => {
        if (accept) {
          this.deleteCarGQL
            .mutate(
              { id },
              {
                update: (proxy, { data: { deleteCar } }) => {
                  // Read the data from our cache for this query.
                  const data: any = proxy.readQuery({ query: this.listCarsGQL.document });
                  const index = data.cars.map(x => x.id).indexOf(id);
                  data.cars.splice(index, 1);
                  // Write our data back to the cache.
                  proxy.writeQuery({ query: this.listCarsGQL.document, data });
                }
              }
            )
            .subscribe(
              (data: Car) => {
                console.log(`Car with ID ${data.id} deleted.`);
                this.router.navigate(['/cars']);
              },
              error => {
                console.log('there was an error sending the query', error);
              }
            );
        } else {
          // DO SOMETHING ELSE
        }
      });
  }

  goBack(): void {
    this.location.back();
  }
}

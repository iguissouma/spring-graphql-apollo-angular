import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {TdDialogService} from '@covalent/core';
import {AllCarsGQL, DeleteCarGQL, GetCarGQL, SaveCarGQL} from "@app/generated/graphql";
import {pluck} from "rxjs/operators";

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent implements OnInit {

  car: any;

  constructor(
    private getCarGQL: GetCarGQL,
    private allCarsGQL: AllCarsGQL,
    private saveCarGQL: SaveCarGQL,
    private deleteCarGQL: DeleteCarGQL,
              private activatedRoute: ActivatedRoute,
              private dialogService: TdDialogService,
              private router: Router,
              private location: Location) {
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'] === 'new' ? null : +this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.getCarGQL.fetch({id}).pipe(pluck('data', 'car'))
        .subscribe((data) => {
          console.log('Car', data);
          if (data) {
            this.car = {...data};
          } else {
            console.log(`Car with id '${id}' not found, returning to list`);
            this.goBack();
          }
        });
    } else {
      this.car = {};
    }
  }

  save(car) {
    this.saveCarGQL.mutate({car}, {
      update: (proxy, {data: {saveCar}}) => {
        // Read the data from our cache for this query.
        const data: any = proxy.readQuery({query: this.allCarsGQL.document});
        if (car.id) {
          let index = data.cars.map(x => x.id).indexOf(car.id);
          data.cars[index] = saveCar;
        } else {
          data.cars.push(saveCar);
        }
        // Write our data back to the cache.
        proxy.writeQuery({query: this.allCarsGQL.document, data});
      }
    })
      .subscribe(({data}) => {
        console.log('Car added', data);
        this.router.navigate(['/cars'])
      }, (error) => {
        console.log('there was an error sending the query', error);
      });
  }

  remove(id) {
    this.dialogService.openConfirm({
      title: 'Confirm',
      message: 'Are you sure you want to perform this action?',
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.deleteCarGQL.mutate({id},
          {
            update: (proxy, {data: {deleteCar}}) => {
              // Read the data from our cache for this query.
              const data: any = proxy.readQuery({query: this.allCarsGQL.document});
              var index = data.cars.map(x => x.id).indexOf(id);
              data.cars.splice(index, 1);
              // Write our data back to the cache.
              proxy.writeQuery({query: this.allCarsGQL.document, data});
            }
          }
        )
          .subscribe(({data}) => {
            console.log('Car deleted');
            this.router.navigate(['/cars'])
          }, (error) => {
            console.log('there was an error sending the query', error);
          });
      } else {
        // DO SOMETHING ELSE
      }
    });
  }

  goBack() {
    this.location.back();
  }

}

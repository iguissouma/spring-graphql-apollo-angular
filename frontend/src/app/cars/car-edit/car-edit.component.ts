import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CarService } from '@app/cars/car.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TdDialogService } from '@covalent/core';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent implements OnInit {

  car: any;

  constructor(private carService: CarService,
              private activatedRoute: ActivatedRoute,
              private dialogService: TdDialogService,
              private router: Router,
              private location: Location) {
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'] === 'new' ? null : +this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.carService.getCar(id)
        .subscribe((data) => {
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
    this.carService.saveCar(car)
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
        this.carService.deleteCar(id)
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

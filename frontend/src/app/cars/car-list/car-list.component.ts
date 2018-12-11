import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator, MatSort } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { TdDialogService } from '@covalent/core';
import { pluck } from 'rxjs/operators';

import { Car, DeleteCarGQL, ListCarsGQL, Long } from '../../api';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  cars$: any;
  dataSource: MatTableDataSource<Car> = new MatTableDataSource();
  displayedColumns = ['id', 'image', 'name', 'buttons'];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private listCarsGQL: ListCarsGQL,
    private deleteCarGQL: DeleteCarGQL,
    private dialogService: TdDialogService
  ) {}

  ngOnInit(): void {
    this.cars$ = this.listCarsGQL.watch().valueChanges.pipe(pluck('data', 'cars'));
    this.cars$.subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  editCar(id: Long): void {
    this.router.navigate([id], { relativeTo: this.activatedRoute });
  }

  removeCar(id: Long): void {
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
              {
                id: id
              },
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
              (car: Car) => {
                console.log(`Car with ID ${car.id} deleted.`);
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

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}

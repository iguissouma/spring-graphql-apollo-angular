export interface CarInput {
  /** A car's id */
  id?: Long | null;
  /** A car's name */
  name?: string | null;
}

/** Long type */
export type Long = any;

// ====================================================
// Documents
// ====================================================

export namespace AllCars {
  export interface Variables {}

  export interface Query {
    __typename?: 'Query';

    cars: (Cars | null)[] | null;
  }

  export interface Cars {
    __typename?: 'Car';

    id: Long | null;

    name: string | null;

    giphyUrl: string | null;
  }
}

export namespace DeleteCar {
  export interface Variables {
    id: Long;
  }

  export interface Mutation {
    __typename?: 'Mutation';

    deleteCar: boolean | null;
  }
}

export namespace GetCar {
  export interface Variables {
    id: Long;
  }

  export interface Query {
    __typename?: 'Query';

    car: Car | null;
  }

  export interface Car {
    __typename?: 'Car';

    id: Long | null;

    name: string | null;

    giphyUrl: string | null;
  }
}

export namespace PersistCar {
  export interface Variables {
    car: CarInput;
  }

  export interface SaveCar {
    __typename?: 'Car';

    id: Long | null;

    name: string | null;

    giphyUrl: string | null;
  }

  export interface Mutation {
    __typename?: 'Mutation';

    saveCar: SaveCar | null;
  }

}

// ====================================================
// START: Apollo Angular template
// ====================================================

import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';

import gql from 'graphql-tag';

// ====================================================
// Apollo Services
// ====================================================

@Injectable({
  providedIn: 'root'
})
export class AllCarsGQL extends Apollo.Query<AllCars.Query, AllCars.Variables> {
  document: any = gql`
    query AllCars {
      cars {
        id
        name
        giphyUrl
      }
    }
  `;
}

@Injectable({
  providedIn: 'root'
})
export class DeleteCarGQL extends Apollo.Mutation<DeleteCar.Mutation,
  DeleteCar.Variables> {
  document: any = gql`
    mutation deleteCar($id: Long!) {
      deleteCar(id: $id)
    }
  `;
}

@Injectable({
  providedIn: 'root'
})
export class GetCarGQL extends Apollo.Query<GetCar.Query, GetCar.Variables> {
  document: any = gql`
    query getCar($id: Long!) {
      car(id: $id) {
        id
        name
        giphyUrl
      }
    }
  `;
}

@Injectable({
  providedIn: 'root'
})
export class SaveCarGQL extends Apollo.Mutation<PersistCar.Mutation, PersistCar.Variables> {
  document: any = gql`
    mutation saveCar($car: CarInput!) {
      saveCar(car: $car) {
        id
        name
        giphyUrl
      }
    }
  `;
}

// ====================================================
// END: Apollo Angular template
// ====================================================

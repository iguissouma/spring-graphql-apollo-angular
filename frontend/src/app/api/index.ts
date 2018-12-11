export interface CarInput {
  /** A car's id */
  readonly id: number | null;
  /** A car's name */
  readonly name: string | null;
}

/** Long type */
export type Long = number;

// ====================================================
// Documents
// ====================================================

export type DeleteCarVariables = {
  readonly id: number;
};

export type DeleteCarMutation = {
  readonly __typename?: 'Mutation';

  readonly deleteCar: boolean | null;
};

export type GetCarVariables = {
  readonly id: number;
};

export type GetCarQuery = {
  readonly __typename?: 'Query';

  readonly car: GetCarCar | null;
};

export type GetCarCar = {
  readonly __typename?: 'Car';

  readonly id: number | null;

  readonly name: string | null;

  readonly giphyUrl: string | null;
};

export type ListCarsVariables = {};

export type ListCarsQuery = {
  readonly __typename?: 'Query';

  readonly cars: ReadonlyArray<ListCarsCars> | null;
};

export type ListCarsCars = {
  readonly __typename?: 'Car';

  readonly id: number | null;

  readonly name: string | null;

  readonly giphyUrl: string | null;
};

export type SaveCarVariables = {
  readonly car: CarInput;
};

export type SaveCarMutation = {
  readonly __typename?: 'Mutation';

  readonly saveCar: SaveCarSaveCar | null;
};

export type SaveCarSaveCar = {
  readonly __typename?: 'Car';

  readonly id: number | null;

  readonly name: string | null;

  readonly giphyUrl: string | null;
};

// ====================================================
// Scalars
// ====================================================

// ====================================================
// Types
// ====================================================

/** Query root type */
export interface Query {
  readonly cars: ReadonlyArray<Car> | null;

  readonly car: Car | null;
}

export interface Car {
  readonly giphyUrl: string | null;

  readonly id: number | null;

  readonly isCool: boolean;

  readonly name: string | null;
}

/** Mutation root type */
export interface Mutation {
  readonly deleteCar: boolean | null;

  readonly saveCar: Car | null;
}

// ====================================================
// Arguments
// ====================================================

export interface CarQueryArgs {
  id: number | null;
}
export interface DeleteCarMutationArgs {
  id: number | null;
}
export interface SaveCarMutationArgs {
  car: CarInput | null;
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
export class DeleteCarGQL extends Apollo.Mutation<
  DeleteCarMutation,
  DeleteCarVariables
> {
  document: any = gql`
    mutation DeleteCar($id: Long!) {
      deleteCar(id: $id)
    }
  `;
}
@Injectable({
  providedIn: 'root'
})
export class GetCarGQL extends Apollo.Query<GetCarQuery, GetCarVariables> {
  document: any = gql`
    query GetCar($id: Long!) {
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
export class ListCarsGQL extends Apollo.Query<
  ListCarsQuery,
  ListCarsVariables
> {
  document: any = gql`
    query ListCars {
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
export class SaveCarGQL extends Apollo.Mutation<
  SaveCarMutation,
  SaveCarVariables
> {
  document: any = gql`
    mutation SaveCar($car: CarInput!) {
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

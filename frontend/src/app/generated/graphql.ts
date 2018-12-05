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
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    cars: (Cars | null)[] | null;
  };

  export type Cars = {
    __typename?: "Car";

    id: Long | null;

    name: string | null;

    giphyUrl: string | null;
  };
}

export namespace DeleteCar {
  export type Variables = {
    id: Long;
  };

  export type Mutation = {
    __typename?: "Mutation";

    deleteCar: boolean | null;
  };
}

export namespace GetCar {
  export type Variables = {
    id: Long;
  };

  export type Query = {
    __typename?: "Query";

    car: Car | null;
  };

  export type Car = {
    __typename?: "Car";

    id: Long | null;

    name: string | null;

    giphyUrl: string | null;
  };
}

export namespace SaveCar {
  export type Variables = {
    car: CarInput;
  };

  export type Mutation = {
    __typename?: "Mutation";

    saveCar: SaveCar | null;
  };

  export type SaveCar = {
    __typename?: "Car";

    id: Long | null;

    name: string | null;

    giphyUrl: string | null;
  };
}

// ====================================================
// START: Apollo Angular template
// ====================================================

import { Injectable } from "@angular/core";
import * as Apollo from "apollo-angular";

import gql from "graphql-tag";

// ====================================================
// Apollo Services
// ====================================================

@Injectable({
  providedIn: "root"
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
  providedIn: "root"
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
  providedIn: "root"
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
  providedIn: "root"
})
export class SaveCarGQL extends Apollo.Mutation<SaveCar.Mutation,
  SaveCar.Variables> {
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

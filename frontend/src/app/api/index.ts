import gql from "graphql-tag";
import { Injectable } from "@angular/core";
import * as Apollo from "apollo-angular";
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Long type */
  Long: number;
  /** Unrepresentable type */
  UNREPRESENTABLE: any;
};

export type Car = {
  __typename?: "Car";
  readonly giphyUrl: Maybe<Scalars["String"]>;
  readonly id: Maybe<Scalars["Long"]>;
  readonly isCool: Scalars["Boolean"];
  readonly name: Maybe<Scalars["String"]>;
};

export type CarInput = {
  /** A car's id */
  readonly id: Maybe<Scalars["Long"]>;
  /** A car's name */
  readonly name: Maybe<Scalars["String"]>;
};

/** Mutation root */
export type Mutation = {
  __typename?: "Mutation";
  readonly deleteCar: Maybe<Scalars["Boolean"]>;
  readonly saveCar: Maybe<Car>;
};

/** Mutation root */
export type MutationDeleteCarArgs = {
  id: Maybe<Scalars["Long"]>;
};

/** Mutation root */
export type MutationSaveCarArgs = {
  car: Maybe<CarInput>;
};

/** Query root */
export type Query = {
  __typename?: "Query";
  readonly cars: Maybe<ReadonlyArray<Maybe<Car>>>;
  readonly car: Maybe<Car>;
};

/** Query root */
export type QueryCarArgs = {
  id: Maybe<Scalars["Long"]>;
};

export type DeleteCarMutationVariables = {
  id: Scalars["Long"];
};

export type DeleteCarMutation = { readonly __typename?: "Mutation" } & Pick<
  Mutation,
  "deleteCar"
>;

export type GetCarQueryVariables = {
  id: Scalars["Long"];
};

export type GetCarQuery = { readonly __typename?: "Query" } & {
  readonly car: Maybe<
    { readonly __typename?: "Car" } & Pick<Car, "id" | "name" | "giphyUrl">
  >;
};

export type ListCarsQueryVariables = {};

export type ListCarsQuery = { readonly __typename?: "Query" } & {
  readonly cars: Maybe<
    ReadonlyArray<
      Maybe<
        { readonly __typename?: "Car" } & Pick<Car, "id" | "name" | "giphyUrl">
      >
    >
  >;
};

export type SaveCarMutationVariables = {
  car: CarInput;
};

export type SaveCarMutation = { readonly __typename?: "Mutation" } & {
  readonly saveCar: Maybe<
    { readonly __typename?: "Car" } & Pick<Car, "id" | "name" | "giphyUrl">
  >;
};

export const DeleteCarDocument = gql`
  mutation DeleteCar($id: Long!) {
    deleteCar(id: $id)
  }
`;

@Injectable({
  providedIn: "root"
})
export class DeleteCarGQL extends Apollo.Mutation<
  DeleteCarMutation,
  DeleteCarMutationVariables
> {
  document = DeleteCarDocument;
}
export const GetCarDocument = gql`
  query GetCar($id: Long!) {
    car(id: $id) {
      id
      name
      giphyUrl
    }
  }
`;

@Injectable({
  providedIn: "root"
})
export class GetCarGQL extends Apollo.Query<GetCarQuery, GetCarQueryVariables> {
  document = GetCarDocument;
}
export const ListCarsDocument = gql`
  query ListCars {
    cars {
      id
      name
      giphyUrl
    }
  }
`;

@Injectable({
  providedIn: "root"
})
export class ListCarsGQL extends Apollo.Query<
  ListCarsQuery,
  ListCarsQueryVariables
> {
  document = ListCarsDocument;
}
export const SaveCarDocument = gql`
  mutation SaveCar($car: CarInput!) {
    saveCar(car: $car) {
      id
      name
      giphyUrl
    }
  }
`;

@Injectable({
  providedIn: "root"
})
export class SaveCarGQL extends Apollo.Mutation<
  SaveCarMutation,
  SaveCarMutationVariables
> {
  document = SaveCarDocument;
}

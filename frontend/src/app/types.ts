/* tslint:disable */

/* Long type */
export type Long = any;
/* Query root type */
export interface Query {
  cars?: Car[] | null;
  car?: Car | null;
}

export interface Car {
  giphyUrl?: string | null;
  id?: Long | null;
  isCool?: boolean | null;
  name?: string | null;
}
/* Mutation root type */
export interface Mutation {
  deleteCar?: boolean | null;
  saveCar?: Car | null;
}

export interface CarInput {
  name?: string | null /* A car&#x27;s name */;
  id?: Long | null /* A car&#x27;s id */;
}
export interface CarQueryArgs {
  id?: Long | null;
}
export interface DeleteCarMutationArgs {
  id?: Long | null;
}
export interface SaveCarMutationArgs {
  car?: CarInput | null;
}
export namespace GetCar {
  export type Variables = {
    id: Long;
  };

  export type Query = {
    __typename?: "Query";
    car?: Car | null;
  };

  export type Car = {
    __typename?: "Car";
    id?: Long | null;
    name?: string | null;
    giphyUrl?: string | null;
  };
}
export namespace GetAllCars {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";
    cars?: Cars[] | null;
  };

  export type Cars = {
    __typename?: "Car";
    id?: Long | null;
    name?: string | null;
    giphyUrl?: string | null;
  };
}
export namespace SaveCar {
  export type Variables = {
    car: CarInput;
  };

  export type Mutation = {
    __typename?: "Mutation";
    saveCar?: SaveCar | null;
  };

  export type SaveCar = {
    __typename?: "Car";
    id?: Long | null;
    name?: string | null;
    giphyUrl?: string | null;
  };
}
export namespace RemoveCar {
  export type Variables = {
    id: Long;
  };

  export type Mutation = {
    __typename?: "Mutation";
    deleteCar?: boolean | null;
  };
}

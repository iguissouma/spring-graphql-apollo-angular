import gql from 'graphql-tag';

export const getCar = gql`
    query getCar($id: Long!){
        car(id : $id){
            id
            name
            giphyUrl
        }
    }`;


export const getAllCars = gql`
    query getAllCars{
        cars{
            id
            name
            giphyUrl
        }
    }`;

export const saveCar = gql`
    mutation saveCar($car: CarInput!) {
        saveCar(car: $car) {
            id
            name
            giphyUrl
        }
    }`;

export const deleteCar = gql`
    mutation deleteCar($id: Long!) {
        deleteCar(id: $id)
    }`;

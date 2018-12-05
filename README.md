# Basic CRUD App with Angular 7.0 and Spring Boot 2.0
This example app shows how to build a basic CRUD app with Spring Boot 2.0, GraphQL, SPQR, Apollo Client and Angular 7.0.

**Prerequisites:** [Java 8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) and [Node.js](https://nodejs.org/).

* [Getting Started](#getting-started)
* [Resources](#resources)

## Getting Started

To install this example application, run the following commands:

```bash
git clone https://github.com/iguissouma/spring-graphql-apollo-angular.git
cd spring-graphql-apollo-angular
```

This will get a copy of the project installed locally. To install all of its dependencies and start each app, follow the instructions below.

To run the server, cd into the `server` folder and run:
 
```bash
./mvnw spring-boot:run
```

To run the client, cd into the `client` folder and run:
 
```bash
npm install && npm start
```

## Resources
* Matt Raible (@mraible) Blog posts and Repo
    * [Build a Basic CRUD App with Angular 5.0 and Spring Boot 2.0 Blog post](https://developer.okta.com/blog/2017/12/04/basic-crud-angular-and-spring-boot) 
    * [CRUD App with Angular 5.0 and Spring Boot 2.0 GitHub Repo](https://github.com/oktadeveloper/okta-spring-boot-2-angular-5-example)
* Kamil Kisiela Blog posts and Repo
    * [Apollo-Angular 1.2 — using GraphQL in your apps just got a whole lot easier! Blog post](https://medium.com/the-guild/apollo-angular-code-generation-7903da1f8559)
    * [Use GraphQL in Angular - step by step - includes code generation](https://github.com/kamilkisiela/apollo-angular-introduction)
    * [Query and Mutation as a service GitHub Repo](https://github.com/kamilkisiela/apollo-angular-services)
* Uri Goldshtein from Apollo Team conference @ng-conf
    * [Angular and GraphQL – A modern API for a modern Platform](https://www.youtube.com/watch?v=rb5i8Bs7-k0)
* Bojan Tomić conference @Devoxx and Samples Repo
    * [GraphQL SPQR: The fastest route to GraphQL](https://www.youtube.com/watch?v=iyt7PwkUWQA)
    * [GraphQL SPQR Samples](https://github.com/leangen/graphql-spqr-samples)
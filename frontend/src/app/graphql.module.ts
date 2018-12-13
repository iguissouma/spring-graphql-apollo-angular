import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createPersistedQueryLink } from 'apollo-angular-link-persisted';
import { getMainDefinition } from 'apollo-utilities';
import { OperationDefinitionNode } from 'graphql';
import { split } from 'apollo-link';
import { WebSocketLink } from "apollo-link-ws";

@NgModule({
  exports: [HttpClientModule, ApolloModule, HttpLinkModule],
  providers: [{
    provide: APOLLO_OPTIONS,
    useFactory(httpLink: HttpLink) {
      const subscriptionLink = new WebSocketLink({
        uri: "ws://localhost:8080/graphql",
        options: {
          reconnect: true
        }
      });
      const http = httpLink.create({uri: '/graphql_apq'});
      const persisted = createPersistedQueryLink();
      const link = split(
        ({query}) => {
          const {kind, operation} = getMainDefinition(query);
          return kind === 'OperationDefinition' && operation === 'subscription';
        },
        subscriptionLink,
        persisted.concat(http)
      );

      return {
        link: link,
        cache: new InMemoryCache()
      }
    },
    deps: [HttpLink]
  }]

})
export class GraphQLModule {
}

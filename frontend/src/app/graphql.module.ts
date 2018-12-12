import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createPersistedQueryLink } from 'apollo-angular-link-persisted';

@NgModule({
  exports: [HttpClientModule, ApolloModule, HttpLinkModule],
  providers: [{
    provide: APOLLO_OPTIONS,
    useFactory(httpLink: HttpLink) {
      const http = httpLink.create({uri: '/graphql_apq'});
      const persisted = createPersistedQueryLink();
      return {
        link: persisted.concat(http),
        cache: new InMemoryCache()
      }
    },
    deps: [HttpLink]
  }]

})
export class GraphQLModule {}

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';

@NgModule({
  exports: [HttpClientModule, ApolloModule, HttpLinkModule]
})
export class GraphQLModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    const cache = new InMemoryCache();
    const myAppLink: ApolloLink = httpLink.create({ uri: '/graphql' });
    apollo.create({
      link: myAppLink,
      cache: cache
    });
  }
}

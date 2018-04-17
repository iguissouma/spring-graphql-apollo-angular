package com.igu.developer.demo;

import io.leangen.graphql.annotations.GraphQLQuery;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter @Setter
@NoArgsConstructor
@ToString @EqualsAndHashCode
public class Car {
    @Id @GeneratedValue
    @GraphQLQuery(name = "id", description = "A car's id")
    private Long id;
    @GraphQLQuery(name = "name", description = "A car's name")
    private @NonNull String name;
}
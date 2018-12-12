package com.igu.developer.demo.web.errors;

import graphql.ErrorType;
import graphql.GraphQLError;
import graphql.language.SourceLocation;

import java.util.Collections;
import java.util.List;

public class PersistedQueryNotFoundGraphQLError implements GraphQLError {
    @Override
    public String getMessage() {
        return "PersistedQueryNotFound";
    }

    @Override
    public List<SourceLocation> getLocations() {
        return Collections.emptyList();
    }

    @Override
    public ErrorType getErrorType() {
        return ErrorType.ExecutionAborted;
    }
}

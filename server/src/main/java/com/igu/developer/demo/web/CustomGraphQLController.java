package com.igu.developer.demo.web;

import com.igu.developer.demo.web.dto.GraphQLRequest;
import com.igu.developer.demo.web.errors.PersistedQueryNotFoundGraphQLError;
import graphql.ExecutionInput;
import graphql.ExecutionResult;
import graphql.ExecutionResultImpl;
import graphql.GraphQL;
import graphql.schema.GraphQLSchema;
import io.leangen.graphql.spqr.spring.autoconfigure.DataLoaderRegistryFactory;
import io.leangen.graphql.spqr.spring.autoconfigure.DefaultGlobalContext;
import org.dataloader.DataLoaderRegistry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
public class CustomGraphQLController {

    private final GraphQL graphQL;
    private final DataLoaderRegistryFactory dataLoaderRegistryFactory;
    private ConcurrentHashMap<String, String> persistedQueryCache = new ConcurrentHashMap<>();

    @Autowired
    public CustomGraphQLController(GraphQLSchema schema) {
        graphQL = GraphQL.newGraphQL(schema).build();
        this.dataLoaderRegistryFactory = () -> null;
    }

    @PostMapping(
            value = "/graphql_apq",
            consumes = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_JSON_VALUE},
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE
    )
    @ResponseBody
    public Map<String, Object> executeJsonPost(@RequestBody GraphQLRequest requestBody,
                                               GraphQLRequest requestParams,
                                               HttpServletRequest raw) {
        String query = requestParams.getQuery() == null ? requestBody.getQuery() : requestParams.getQuery();
        Map<String, Object> extensions = requestParams.getExtensions() == null ? requestBody.getExtensions() : requestParams.getExtensions();
        String queryHashKey = extractQueryHashKeyFromExtensions(extensions);
        if (query == null && queryHashKey != null) {
            query = persistedQueryCache.get(queryHashKey);
        }
        if (query == null) {
            return persistedQueryNotFoundExecutionResult().toSpecification();
        }
        if (queryHashKey != null) {
            persistedQueryCache.putIfAbsent(queryHashKey, query);
        }

        String operationName = requestParams.getOperationName() == null ? requestBody.getOperationName() : requestParams.getOperationName();
        Map<String, Object> variables = requestParams.getVariables() == null ? requestBody.getVariables() : requestParams.getVariables();

        DataLoaderRegistry dataLoaders = dataLoaderRegistryFactory.createDataLoaderRegistry();
        ExecutionResult executionResult = graphQL(dataLoaders).execute(ExecutionInput.newExecutionInput()
                .query(query)
                .operationName(operationName)
                .variables(variables)
                .context(new DefaultGlobalContext(raw))
                .build());
        return executionResult.toSpecification();
    }

    private String extractQueryHashKeyFromExtensions(Map<String, Object> extensions) {
        String hashKey = null;
        if (extensions != null && extensions.containsKey("persistedQuery")) {
            Map<String, String> persistedQueryExtension = (Map<String, String>) extensions.get("persistedQuery");
            hashKey = persistedQueryExtension.get("sha256Hash");
        }
        return hashKey;
    }

    private ExecutionResult persistedQueryNotFoundExecutionResult() {
        return ExecutionResultImpl.newExecutionResult().addError(new PersistedQueryNotFoundGraphQLError()).build();
    }


    private GraphQL graphQL(DataLoaderRegistry dataLoaders) {
        return graphQL;
    }

}
package com.igu.developer.demo.web.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Map;

@JsonIgnoreProperties(ignoreUnknown = true)
public class GraphQLRequest {

    private final String query;
    private final String operationName;
    private final Map<String, Object> variables;
    private final Map<String, Object> extensions;

    @JsonCreator
    public GraphQLRequest(@JsonProperty("query") String query,
                          @JsonProperty("operationName") String operationName,
                          @JsonProperty("variables") Map<String, Object> variables,
                          @JsonProperty("extensions") Map<String, Object> extensions) {
        this.query = query;
        this.operationName = operationName;
        this.variables = variables;
        this.extensions = extensions;
    }

    public String getQuery() {
        return query;
    }

    public String getOperationName() {
        return operationName;
    }

    public Map<String, Object> getVariables() {
        return variables;
    }

    public Map<String, Object> getExtensions() {
        return extensions;
    }
}

package com.igu.developer.demo;

import io.leangen.graphql.annotations.*;
import io.leangen.graphql.spqr.spring.annotation.GraphQLApi;
import org.reactivestreams.Publisher;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.SynchronousSink;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.function.Consumer;

@Service
@GraphQLApi
public class CarService {

    private final CarRepository carRepository;
    private final GiphyService giphyService;

    public CarService(CarRepository carRepository, GiphyService giphyService) {
        this.carRepository = carRepository;
        this.giphyService = giphyService;
    }

    @GraphQLQuery(name = "cars")
    public List<Car> getCars() {
        return carRepository.findAll();
    }

    @GraphQLQuery(name = "car")
    public Optional<Car> getCarById(@GraphQLArgument(name = "id") Long id) {
        return carRepository.findById(id);
    }

    @GraphQLMutation(name = "saveCar")
    public Car saveCar(@GraphQLArgument(name = "car") Car car) {
        return carRepository.save(car);
    }

    @GraphQLMutation(name = "deleteCar")
    public Boolean deleteCar(@GraphQLArgument(name = "id") Long id) {
        carRepository.deleteById(id);
        return Boolean.TRUE;
    }

    @GraphQLQuery(name = "isCool")
    public boolean isCool(@GraphQLContext Car car) {
        return !car.getName().equals("AMC Gremlin") &&
                !car.getName().equals("Triumph Stag") &&
                !car.getName().equals("Ford Pinto") &&
                !car.getName().equals("Yugo GV");
    }

    @GraphQLQuery(name = "giphyUrl")
    public String getGiphyUrl(@GraphQLContext Car car) {
        return giphyService.getGiphyUrl(car.getName());
    }

    @GraphQLSubscription
    public Publisher<Tick> timer() {
        return Flux.generate(
                (Consumer<SynchronousSink<String>>) synchronousSink ->
                        synchronousSink.next(UUID.randomUUID().toString()))
                .map(Tick::new)
                .delayElements(Duration.ofSeconds(2));
    }
}



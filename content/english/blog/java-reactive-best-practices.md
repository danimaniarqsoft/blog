---
date: 2025-05-12T04:14:54-08:00
draft: false
title: "WebFlux best practices"
author: Daniel Pichardo
---


# ⚛ WebFlux-Specific Best Practices

## 1. Always Return `Mono<T>` or `Flux<T>`

```java
public Mono<User> getUser(String id) {
    return userRepository.findById(id);
}
```

## 2. Never Use `.block()` in Production

```java
User user = userService.getUser().block(); // ❌ Bad
```

## 3. Chain Reactive Operators Correctly

```java
return userRepository.findById(id)
    .switchIfEmpty(Mono.error(new UserNotFoundException()))
    .flatMap(this::enrichUser);
```

## 4. Use `Schedulers` When Necessary

```java
Mono.fromCallable(() -> blockingCall())
    .subscribeOn(Schedulers.boundedElastic());
```

## 5. Apply Backpressure in Flux

```java
Flux.range(1, 1000)
    .limitRate(100);
```

## 6. Handle Errors Reactively

```java
return webClient.get()
    .uri("/external-api")
    .retrieve()
    .bodyToMono(String.class)
    .onErrorResume(e -> Mono.just("default value"));
```

## 7. Write Reactive Unit Tests

```java
@Test
void testReactiveStream() {
    Flux<String> flux = Flux.just("A", "B");

    StepVerifier.create(flux)
        .expectNext("A")
        .expectNext("B")
        .verifyComplete();
}
```

## 8. Use Functional Routing for Lightweight APIs

```java
@Bean
public RouterFunction<ServerResponse> route(MyHandler handler) {
    return RouterFunctions.route(GET("/hello"), handler::hello);
}
```
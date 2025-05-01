---
date: 2025-02-18T04:14:54-08:00
draft: false
title: "Java Web flux"
author: Daniel Pichardo
---


# ⚡ Java Reactive Programming with Spring WebFlux: Building Scalable, Non-Blocking Applications

In today’s cloud-native world, the demand for highly responsive and scalable applications has never been greater. Traditional thread-per-request architectures often struggle under heavy load. That’s where **Reactive Programming** shines — and in the Java ecosystem, **Spring WebFlux** is the tool of choice for building reactive systems.

---

## 🔄 What Is Reactive Programming?

Reactive programming is a paradigm built around **asynchronous data streams** and the **propagation of change**. Instead of waiting for events synchronously, reactive applications respond to events **non-blockingly** and **reactively**.

### 🚀 Key Benefits:
- Efficient **non-blocking I/O**
- Support for **backpressure**
- **Better scalability** under load
- Enhanced **throughput and responsiveness**

---

## 🌐 Introducing Spring WebFlux

**Spring WebFlux** is Spring's reactive web framework introduced in **Spring 5**. It’s built on top of the **Reactive Streams** specification and is designed for **non-blocking**, **asynchronous**, **event-driven** applications.

### Two Programming Models:
- **Annotation-based** (familiar for Spring MVC developers)
- **Functional endpoints** (more explicit, functional style)

---

## 🔌 Core Technologies Behind WebFlux

- **Project Reactor**: Provides reactive types `Mono<T>` (0–1 elements) and `Flux<T>` (0–∞ elements)
- **Reactive Streams**: Standard for asynchronous stream processing
- **Reactor Netty**: Default HTTP server used in WebFlux for non-blocking I/O

---

## 🧪 Building a Reactive REST API

Let’s build a simple REST API for product management using Spring WebFlux.

### 📦 Maven Dependencies

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-webflux</artifactId>
</dependency>
```




🧱 Product Entity

```java
public class Product {
    private String id;
    private String name;
    private double price;

    // Getters and Setters
}
```

💾 Reactive Repository (In-Memory)

```java
@Repository
public class ProductRepository {
    private final Map<String, Product> db = new ConcurrentHashMap<>();

    public Flux<Product> findAll() {
        return Flux.fromIterable(db.values());
    }

    public Mono<Product> findById(String id) {
        return Mono.justOrEmpty(db.get(id));
    }

    public Mono<Product> save(Product product) {
        db.put(product.getId(), product);
        return Mono.just(product);
    }

    public Mono<Void> delete(String id) {
        db.remove(id);
        return Mono.empty();
    }
}
```

🌍 Reactive REST Controller

```java
@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductRepository repo;

    @GetMapping
    public Flux<Product> getAll() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Mono<ResponseEntity<Product>> getById(@PathVariable String id) {
        return repo.findById(id)
                   .map(ResponseEntity::ok)
                   .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Mono<Product> create(@RequestBody Product product) {
        return repo.save(product);
    }

    @DeleteMapping("/{id}")
    public Mono<Void> delete(@PathVariable String id) {
        return repo.delete(id);
    }
}
```

⚙️ Spring MVC vs Spring WebFlux
Feature	Spring MVC	Spring WebFlux
Blocking	Yes	No
Concurrency Model	One thread per request	Event-loop model
Return Types	ResponseEntity, etc	Mono, Flux
Backpressure	No	Yes

🧰 Testing Reactive Code

Use StepVerifier to test reactive flows:

```java
StepVerifier.create(repo.findAll())
    .expectNextCount(3)
    .verifyComplete();
```
💡 When Should You Use WebFlux?

✅ Use WebFlux when:

    You need high concurrency and scalability

    Your data sources are non-blocking

    You’re building streaming, chat, or IoT applications

🚫 Avoid WebFlux when:

    Your entire stack is blocking (e.g., JDBC)

    Your system doesn’t need reactive performance benefits

🚀 Conclusion

Spring WebFlux brings the power of reactive programming into the Spring ecosystem, enabling the development of high-performance, non-blocking, and scalable applications. While it comes with a learning curve, it’s a must-have tool for modern, cloud-native development in Java.

Whether you're building microservices or event-driven APIs, Spring WebFlux is an excellent choice to keep your backend responsive, lightweight, and future-proof.

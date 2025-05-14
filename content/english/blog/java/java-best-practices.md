---
title: "Java best practices"
meta_title: "meta title"
description: "this is meta description"
date: 2025-05-12T04:14:54-08:00
image: "/images/image-placeholder.png"
categories: ["Java"]
author: "Daniel Pichardo"
tags: ["best-practices"]
draft: false
---

The best practices come with experience so this post is going to be updated if new best practices are learned.

# ✅ Java Programming Best Practices (with Examples)

## 1. Follow Naming Conventions
Use meaningful and consistent names.

```java
// ✅ Good
int customerAge;

// ❌ Bad
int ca;
```

## 2. Use `final` for Immutable Data

```java
final String greeting = "Hello";
// greeting = "Hi"; // ❌ Compilation error
```

## 3. Avoid Using Raw Types in Generics

```java
List<String> names = new ArrayList<>();
// ❌ Avoid this
List list = new ArrayList();  // Unsafe
```

## 4. Prefer `Optional` Over Null

```java
Optional<String> findName(String id) {
    return Optional.ofNullable(database.get(id));
}
```

## 5. Use Streams and Lambdas for Collections

```java
List<String> filtered = users.stream()
    .filter(User::isActive)
    .map(User::getEmail)
    .collect(Collectors.toList());
```

## 6. Avoid Heavy Constructor Logic

```java
// ❌ Bad
public User() {
    loadUserDataFromDB();
}

// ✅ Good
public User(Data data) {
    this.data = data;
}
```

## 7. Use Enums Instead of Constant Strings

```java
public enum OrderStatus {
    PENDING, SHIPPED, DELIVERED
}
```

## 8. Close Resources with Try-With-Resources

```java
try (BufferedReader br = new BufferedReader(new FileReader("file.txt"))) {
    String line = br.readLine();
}
```

## 9. Use Logging Instead of `System.out.println`

```java
private static final Logger logger = LoggerFactory.getLogger(MyClass.class);
logger.info("Processing order {}", orderId);
```

## 10. Write Unit Tests

```java
@Test
void shouldReturnCustomerById() {
    when(repo.findById(1L)).thenReturn(Optional.of(customer));
    assertEquals("Alice", service.getCustomer(1L).getName());
}
```

## 11. Document Public APIs with Javadoc

```java
/**
 * Returns a user's full name.
 *
 * @param user the user object
 * @return full name string
 */
public String getFullName(User user) { ... }
```

## 12. Handle Exceptions Gracefully

```java
try {
    userRepository.save(user);
} catch (DataIntegrityViolationException e) {
    throw new DuplicateUserException("User already exists");
}
```

## 13. Use Dependency Injection (Spring Context)

```java
@Component
public class NotificationService {
    private final EmailClient emailClient;

    @Autowired
    public NotificationService(EmailClient emailClient) {
        this.emailClient = emailClient;
    }
}
```

## 14. Avoid Business Logic in Controllers

```java
@RestController
public class OrderController {
    private final OrderService service;

    @GetMapping("/orders/{id}")
    public Mono<Order> getOrder(@PathVariable Long id) {
        return service.findOrderById(id); // ✅ logic in service
    }
}
```

## References

[Jetbrains Java best practices](https://blog.jetbrains.com/idea/2024/02/java-best-practices/)

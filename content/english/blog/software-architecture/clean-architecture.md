---
title: "Clean Architecture: Building Robust and Maintainable Software"
meta_title: "Clean Architecture"
description: "this is meta description"
date: 2025-06-13T08:57:37-06:00
image: "/images/posts/software-architecture/clean-architecture.png"
categories: ["Software architecture"]
author: "Daniel Pichardo"
tags: ["software-design"]
draft: false
---

In the ever-evolving landscape of software development, building applications that are not only functional but also adaptable, testable, and maintainable is paramount. This is where **Clean Architecture** comes into play. More than just a set of rules, Clean Architecture is a philosophy that guides the structuring of software systems to ensure they remain flexible and resilient in the face of changing requirements. It emphasizes the **separation of concerns**, allowing different parts of the system to evolve independently without impacting the core business logic. This article will delve into the intricacies of Clean Architecture, exploring its history, core principles with real-world examples, and practical implementations across various programming languages.

---

## History

The concepts underpinning Clean Architecture are not entirely new; they are a culmination of decades of software engineering wisdom. The journey began with foundational ideas like **Separation of Concerns**, championed by Edsger W. Dijkstra in the late 1960s, emphasizing that a program should be divided into distinct sections, each addressing a separate concern.

The 1980s saw the rise of **Object-Oriented Programming (OOP)**, which brought principles like encapsulation, inheritance, and polymorphism to the forefront, promoting modularity and reusability. However, the true precursor to Clean Architecture as we know it today emerged from various architectural patterns and philosophies that sought to address the increasing complexity of software systems.

One significant influence was the **Onion Architecture**, proposed by Jeffrey Palermo in 2008. Onion Architecture advocated for an application structure with the domain model at the center, surrounded by layers for domain services, application services, and finally, infrastructure. This emphasized the **dependency rule**: inner layers should not depend on outer layers.

Similarly, **Hexagonal Architecture** (also known as Ports and Adapters), introduced by Alistair Cockburn in 2005, aimed to isolate the core business logic from external dependencies like databases, UI, and external services. It achieved this by defining "ports" (interfaces) through which the application interacts with the outside world and "adapters" that implement these ports for specific technologies.

**Robert C. Martin**, affectionately known as "Uncle Bob," synthesized these ideas and other best practices into what he formalized as "Clean Architecture" in his 2012 blog post and later in his influential 2017 book, "Clean Architecture: A Craftsman's Guide to Software Structure and Design." Uncle Bob's contribution was significant in providing a unified and comprehensive framework that clearly articulates the principles and benefits of such an architectural style. He emphasized the crucial **Dependency Rule**, stating that source code dependencies must only point inwards, towards higher-level policies.

---

## Key Principles and Examples

Clean Architecture is built upon a foundation of several interconnected principles, each contributing to the overall goal of creating maintainable and robust software. We will explore the most prominent ones, providing real-world examples from both an architectural and design perspective, along with code examples in Java, Python, and JavaScript.

---

### 1. The Dependency Rule (The Core of Clean Architecture)

{{< notice "Principle" >}}
Source code dependencies must only point inwards, towards higher-level policies. Inner circles represent higher-level policies, and outer circles represent lower-level details. The core business logic (**Entities** and **Use Cases**) should be completely independent of infrastructure concerns (databases, UI, frameworks).
{{< /notice >}}


#### Architectural Perspective Example:
Imagine an e-commerce application. The core business logic, such as calculating product prices, managing inventory, or processing orders, should not be aware of whether the data is stored in a SQL database, a NoSQL database, or a cloud storage service. Similarly, it shouldn't know if the user interface is a web application, a mobile app, or a desktop client. The business rules are the highest-level policies.

#### Design Perspective Example:
In a typical three-tier application, the business logic layer should not directly import classes from the presentation layer or the data access layer. Instead, the business logic layer defines interfaces (ports) that the outer layers (adapters) implement.


#### Examples in Code:

{{< tabs >}}
{{< tab "Python" >}}
**Python Example:**

```python
# Core Business Logic (Higher-level Policy)
# Located in a module like ecommerce.domain
# ecommerce/domain/use_cases.py
class `OrderProcessor`:
    def process_order(self, order):
        raise NotImplementedError

# Data Access Interface (Port)
# Located in a module like ecommerce.application.ports
# ecommerce/application/ports/order_repository.py
class OrderRepository:
    def save(self, order):
        raise NotImplementedError

    def find_by_id(self, order_id):
        raise NotImplementedError

# Data Access Implementation (Adapter) - depends on the port
# Located in a module like ecommerce.infrastructure.data
# ecommerce/infrastructure/data/sqlalchemy_order_repository.py
from ecommerce.application.ports.order_repository import OrderRepository

class SQLAlchemyOrderRepository(OrderRepository):
    def save(self, order):
        print(f"Saving order to SQLAlchemy database: {order.order_id}")

    def find_by_id(self, order_id):
        print(f"Finding order by ID from SQLAlchemy database: {order_id}")
        return type('Order', (object,), {'order_id': order_id})() # Placeholder
```

{{< /tab >}}
{{< tab "Java" >}}
**Java Example:**

```java
// Core Business Logic (Higher-level Policy)
// Located in a package like com.ecommerce.domain
package com.ecommerce.domain.usecases;

public interface `OrderProcessor` {
    void processOrder(Order order);
}

// Data Access Interface (Port)
// Located in a package like com.ecommerce.application.ports
package com.ecommerce.application.ports;

import com.ecommerce.domain.entities.Order;

public interface OrderRepository {
    void save(Order order);
    Order findById(String orderId);
}

// Data Access Implementation (Adapter) - depends on the port, not the other way around
// Located in a package like com.ecommerce.infrastructure.data
package com.ecommerce.infrastructure.data;

import com.ecommerce.application.ports.OrderRepository;
import com.ecommerce.domain.entities.Order;

public class JpaOrderRepository implements OrderRepository {
    // ... JPA specific implementation
    @Override
    public void save(Order order) {
        System.out.println("Saving order to JPA database: " + order.getId());
    }

    @Override
    public Order findById(String orderId) {
        System.out.println("Finding order by ID from JPA database: " + orderId);
        return new Order(orderId); // Placeholder
    }
}
```
{{< /tab >}}
{{< tab "JavaScript" >}}

**JavaScript Example:**

```javascript
// Core Business Logic (Higher-level Policy)
// Located in a file like domain/useCases.js
// domain/useCases.js
class `OrderProcessor` {
    processOrder(order) {
        throw new Error('Method not implemented');
    }
}

// Data Access Interface (Port)
// Located in a file like application/ports/orderRepository.js
// application/ports/orderRepository.js
class OrderRepository {
    save(order) {
        throw new Error('Method not implemented');
    }

    findById(orderId) {
        throw new Error('Method not implemented');
    }
}

// Data Access Implementation (Adapter) - depends on the port
// Located in a file like infrastructure/data/mongoOrderRepository.js
// infrastructure/data/mongoOrderRepository.js
const OrderRepository = require('../../application/ports/orderRepository');

class MongoOrderRepository extends OrderRepository {
    save(order) {
        console.log(`Saving order to MongoDB: ${order.id}`);
    }

    findById(orderId) {
        console.log(`Finding order by ID from MongoDB: ${orderId}`);
        return { id: orderId }; // Placeholder
    }
}
```

{{< /tab >}}

{{< /tabs >}}

#### Violations and Solutions:

**Violation**: The ``OrderProcessor`` directly imports and uses `JpaOrderRepository`.

**Problem**: This couples the business logic to a specific database technology. If you switch from JPA to NoSQL, you have to modify the `OrderProcessor`.

**Solution**: Introduce the `OrderRepository` interface. The `OrderProcessor` depends on the interface, and the `JpaOrderRepository` (or `MongoOrderRepository`, etc.) implements that interface. The `OrderProcessor` receives an instance of `OrderRepository` via dependency injection.


### 2. Enterprice Business Rules (Entities)

{{< notice "Principle" >}}
Encapsulate the most general and high-level rules. They are the core business objects that remain stable regardless of external changes. They are pure business logic, independent of any application-specific use case.
{{< /notice >}}

#### Architectural Perspective Example:
In a banking system, an `Account` entity would define rules like _"an account balance cannot go below a certain threshold"_ or _"interest is calculated based on the average daily balance"_. These rules are fundamental to the banking domain and apply across all applications that interact with accounts (e.g., ATM, online banking, branch operations).

#### Design Perspective Example:
Entities are typically plain old objects (POJOs, POCOs, or Pure JS Objects) with methods that encapsulate their behavior. They should not have direct dependencies on frameworks, databases, or UI components.

#### Examples in Code:
{{< tabs >}}
{{< tab "Python" >}}
```python
# Located in ecommerce/domain/entities.py
import uuid

class Product:
    def __init__(self, name, price, stock):
        self.id = str(uuid.uuid4())
        self.name = name
        self.price = price
        self.stock = stock

    # Business rule: A product's stock cannot be negative
    def decrease_stock(self, quantity):
        if self.stock - quantity < 0:
            raise ValueError(f"Insufficient stock for product: {self.name}")
        self.stock -= quantity

    def increase_stock(self, quantity):
        self.stock += quantity
```
{{< /tab >}}
{{< tab "Java" >}}
```java
// Located in com.ecommerce.domain.entities
package com.ecommerce.domain.entities;

import java.math.BigDecimal;
import java.util.UUID;

public class Product {
    private String id;
    private String name;
    private BigDecimal price;
    private int stock;

    public Product(String name, BigDecimal price, int stock) {
        this.id = UUID.randomUUID().toString();
        this.name = name;
        this.price = price;
        this.stock = stock;
    }

    // Business rule: A product's stock cannot be negative
    public void decreaseStock(int quantity) {
        if (this.stock - quantity < 0) {
            throw new IllegalArgumentException("Insufficient stock for product: " + name);
        }
        this.stock -= quantity;
    }

    public void increaseStock(int quantity) {
        this.stock += quantity;
    }

    // Getters
    public String getId() { return id; }
    public String getName() { return name; }
    public BigDecimal getPrice() { return price; }
    public int getStock() { return stock; }
}
```
{{< /tab >}}
{{< tab "JavaScript" >}}
```javascript
// Located in domain/entities.js
class Product {
    constructor(name, price, stock) {
        this.id = Math.random().toString(36).substr(2, 9); // Simple ID generation
        this.name = name;
        this.price = price;
        this.stock = stock;
    }

    // Business rule: A product's stock cannot be negative
    decreaseStock(quantity) {
        if (this.stock - quantity < 0) {
            throw new Error(`Insufficient stock for product: ${this.name}`);
        }
        this.stock -= quantity;
    }

    increaseStock(quantity) {
        this.stock += quantity;
    }
}

module.exports = Product;
```
{{< /tab >}}

{{< /tabs >}}



#### Violations and Solutions:

**Violation**: The Product entity has a `@Column` or `@Entity` annotation directly linked to a JPA framework.

**Problem**: This couples the core business rule to a specific persistence framework. If you change your ORM or database, you might need to heavily refactor your entities.

**Solution**: Remove framework-specific annotations from entities. Use data mappers or repository implementations in the infrastructure layer to map entities to database tables.


### 3. Application Business Rules (Use Cases)

{{< notice "Principle" >}}
These encapsulate and implement all of the use cases of the system. They orchestrate the flow of data to and from the Entities, and direct them to achieve the goals of the application. Changes in the UI or database should not affect use cases.{{< /notice >}}

#### Architectural Perspective Example:
In a flight booking system, a **"Book Flight" use case** would involve steps like validating passenger details, checking seat availability, calculating the fare, and creating a booking record. This use case interacts with `Flight` and `Passenger` entities and uses services for payment processing or notification.

#### Design Perspective Example: 
Use cases are typically classes with a single public method (e.g., `execute`, `handle`). They receive input models, interact with entities and external services (via interfaces defined in `application/ports`), and return output models.

#### Examples in code

{{< tabs >}}
{{< tab "Python" >}}
```python
# Located in ecommerce/application/use_cases/place_order.py
from ecommerce.application.ports.order_repository import OrderRepository
from ecommerce.domain.entities import Product # Assuming Product is loaded from a repo
import uuid

class PlaceOrderRequest:
    def __init__(self, user_id, product_id, quantity):
        self.user_id = user_id
        self.product_id = product_id
        self.quantity = quantity

class PlaceOrderUseCase:
    def __init__(self, order_repository: OrderRepository):
        self.order_repository = order_repository

    def execute(self, request: PlaceOrderRequest):
        # 1. Retrieve entities (simplified)
        # user = user_repository.find_by_id(request.user_id)
        # product = product_repository.find_by_id(request.product_id)
        # For demonstration, creating dummy entities:
        user = type('User', (object,), {'id': request.user_id})()
        product = Product("Sample Product", 100, 10)
        product.decrease_stock(request.quantity) # Business rule enforcement

        # 2. Create Order entity
        order = type('Order', (object,), {
            'order_id': str(uuid.uuid4()),
            'user_id': user.id,
            'product_id': product.id,
            'quantity': request.quantity,
            'total_price': product.price * request.quantity
        })()

        # 3. Persist order
        self.order_repository.save(order)

        print(f"Order placed successfully for user: {user.id}, product: {product.name}")
```
{{< /tab >}}
{{< tab "Java" >}}
```java
// Located in com.ecommerce.application.usecases
package com.ecommerce.application.usecases;

import com.ecommerce.application.ports.OrderRepository;
import com.ecommerce.domain.entities.Order;
import com.ecommerce.domain.entities.Product;
import com.ecommerce.domain.entities.User;

import java.math.BigDecimal; // Import for BigDecimal

// Input boundary
public interface PlaceOrderUseCase {
    void execute(PlaceOrderRequest request);
}

// Input model
public class PlaceOrderRequest {
    private String userId;
    private String productId;
    private int quantity;

    public PlaceOrderRequest(String userId, String productId, int quantity) {
        this.userId = userId;
        this.productId = productId;
        this.quantity = quantity;
    }

    public String getUserId() { return userId; }
    public String getProductId() { return productId; }
    public int getQuantity() { return quantity; }
}

// Use case implementation
public class PlaceOrderInteractor implements PlaceOrderUseCase {
    private final OrderRepository orderRepository;
    // Assuming we have product and user repositories for simplicity here

    public PlaceOrderInteractor(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public void execute(PlaceOrderRequest request) {
        // 1. Retrieve entities (simplified)
        User user = new User(request.getUserId()); // Assuming User entity is created
        Product product = new Product("Sample Product", BigDecimal.valueOf(100), 10); // From product repository
        product.decreaseStock(request.getQuantity()); // Business rule enforcement

        // 2. Create Order entity
        Order order = new Order(user.getId(), product.getId(), request.getQuantity(), product.getPrice());

        // 3. Persist order
        orderRepository.save(order);

        System.out.println("Order placed successfully for user: " + user.getId() + ", product: " + product.getName());
    }
}
```
{{< /tab >}}
{{< tab "JavaScript" >}}
```javascript
// Located in application/useCases/placeOrder.js
const Order = require('../../domain/entities/order'); // Assuming Order entity exists
const Product = require('../../domain/entities/product');

class PlaceOrderRequest {
    constructor(userId, productId, quantity) {
        this.userId = userId;
        this.productId = productId;
        this.quantity = quantity;
    }
}

class PlaceOrderUseCase {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }

    execute(request) {
        // 1. Retrieve entities (simplified)
        // const user = await userRepository.findById(request.userId);
        // const product = await productRepository.findById(request.productId);
        // For demonstration, creating dummy entities:
        const user = { id: request.userId };
        const product = new Product("Sample Product", 100, 10);
        product.decreaseStock(request.quantity); // Business rule enforcement

        // 2. Create Order entity
        const order = new Order(user.id, product.id, request.quantity, product.price);

        // 3. Persist order
        this.orderRepository.save(order);

        console.log(`Order placed successfully for user: ${user.id}, product: ${product.name}`);
    }
}

module.exports = { PlaceOrderRequest, PlaceOrderUseCase };
```
{{< /tab >}}

{{< /tabs >}}


#### Violations and Solutions:

##### Violation: 
The `PlaceOrderUseCase` directly imports `ExpressRequest` and `ExpressResponse` objects and handles HTTP request/response logic.

**Problem**: This couples the use case to a specific web framework, making it difficult to reuse the logic in other contexts (e.g., a CLI tool, a message queue consumer) or to test it without a full web server.

**Solution**: Use pure data structures (POJOs/POCOs) as input and output models for the use case. The web framework's controller (in the `Interface Adapters` layer) translates HTTP requests into these input models and then translates the use case's output into HTTP responses.

### 4. Interface Adapters (Glue Layer)

{{< notice "Principle" >}}
This layer converts data from the format most convenient for the use cases and entities, to the format most convenient for the external agents (DB, Web, UI, etc.). This includes Controllers, Presenters, and Gateways.
{{< /notice >}}

#### Architectural Perspective Example:

In a microservices architecture, an API Gateway acts as an interface adapter, translating external HTTP requests into internal service calls, and then translating service responses back into appropriate HTTP responses.

#### Design Perspective Example:
This layer contains:

* **Controllers**: Handle incoming requests (e.g., from a web framework) and invoke the appropriate use case.
* **Presenters**: Format data from the use case's output into a format suitable for the UI (e.g., JSON for a REST API, ViewModel for a GUI).
* **Gateways**: Implement the interfaces defined by the `Application Business Rules` (e.g., `OrderRepository` implementation using JPA or a REST client).

#### Examples in code

{{< tabs >}}
{{< tab "Python" >}}
```python
# Located in ecommerce/interface_adapters/web/controllers.py
from flask import Blueprint, request, jsonify
from ecommerce.application.use_cases.place_order import PlaceOrderRequest, PlaceOrderUseCase
from ecommerce.infrastructure.data.sqlalchemy_order_repository import SQLAlchemyOrderRepository

order_bp = Blueprint('orders', __name__)

# This is typically done via dependency injection framework in a larger app
order_repository = SQLAlchemyOrderRepository()
place_order_use_case = PlaceOrderUseCase(order_repository)

@order_bp.route('/orders', methods=['POST'])
def place_order():
    data = request.get_json()
    try:
        # Translate JSON to Use Case Request
        request_obj = PlaceOrderRequest(
            user_id=data['userId'],
            product_id=data['productId'],
            quantity=data['quantity']
        )
        place_order_use_case.execute(request_obj)
        return jsonify({"message": "Order placed successfully!"}), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
```
{{< /tab >}}
{{< tab "Java" >}}
```java
// Located in com.ecommerce.interfaceadapters.web
package com.ecommerce.interfaceadapters.web;

import com.ecommerce.application.usecases.PlaceOrderRequest;
import com.ecommerce.application.usecases.PlaceOrderUseCase;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orders")
public class OrderController {
    private final PlaceOrderUseCase placeOrderUseCase;

    public OrderController(PlaceOrderUseCase placeOrderUseCase) {
        this.placeOrderUseCase = placeOrderUseCase;
    }

    @PostMapping
    public ResponseEntity<String> placeOrder(@RequestBody OrderRequestDto requestDto) {
        try {
            // Translate DTO to Use Case Request
            PlaceOrderRequest request = new PlaceOrderRequest(
                requestDto.getUserId(),
                requestDto.getProductId(),
                requestDto.getQuantity()
            );
            placeOrderUseCase.execute(request);
            return ResponseEntity.ok("Order placed successfully!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("An error occurred: " + e.getMessage());
        }
    }
}

// DTO for incoming request (specific to web layer)
class OrderRequestDto {
    private String userId;
    private String productId;
    private int quantity;

    // Getters and Setters
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getProductId() { return productId; }
    public void setProductId(String productId) { this.productId = productId; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
}

// In a real app, you'd also have presenters for output DTOs
````
{{< /tab >}}
{{< tab "JavaScript" >}}
```javascript
// Located in interfaceAdapters/web/controllers/orderController.js
const express = require('express');
const router = express.Router();
const { PlaceOrderRequest, PlaceOrderUseCase } = require('../../../application/useCases/placeOrder');
const MongoOrderRepository = require('../../../infrastructure/data/mongoOrderRepository');

// In a real app, this would be dependency injected
const orderRepository = new MongoOrderRepository();
const placeOrderUseCase = new PlaceOrderUseCase(orderRepository);

router.post('/orders', (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        // Translate request body to Use Case Request
        const request = new PlaceOrderRequest(userId, productId, quantity);
        placeOrderUseCase.execute(request);
        res.status(200).json({ message: 'Order placed successfully!' });
    } catch (error) {
        if (error.message.includes('Insufficient stock')) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: `An error occurred: ${error.message}` });
        }
    }
});

module.exports = router;
```
{{< /tab >}}

{{< /tabs >}}


#### Violations and Solutions:

**Violation**: A Controller directly calls a database repository or performs business logic.

**Problem**: This bypasses the use case layer, making the system less testable, harder to maintain, and violating the separation of concerns. The controller becomes bloated and responsible for too much.

**Solution**: The Controller should only be responsible for parsing requests, calling the appropriate UseCase, and formatting responses. All business logic and data persistence calls should be delegated to the UseCase and Repository layers respectively.


### 5. Frameworks and Drivers (The Lowest-Level Details)

{{< notice "Principle" >}}
These are the outermost layer. They are implementation details and should not dictate the structure of the inner layers. This layer comprises things like web frameworks (Spring Boot, Flask, Express), ORMs (JPA, SQLAlchemy, Mongoose), and database systems (MySQL, PostgreSQL, MongoDB).
{{< /notice >}}


#### Architectural Perspective Example:
The decision to use PostgreSQL versus Oracle, or React versus Angular for the UI, should be easily swappable without affecting the core business logic.

#### Design Perspective Example:
This layer contains the concrete implementations of the interfaces defined in the `Interface Adapters` layer (e.g., `JpaOrderRepository`, `MongoOrderRepository`).

#### Examples in code

{{< tabs >}}
{{< tab "Python" >}}
```python
# Located in ecommerce/infrastructure/data/database_setup.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Database connection details (should be from config)
DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Example SQLAlchemy model (specific to the database/ORM)
from sqlalchemy import Column, String, Integer, Float

class OrderModel(Base):
    __tablename__ = "orders"
    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, index=True)
    product_id = Column(String, index=True)
    quantity = Column(Integer)
    total_price = Column(Float)
```
{{< /tab >}}
{{< tab "Java" >}}
```java
// Located in com.ecommerce.infrastructure.config
package com.ecommerce.infrastructure.config;

import com.ecommerce.application.ports.OrderRepository;
import com.ecommerce.infrastructure.data.JpaOrderRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

// This would be Spring Boot configuration
@Configuration
public class InfrastructureConfig {

    @Bean
    public OrderRepository orderRepository() {
        return new JpaOrderRepository(); // In a real app, this would interact with Spring Data JPA
    }
}
```
{{< /tab >}}
{{< tab "JavaScript" >}}
```javascript
// Located in infrastructure/data/mongoDb.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/ecommerce_db', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

const OrderSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

const OrderModel = mongoose.model('Order', OrderSchema);

module.exports = { connectDB, OrderModel };
```
{{< /tab >}}

{{< /tabs >}}



#### Violations and Solutions:

**Violation**: Business logic directly depends on a specific ORM's EntityManager or Session.

**Problem**: This tightly couples the business logic to the ORM, making it difficult to change persistence technologies.

**Solution**: The business logic (use cases) should depend on abstract repository interfaces defined in the `Application Business Rules` layer. The `Frameworks and Databases` layer provides concrete implementations of these repositories using the chosen ORM.


---

## Opinions on Clean Architecture

### Robert C. Martin ("Uncle Bob")

**Robert C. Martin** is the primary advocate and popularizer of Clean Architecture. His core message is about creating systems that are:

* **Independent of Frameworks:** The system should not be bound by the limitations or quirks of a specific framework. If the framework disappears tomorrow, your business rules should still be intact.
* **Testable:** Business rules can be tested without the UI, database, web server, or any other external element.
* **Independent of UI:** The UI can change easily without changing the rest of the system. A web UI can be replaced with a console UI, or a mobile UI.
* **Independent of Database:** You can swap out your database (e.g., SQL to NoSQL) without affecting your core business logic.
* **Independent of any External Agency:** Your business rules don't know anything about the outside world.

He often emphasizes that the **Dependency Rule** is the single most important rule: "Source code dependencies must only point inwards, toward higher-level policies." He argues that architectural decisions should focus on deferring decisions about "details" (databases, web frameworks, UI) as long as possible, ensuring the core business logic remains pristine and protected.

### Grady Booch

While **Grady Booch** is most famous for his pioneering work in Object-Oriented Analysis and Design and the Unified Modeling Language (UML), his principles align well with the spirit of Clean Architecture. Booch's emphasis on:

* **Abstraction:** Identifying and separating essential characteristics from non-essential details. Clean Architecture does this by abstracting away infrastructure concerns from business logic.
* **Encapsulation:** Hiding internal details and providing a clear interface. This is evident in how entities encapsulate business rules and use cases encapsulate application logic.
* **Modularity:** Breaking down a system into independent, cohesive modules. Clean Architecture's layered structure promotes clear modules with well-defined responsibilities.
* **Hierarchy:** Organizing abstractions into hierarchies. The concentric circles of Clean Architecture represent a hierarchy of policies, with higher-level policies at the center.

Booch would likely appreciate Clean Architecture's focus on building robust, maintainable systems through strong separation of concerns and clear architectural boundaries, which are central tenets of good object-oriented design.

### Martin Fowler

**Martin Fowler**, a renowned author and speaker on software development, is a strong proponent of architectural patterns that promote maintainability and testability. While he doesn't explicitly *invent* Clean Architecture, his work on patterns like "Ports and Adapters" (Hexagonal Architecture) and "Dependency Injection" are foundational to its implementation.

Fowler's perspective often highlights:

* **The importance of architectural patterns:** He sees patterns as reusable solutions to common problems, and Clean Architecture is a powerful pattern for organizing complex systems.
* **Testability as a first-class concern:** He champions designs that are inherently easy to test, which is a major benefit of Clean Architecture due to its isolation of business logic.
* **Evolutionary Design:** Systems should be designed to evolve over time, and Clean Architecture's flexibility allows for easier adaptation to changing requirements.
* **Sacred Business Logic:** Like Uncle Bob, Fowler would agree that the core business logic is the most valuable part of the system and should be protected from external volatility.

Fowler would likely view Clean Architecture as a sophisticated and effective application of well-established design principles to achieve highly maintainable and flexible software. He might emphasize the practical trade-offs involved in implementing it, acknowledging that while it offers significant benefits, it also introduces a certain level of boilerplate or upfront design effort.

## Book and Paper References

### Books:

* **Clean Architecture: A Craftsman's Guide to Software Structure and Design** by Robert C. Martin (2017)
    * This is the definitive book on Clean Architecture, providing a comprehensive explanation of its principles, history, and practical applications. It's a must-read for anyone serious about understanding and implementing Clean Architecture.
* **Domain-Driven Design: Tackling Complexity in the Heart of Software** by Eric Evans (2003)
    * While not directly about Clean Architecture, DDD's emphasis on building a rich domain model and separating domain logic from infrastructure concerns is highly complementary to Clean Architecture. Understanding DDD helps in designing better Entities and Use Cases.
* **Patterns of Enterprise Application Architecture** by Martin Fowler (2002)
    * This book covers a wide range of architectural patterns, including "Layering," "Dependency Injection," and "Data Mapper," which are all relevant to implementing Clean Architecture effectively.
* **The Pragmatic Programmer: Your Journey To Mastery** by David Thomas and Andrew Hunt (1999)
    * This classic book covers many fundamental software development principles, including "Don't Repeat Yourself (DRY)" and "Orthogonality," which align with Clean Architecture's goals of maintainable and flexible code.

### Papers and Articles:

* **The Clean Architecture** by Robert C. Martin (Blog Post, 2012)
    * This seminal blog post introduced the concept of Clean Architecture to a wider audience and laid the groundwork for his book. It's a concise overview of the core ideas.
    * [Link to blog post (search "The Clean Architecture Robert C. Martin" to find the official blog)]
* **Hexagonal Architecture (Ports and Adapters)** by Alistair Cockburn (2005)
    * This paper introduced the concept of Ports and Adapters, which is a significant precursor and a core component of Clean Architecture's Interface Adapters layer.
    * [Link to Alistair Cockburn's website (search "Hexagonal Architecture Alistair Cockburn" to find it)]
* **Onion Architecture** by Jeffrey Palermo (Blog Post, 2008)
    * This blog post introduced Onion Architecture, another influential architectural style that emphasizes concentric layers and the dependency rule.
    * [Link to blog post (search "Onion Architecture Jeffrey Palermo" to find it)]

By studying these resources, developers can gain a deeper understanding of the principles and practices that form the bedrock of Clean Architecture and how to apply them effectively in their projects.
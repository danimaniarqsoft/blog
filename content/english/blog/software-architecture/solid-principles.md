---
title: "SOLID Principles in Software Architecture"
meta_title: "SOLID Principles"
description: "SOLID Principles"
date: 2025-01-12T23:41:02-06:00
image: "/images/posts/software-architecture/image.png"
categories: ["Software architecture"]
author: "Daniel Pichardo"
tags: ["software-design"]
draft: false
---

In the field of software architecture and engineering, the SOLID principles provide a foundational framework for creating robust, scalable, and maintainable systems. These principles help reduce coupling, improve cohesion, and make codebases easier to test and evolve.

SOLID is an acronym that represents five core principles:

* **S**: Single Responsibility Principle (SRP)
* **O**: Open/Closed Principle (OCP)
* **L**: Liskov Substitution Principle (LSP)
* **I**: Interface Segregation Principle (ISP)
* **D**: Dependency Inversion Principle (DIP)

These principles are especially useful in Object-Oriented Programming (OOP) but also influence functional and architectural paradigms.

## History

The SOLID principles were popularized by **Robert C. Martin (Uncle Bob)** in the early 2000s as a response to the growing complexity and fragility of software systems. Uncle Bob's insights stemmed from decades of experience in software development, and he sought to distill essential guidelines that would help developers manage and reduce complexity.

The origin of each SOLID principle predates the acronym itself:

* **Single Responsibility Principle (SRP)** was influenced by the concepts of cohesion and modularity first introduced by **Tom DeMarco** and **Larry Constantine** in structured design. Uncle Bob formalized SRP in the context of object-oriented design, emphasizing that every class should have one, and only one, reason to change.

* **Open/Closed Principle (OCP)** was introduced by **Bertrand Meyer** in 1988. In his book "Object-Oriented Software Construction," Meyer stated that software entities (classes, modules, functions, etc.) should be open for extension but closed for modification. Uncle Bob expanded upon this by advocating for the use of abstractions and interfaces to allow behavior to be extended without altering existing code.

* **Liskov Substitution Principle (LSP)** was introduced by **Barbara Liskov** in a 1987 conference keynote and further formalized in a 1994 paper with Jeannette Wing. LSP states that objects of a superclass should be replaceable with objects of its subclasses without altering the correctness of the program. Uncle Bob included it in SOLID to emphasize the importance of correct inheritance.

* **Interface Segregation Principle (ISP)** was introduced by Uncle Bob himself. It suggests that no client should be forced to depend on methods it does not use. This principle evolved from observing the issues caused by fat interfaces in large systems and the challenges they pose in decoupling and testing.

* **Dependency Inversion Principle (DIP)** was also introduced by Uncle Bob and emphasizes the decoupling of high-level modules from low-level modules through the use of abstractions. It is a cornerstone of modern dependency injection techniques and inversion of control containers.

The term "SOLID" as an acronym was coined by **Michael Feathers** as a mnemonic to remember the five principles.

These principles were extensively documented and promoted in Robert C. Martin’s seminal books, blog posts, and conference talks, eventually forming a core part of his broader Clean Architecture philosophy.

These principles were consolidated into the acronym SOLID to make them more teachable and memorable.

## 1. Single Responsibility Principle (SRP)

**Definition**: A class or module should have only one reason to change.

### Architecture Perspective

* **Good**: Microservices where each service handles a single business capability.
* **Bad**: A monolithic user service that manages login, user data, logging, and notification.

### Design Perspective

* **Good**: A controller class only handling HTTP input, delegating logic to services.
* **Bad**: A class that reads input, processes logic, and logs output.

### Violation Example

* Combining authentication and database persistence logic in the same class.

{{< tabs >}}
{{< tab "Python" >}}
### Python Example

```python
class UserManager:
    def save_user(self, user):
        # Save to DB
        pass
    def send_email(self, user):
        # Send email
        pass
```

{{< /tab >}}
{{< tab "Java" >}}
### Java Example

```java
class UserService {
    public void saveUser(User user) { /* DB logic */ }
    public void sendEmail(User user) { /* Email logic */ }
}
```

{{< /tab >}}
{{< tab "JavaScript" >}}
### JavaScript Example

```javascript
class UserService {
    saveUser(user) {
        // Save to database
    }
    sendEmail(user) {
        // Send email
    }
}
```
{{< /tab >}}

{{< /tabs >}}

### Limitations & Best Practices

* Avoid micro-over-segmentation.
* Focus on logical responsibility rather than physical separation.

## 2. Open/Closed Principle (OCP)

**Definition**: Software entities should be open for extension, but closed for modification.

### Architecture Perspective

* **Good**: Using plug-in architectures or service registries.
* **Bad**: Modifying a service's core logic every time a new feature is added.

### Design Perspective

* **Good**: Strategy pattern for extensible behaviors.
* **Bad**: Huge if/else or switch-case statements.

### Violation Example

* Adding more conditions to a report generator class for every new report type.

{{< tabs >}}
{{< tab "Python" >}}
### Python Example

```python
class Report:
    def generate(self): pass

class PDFReport(Report):
    def generate(self): pass
```

{{< /tab >}}
{{< tab "Java" >}}
### Java Example

```java
interface Report {
    void generate();
}
class PDFReport implements Report {
    public void generate() {}
}
class ExcelReport implements Report {
    public void generate() {}
}
```

{{< /tab >}}
{{< tab "JavaScript" >}}
### JavaScript Example

```javascript
class Report {
    generate() {}
}
class PDFReport extends Report {
    generate() {}
}
```
{{< /tab >}}

{{< /tabs >}}



### Limitations & Best Practices

* Ensure abstractions are stable before extension.
* Prefer composition over inheritance.

## 3. Liskov Substitution Principle (LSP)

**Definition**: Objects of a superclass should be replaceable with objects of a subclass without breaking the application.

### Architecture Perspective

* **Good**: Using polymorphic APIs that accept behavior-based contracts.
* **Bad**: Subtypes that throw exceptions on inherited behavior.

### Design Perspective

* **Good**: Derived classes that truly extend base behavior.
* **Bad**: Overriding methods to do nothing or violate invariants.

### Violation Example

* Subclass that disables behavior from its superclass.


{{< tabs >}}
{{< tab "Python" >}}
### Python Example

```python
class Bird:
    def fly(self): pass

class Ostrich(Bird):
    def fly(self): raise Exception("Can't fly")
```

{{< /tab >}}
{{< tab "Java" >}}
### Java Example

```java
class Bird {
    void fly() {}
}
class Ostrich extends Bird {
    void fly() { throw new UnsupportedOperationException(); }
}
```

{{< /tab >}}
{{< tab "JavaScript" >}}

### JavaScript Example

```javascript
class Bird {
    fly() {}
}
class Ostrich extends Bird {
    fly() { throw new Error("Can't fly"); }
}
```
{{< /tab >}}

{{< /tabs >}}


### Limitations & Best Practices

* Favor interface segregation to avoid inappropriate inheritance.
* Use behavior-driven inheritance.

## 4. Interface Segregation Principle (ISP)

**Definition**: No client should be forced to depend on methods it does not use.

### Architecture Perspective

* **Good**: Fine-grained microservice APIs.
* **Bad**: Fat service interfaces serving multiple domains.

### Design Perspective

* **Good**: Multiple small, cohesive interfaces.
* **Bad**: One interface doing everything.

### Violation Example

* Interface with multiple unrelated responsibilities.

{{< tabs >}}
{{< tab "Python" >}}
### Python Example

```python
class Worker:
    def code(self): pass
    def test(self): pass
    def deploy(self): pass
```

{{< /tab >}}
{{< tab "Java" >}}

### Java Example

```java
interface Worker {
    void code();
    void test();
    void deploy();
}
```

{{< /tab >}}
{{< tab "JavaScript" >}}
### JavaScript Example

```javascript
class Worker {
    code() {}
    test() {}
    deploy() {}
}
```
{{< /tab >}}

{{< /tabs >}}

### Limitations & Best Practices

* Avoid too many interfaces causing fragmentation.
* Use role-based interfaces.

## 5. Dependency Inversion Principle (DIP)

**Definition**: High-level modules should not depend on low-level modules. Both should depend on abstractions.

### Architecture Perspective

* **Good**: Domain layer depends on interfaces, not implementations.
* **Bad**: UI module directly instantiates and manages database connections.

### Design Perspective

* **Good**: Constructor injection, interface-based design.
* **Bad**: Concrete class dependencies.

### Violation Example

* High-level class creating its own dependencies.

{{< tabs >}}
{{< tab "Python" >}}
### Python Example

```python
class EmailService:
    def send(self, msg): pass

class UserService:
    def __init__(self):
        self.email = EmailService()
```
{{< /tab >}}
{{< tab "Java" >}}
### Java Example

```java
class EmailService {
    void send(String msg) {}
}
class UserService {
    EmailService email = new EmailService();
}
```
{{< /tab >}}
{{< tab "JavaScript" >}}
### JavaScript Example

```javascript
class EmailService {
    send(msg) {}
}
class UserService {
    constructor() {
        this.email = new EmailService();
    }
}
```
{{< /tab >}}

{{< /tabs >}}

### Limitations & Best Practices

* Don’t overuse dependency injection.
* Use DI containers with care.

## Expert Opinions

* **Robert C. Martin**: Advocates SOLID as the basis for Clean Architecture, promoting boundary and dependency inversion layers.
* **Martin Fowler**: Emphasizes simplicity and pragmatic use of patterns; warns against premature abstraction.
* **Grady Booch**: Considers SOLID vital but believes in contextual architectural trade-offs rather than rigid application.

## Clean Architecture Alignment

* SRP aligns with clean boundaries between components.
* OCP supports adding use cases without rewriting core logic.
* LSP ensures interchangeable use of boundary interfaces.
* ISP leads to well-defined interfaces for each layer.
* DIP is foundational to Clean Architecture’s direction of dependencies.

## References

* Martin, Robert C. *Clean Architecture: A Craftsman's Guide to Software Structure and Design*. Prentice Hall, 2017.
* Martin, Robert C. *Agile Software Development, Principles, Patterns, and Practices*. Prentice Hall, 2002.
* Fowler, Martin. *Refactoring: Improving the Design of Existing Code*. Addison-Wesley, 2018.
* Booch, Grady. *Object-Oriented Analysis and Design with Applications*. Addison-Wesley, 2007.
* Liskov, Barbara, and Jeannette Wing. "A Behavioral Notion of Subtyping." *ACM Transactions on Programming Languages and Systems*, 1994.


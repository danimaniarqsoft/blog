---
title: "Use Case Diagram"
meta_title: "Use Case Diagram"
description: "this is meta description"
date: 2025-10-10T16:19:39-06:00
image: "/images/posts/software-architecture/uml/image.png"
categories: ["Software architecture", "UML"]
author: "Daniel Pichardo"
tags: ["software-design", "uml"]
draft: true
---

## Use Case Diagram - Behavioral

### Introduction

The Use Case Diagram provides a high-level, external view of a system, capturing its functional requirements. It describes the interactions between external users (actors) and the system itself, illustrating the goals the actors achieve through these interactions (use cases).

### Purpose

The primary goal is to model the system's functionality from a user's perspective, defining and organizing the system's behavior without specifying implementation details. It serves as a crucial communication tool between stakeholders and developers to agree on the system's required capabilities.

### Key Elements

- **Actor**: Represents a user or another system that interacts with the subject system.    
- **Use Case**: A sequence of actions a system performs that yields an observable result of value to a particular actor.
- **System Boundary**: A rectangle that delineates the scope of the system being modeled.
- **Association**: A solid line connecting an actor to a use case, indicating participation.
- **Include Relationship**: A stereotype `<<include>>` indicating that a base use case's behavior incorporates another use case's behavior.
- **Extend Relationship**: A stereotype `<<extend>>` indicating that a use case adds optional behavior to a base use case.
### Extraction/Creation Guidelines

- **Source**: Primarily the Software Requirements Specification (SRS), specifically functional requirements, user stories, and business process descriptions.
    
#### Actor

- **Definition**: An entity external to the system that interacts with it. An actor can be a human user, a hardware device, or another software system.

- **How to identify it**: Look for nouns in the SRS that represent roles or external systems initiating or participating in a process. Ask: "Who or what will use this system?"

- **Best Practices**:
	- Name actors with singular, role-based nouns (e.g., "Librarian" not "Library Staff"). Focus on roles, not specific individuals. Represent external systems (e.g., "Payment Gateway") and devices as actors.

- **Examples**:
    
    - The **Customer** shall be able to browse the product catalog.
    - The **Administrator** must have the ability to manage user accounts.
    - The system shall retrieve shipping rates from the external **Courier API**.
    - The **Inventory Manager** shall update stock levels after a sale is processed.
    - The **Payment Gateway** will process all credit card transactions.

#### Use Case

- **Definition**: Represents a specific goal that an actor wants to achieve by using the system. It describes a set of interactions that lead to a valuable outcome.
    
- **How to identify it**: Identify verb phrases that describe the main functions or goals actors want to accomplish. The name should be an active verb phrase (e.g., "Withdraw Cash").
    
- **Best Practices**:
	- Ensure each use case provides an observable result of value to an actor. As advised by Martin Fowler, keep use cases at a consistent level of abstraction within a single diagram. Avoid implementation details.
    
- **Examples**:
    
    - The customer shall be able to **Search for a Book**.
    - The librarian must be able to **Register a New Member**.
    - The system shall **Generate a Sales Report**.
    - The member shall **Renew a Loaned Item**.
    - The system must **Process a Return**.
#### System Boundary

- **Definition**: A rectangle that visually encapsulates all the use cases of the system under development, defining what is internal versus external to the system.
    
- **How to identify it**: The boundary is determined by the scope defined in the SRS. All identified use cases fall inside it; all actors fall outside it.
    
- **Best Practices**:
	- Always include a system boundary box and name it after the system being modeled (e.g., "Library Management System"). This explicitly defines the scope and prevents ambiguity.
    
- **Examples**:
    
    - The **Online Bookstore System** shall allow users to purchase books.
    - This document specifies the requirements for the **Hospital Appointment Scheduler**.
    - The scope of the **Course Registration Portal** includes enrolling students in courses.
    - All functionalities described pertain to the **ATM System**.
    - The **Inventory Control Application** is responsible for tracking stock.

#### Association

- **Definition**: A line indicating a communication path between an actor and a use case.
    
- **How to identify it**: An association exists if an actor directly participates in a use case, either by initiating it or receiving information from it.
    
- **Best Practices**:
	- Use a simple solid line without arrowheads for actor-use case associations, as the direction of initiation is generally implicit. Only model significant interactions.
    
- **Examples**:
    
    - The **Student** can **View Grades**.
    - The **Professor** shall **Submit Final Grades**.
    - The **Bank Clerk** is responsible for **Opening a New Account**.
    - The **System Auditor** will **Review Transaction Logs**.
    - Both the **Manager** and the **Employee** can **Submit a Timesheet**.

#### Include Relationship (`<<include>>`)

- **Definition**: A dependency relationship where one use case (the base) explicitly incorporates the behavior of another use case (the included). The included use case is mandatory.
    
- **How to identify it**: Look for functional steps that are repeated across multiple use cases. If a piece of functionality is _always_ required as part of another use case's flow, it is a candidate for `<<include>>`.
    
- **Best Practices**:
	- Use `<<include>>` to avoid duplicating descriptions of common, mandatory behavior. Martin Fowler cautions against overusing this to prevent functional decomposition.
    
- **Examples**:
    
    - The use cases for **Withdraw Cash** and **Check Balance** shall both require the user to **Authenticate with PIN**.
    - To **Finalize a Purchase**, the system must first **Validate Credit Card Details**.
    - Before a user can **Post a Comment**, the system must **Verify User Login Status**.
    - Both **Creating an Order** and **Updating an Order** must perform a **Stock Level Check**.
    - **Booking a Flight** and **Reserving a Hotel** require the user to **Select Payment Method**.

#### Extend Relationship (`<<extend>>`)

- **Definition**: A relationship where one use case (the extending) adds optional behavior to another use case (the base) at a defined extension point, under certain conditions.
    
- **How to identify it**: Look for optional or conditional system behavior that occurs only under specific circumstances within a more general use case.
    
- **Best Practices**:
	- Use `<<extend>>` to model optional or exceptional flows. The base use case must be complete and meaningful on its own. Avoid overuse, as this logic is often better captured in textual descriptions.
    
- **Examples**:
    
    - During the **Register for Course** use case, if the course is full, the student shall be offered the option to **Add to Waitlist**.
    - When a customer proceeds to **Checkout**, they may optionally choose to **Apply a Discount Code**.
    - The **Place Order** use case may be extended with **Add Gift Wrapping** if the user selects this option.
    - While performing a **Bank Transfer**, if the amount is over a certain limit, the system shall trigger the **Request Manager Approval** flow.
    - When searching for a flight, the user can **Filter by Airline**, extending the primary **Search for Flights** use case.
  
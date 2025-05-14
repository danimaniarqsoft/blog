---
title: "Json Web Token"
meta_title: "meta title"
description: "this is meta description"
date: 2025-02-18T04:14:54-08:00
image: "/images/image-placeholder.png"
categories: ["Security"]
author: "Daniel Pichardo"
tags: ["jwt"]
draft: false
---

A **JSON Web Token (JWT)** is an open standard [RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519) for securely transmitting information between parties as a **JSON object**. This information can be verified and trusted because it is digitally signed.

JWTs are commonly used for **authentication and authorization** in web applications, APIs, and distributed systems.

---

## 🔧 Structure of a JWT

A JWT is a string composed of **three parts**, separated by dots (`.`):

```shell
xxxxx.yyyyy.zzzzz
```

Each part is:

1. **Header** – contains metadata, typically the type of token and signing algorithm.
2. **Payload** – contains the actual claims (data).
3. **Signature** – used to verify that the sender of the JWT is who it says it is and to ensure that the message wasn’t changed.

### Example:

```text
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

---

## 🧩 JWT Components Explained

### 1. Header

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

- `alg`: Signing algorithm (e.g., HS256, RS256)
- `typ`: Type of token (usually JWT)

### 2. Payload

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}
```

- `sub`: Subject of the token (usually user ID)
- `name`: Arbitrary data (e.g., user name)
- `iat`: Issued at time

Can also include:
- `exp` (expiration time)
- `nbf` (not before)
- `iss` (issuer)
- `aud` (audience)

### 3. Signature

```text
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret)
```

This ensures the token hasn’t been tampered with.

---

## 🚀 How JWTs Work in Authentication

1. **User logs in** with credentials.
2. **Server generates a JWT** with a secret key and sends it to the client.
3. **Client stores** the JWT (e.g., in localStorage).
4. **Client includes** the JWT in the Authorization header of each request:

```http
Authorization: Bearer <your_jwt_token>
```

5. **Server verifies** the token using the secret/public key.

---

## 🧪 Example Use Case

### Login Flow:

```plaintext
Client → POST /login → Server
Server → Generate JWT → Send to Client
Client → GET /dashboard (with JWT) → Server
Server → Verify JWT → Send Protected Data
```

---

## 🛠 Common Use Cases

- **Authentication** (Stateless session management)
- **Authorization** (Role-based access control)
- **API security** (Protecting endpoints)
- **Single Sign-On (SSO)**

---

## 📚 References

- [RFC 7519 - JWT Specification](https://datatracker.ietf.org/doc/html/rfc7519)
- [JWT.io Debugger & Docs](https://jwt.io/)
- [Auth0 Guide on JWTs](https://auth0.com/learn/json-web-tokens/)

---

## ⚠️ Security Best Practices

- Never store JWTs in localStorage if XSS is a concern—prefer `HttpOnly` cookies.
- Use **short expiration times** and refresh tokens.
- Validate **issuer**, **audience**, and **signature**.
- Rotate signing keys periodically.

---

## ✅ Summary

JWTs are powerful for stateless authentication and authorization. When used properly, they improve scalability and performance. But with power comes responsibility—be mindful of best practices to ensure secure implementations.

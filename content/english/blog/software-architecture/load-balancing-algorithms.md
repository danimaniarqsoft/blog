---
title: "Load Balancing Algorithms: A Comprehensive Guide"
meta_title: "Load Balancing Algorithms"
description: "Load Balancing Algorithms"
date: 2025-06-18T17:00:49-06:00
image: "/images/posts/software-architecture/system-design/load-balancing/image.png"
categories: ["Software architecture"]
author: "Daniel Pichardo"
tags: ["software-design"]
draft: true
---

Load balancing is a crucial technique in distributed systems and network architecture, designed to enhance the availability, reliability, and scalability of services. It involves distributing incoming network or application traffic across multiple servers to ensure that no single server becomes a bottleneck or point of failure. By intelligently routing requests, load balancing helps optimize resource use, maximize throughput, minimize response time, and avoid overload on any single server.

Load balancers can be hardware-based or software-based, and they support various strategies and algorithms for distributing traffic. These algorithms determine how traffic is split among the servers based on factors like connection counts, server capacity, client IP, or response time.

In this article, we explore several popular load balancing algorithms, detailing how they work, when to use them, their benefits and drawbacks, tools available for implementation, and examples using NGINX.

Load balancing is a technique to distribute network or application traffic across multiple servers to ensure reliability, availability, and scalability. Below are several widely used load balancing algorithms, along with a detailed breakdown of each.

---
## Static vs. Dynamic Load Balancing

Load balancing algorithms can generally be categorized into two types: **static** and **dynamic**.

- **Static Load Balancing**: These algorithms make decisions based on predefined rules or configurations without considering the current state of the system. They are simple to implement but may lead to inefficiencies under fluctuating loads.

- **Dynamic Load Balancing**: These algorithms adapt their decisions based on real-time information about server load, connection counts, response times, or other runtime metrics. They are more complex but offer better performance in variable environments.

Below is a classification of the load balancing algorithms discussed in this article:

| Algorithm               | Type     |
|------------------------|----------|
| Round Robin            | Static   |
| Sticky Round Robin     | Static   |
| Weighted Round Robin   | Static   |
| IP Hash                | Static   |
| Least Connections      | Dynamic  |
| Least Response Time    | Dynamic  |

---

## Round Robin

{{< image src="images/posts/software-architecture/system-design/load-balancing/round-robin.png" caption="" alt="" height="" width="" position="center" command="fill" option="q100" class="img-fluid" title=""  webp="false" >}}
### How It Works
1. Maintain a list of available servers.
2. Direct each new request to the next server in the list.
3. After the last server, start again from the top.

### When to Use
- Suitable when all servers have roughly the same processing power and resource capacity.
- Ideal for stateless applications and uniform workloads.

### Benefits
- Simple to implement.
- Provides fair distribution of requests.
- Requires minimal computational overhead.

### Disadvantages
- Ignores the server's load and current performance.
- May overload a slower or already busy server.

### Tools Used for Implementation
- NGINX
- HAProxy
- Apache HTTP Server

### Example with NGINX
```nginx
http {
    upstream backend {
        server backend1.example.com;
        server backend2.example.com;
        server backend3.example.com;
    }

    server {
        location / {
            proxy_pass http://backend;
        }
    }
}
```

### Additional Resources
- [NGINX Docs on Load Balancing](https://docs.nginx.com/nginx/admin-guide/load-balancing/http-load-balancer/)
- [HAProxy Configuration Manual](https://www.haproxy.org/)

### References
- Cardellini, V., Colajanni, M., & Yu, P. S. (1999). *Dynamic load balancing on web-server systems*. IEEE Internet Computing.

---

## Sticky Round Robin

{{< image src="images/posts/software-architecture/system-design/load-balancing/sticky-round-robin.png" caption="" alt="" height="" width="" position="center" command="fill" option="q100" class="img-fluid" title=""  webp="false" >}}

### How It Works
1. Assign a client to a specific server based on the first request (using a session or cookie mechanism).
2. Continue routing that client's future requests to the same server.
3. Rotate new client sessions across available servers in round-robin fashion.

### When to Use
- When session persistence is needed for applications that store session state locally on the server.
- Suitable for applications without distributed session management.

### Benefits
- Simple to implement with cookie-based affinity.
- Combines session persistence with basic load distribution.

### Drawbacks
- Susceptible to uneven distribution if some clients have heavier workloads.
- Difficult to rebalance sessions without disrupting client experience.

### Tools Used for Implementation
- NGINX
- HAProxy
- Apache mod_proxy_balancer

### Example with NGINX
```nginx
http {
    upstream backend {
        server backend1.example.com;
        server backend2.example.com;
    }

    server {
        location / {
            proxy_pass http://backend;
            proxy_cookie_path / "/; HttpOnly; Secure; Path=/;";
            proxy_set_header Cookie $http_cookie;
        }
    }
}
```

### Additional Resources
- [NGINX Session Affinity Guide](https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/#session-persistence)
- [HAProxy Manual: Stick Tables](https://www.haproxy.org/download/)

### Scientific References
- Hunt, G. C., & Scott, M. L. (1999). *The Coign automatic distributed partitioning system*. USENIX Symposium on Operating Systems Design and Implementation.

---

## Weighted Round Robin

{{< image src="images/posts/software-architecture/system-design/load-balancing/weight-round-robin.png" caption="" alt="" height="" width="" position="center" command="fill" option="q100" class="img-fluid" title=""  webp="false" >}}

### How It Works
1. Assign a weight to each server based on its capacity.
2. Schedule requests in proportion to weights.

### When to Use
- Suitable when servers have different hardware capabilities.
- Useful when some servers should handle more traffic.

### Benefits
- Efficient use of resources.
- More fair distribution based on performance.

### Disadvantages
- Requires accurate and updated server capacity data.
- More complex than basic Round Robin.

### Tools Used for Implementation
- NGINX
- HAProxy

### Example with NGINX
```nginx
upstream backend {
    server backend1.example.com weight=3;
    server backend2.example.com weight=1;
}
```

### Additional Resources
- [NGINX Upstream Module](https://nginx.org/en/docs/http/ngx_http_upstream_module.html)

### References
- Eager, D. L., Lazowska, E. D., & Zahorjan, J. (1986). *Adaptive load sharing in homogeneous distributed systems*. IEEE Transactions on Software Engineering.

---

## IP Hash

{{< image src="images/posts/software-architecture/system-design/load-balancing/ip-hash.png" caption="" alt="" height="" width="" position="center" command="fill" option="q100" class="img-fluid" title=""  webp="false" >}}

### How It Works
1. Hash the client's IP address.
2. Use the result to determine which server handles the request.

### When to Use
- Useful when session persistence is needed.
- Ensures that requests from the same IP go to the same server.

### Benefits
- Provides basic session affinity without cookies.
- Simple hash functions can be efficient.

### Disadvantages
- Doesn’t handle server failures well.
- Can lead to uneven distribution if many clients share an IP.

### Tools Used for Implementation
- NGINX
- Apache mod_proxy_balancer

### Example with NGINX
```nginx
upstream backend {
    ip_hash;
    server backend1.example.com;
    server backend2.example.com;
}
```

### Additional Resources
- [NGINX Session Persistence Guide](https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/#session-persistence)

### References
- Vvedenskaya, N. D., Dobrushin, R. L., & Karpelevich, F. I. (1996). *Queueing system with selection of the shortest of two queues: An asymptotic approach*. Problems of Information Transmission.

---
## Least Connections

{{< image src="images/posts/software-architecture/system-design/load-balancing/least-connection.png" caption="" alt="" height="" width="" position="center" command="fill" option="q100" class="img-fluid" title=""  webp="false" >}}
### How It Works
1. Monitor the number of active connections per server.
2. Send the next request to the server with the fewest connections.

### When to Use
- Best for long-lived sessions or connections.
- Suitable for applications with varying workloads.

### Benefits
- Balances load based on server activity.
- Prevents overloading any single server.

### Disadvantages
- Slightly more complex to implement.
- Requires real-time tracking of server connections.

### Tools Used for Implementation
- NGINX Plus
- HAProxy

### Example with NGINX Plus
```nginx
upstream backend {
    least_conn;
    server backend1.example.com;
    server backend2.example.com;
    server backend3.example.com;
}
```

### Additional Resources
- [NGINX Load Balancing Techniques](https://www.nginx.com/blog/load-balancing-techniques/)

### References
- Mitzenmacher, M. (2001). *The power of two choices in randomized load balancing*. IEEE Transactions on Parallel and Distributed Systems.

---

## Least Response Time

{{< image src="images/posts/software-architecture/system-design/load-balancing/least-response-time.png" caption="" alt="" height="" width="" position="center" command="fill" option="q100" class="img-fluid" title=""  webp="false" >}}
### How It Works
1. Monitor average response time of each server.
2. Forward requests to the server with the lowest average response time.

### When to Use
- Ideal for applications with fluctuating response times.
- Works well when response speed is critical.

### Benefits
- Dynamically adapts to real-time performance.
- Optimizes user experience.

### Disadvantages
- Requires ongoing monitoring and analysis.
- Implementation can be complex.

### Tools Used for Implementation
- NGINX Plus
- Commercial load balancers (e.g., F5, Citrix ADC)

### Example with NGINX (requires NGINX Plus)
```nginx
upstream backend {
    least_time header;
    server backend1.example.com;
    server backend2.example.com;
}
```

### Additional Resources
- [NGINX Plus Dynamic Configuration](https://www.nginx.com/products/nginx/)

### References
- Aron, M., Druschel, P., & Zwaenepoel, W. (2000). *Efficient support for P-HTTP in cluster-based web servers*. USENIX Annual Technical Conference.

---

## Conclusion

Choosing the right load balancing algorithm depends on your application's architecture, performance requirements, and the nature of your workloads. This guide provided a breakdown of key algorithms with examples and practical tools for implementation.

---

## General References
- Thomas A. Limoncelli, et al. *The Practice of System and Network Administration*
- [RFC 2391 - Load Sharing Using IP Network Address Translation (NAT)](https://tools.ietf.org/html/rfc2391)
- [NGINX Load Balancing Documentation](https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/)
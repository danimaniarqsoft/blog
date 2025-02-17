+++
date = '2025-02-17T17:34:51-06:00'
draft = false
title = 'Java best practices'
+++

1. Consider static factory methods instead of constructors


* One advantage of static factory methods is that, unlike constructors, they have names. 
* A second advantage of static factory methods is that, unlike constructors,
they are not required to create a new object each time they’re invoked
* A third advantage of static factory methods is that, unlike constructors,
they can return an object of any subtype of their return type.
* A fourth advantage of static factories is that the class of the returned
object can vary from call to call as a function of the input parameters. 
* A fifth advantage of static factories is that the class of the returned object
need not exist when the class containing the method is written
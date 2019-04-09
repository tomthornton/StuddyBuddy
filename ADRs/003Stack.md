# Stack

Angular/Firebase

## Status

Accepted

## Context

Meteor turned out to be more difficult to work with than expected.

We realized that Google's Firebase was much more suitable to our needs because it has
more features than meteor and is easy to use with Angular.

## Decision

We will be using Angular for the client and Firebase for the development platform.

## Benefits

Great tooling for setting up an application.
Includes built-in authentication.
Real-time data from Firestore.
Storage for course files in the application.
Angular's firebase module (AngularFirev2) makes things simple.
Easy deployment.

## Consequences

Complicated observable and dependency-injection patterns in Angular.
NoSQL is unopinionated, making it difficult to structure and fetch data quickly.

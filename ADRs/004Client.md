# Client

Angular

## Status

Accepted

## Context

Angular is one of the most popular JS frameworks in the world. It is a fully-fledged framework (not just a rendering library unlike React/Vue). It is opinionated about routing, data-fetching, and much more. Angular's services feature a dependency-injection pattern which serves as a go-between in unrelated components. It is based around a reactive programming paradigm, using RXJS to create streams of data to components.

## Decision

Angular will be our client framework.

## Benefits

Reactive programming in RXJS allows for manipulation of streams of data
Opinionated routing
Connects well with Firebase
Easy to set-up development environment

## Consequences

RXJS is difficult to comprehend, and even harder to master.
No HMR (Hot Module Replacement)
Large build size

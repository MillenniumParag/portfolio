---
layout: layouts/project.njk
title: "Spring Boot & React Full-Stack Management Portal"
description: "Responsive full-stack web application with role-based JWT authentication, RESTful APIs, Spring Data JPA, and PostgreSQL persistence on NeonDB."
category: "Full Stack"
year: "2026"
featured: true
tags:
  - project
techStack:
  - "Java"
  - "Spring Boot"
  - "React"
  - "PostgreSQL"
  - "Tailwind CSS"
demoUrl: "https://github.com/MillenniumParag"
githubUrl: "https://github.com/MillenniumParag"
image: "/uploads/project-spring-react.webp"
---

## Overview

A modern full-stack web portal demonstrating production-ready application architecture. Built with a Java Spring Boot backend adhering to layered controller-service-repository patterns, paired with a React single-page application frontend styled with Tailwind CSS.

## Key Features

- **Security & Authorization**: Stateless JWT authentication with refresh token rotation and Spring Security filter chains.
- **Data Persistence**: Object-relational mapping via Spring Data JPA and Hibernate connecting to a hosted serverless PostgreSQL instance on NeonDB.
- **Reactive UI State**: React custom hooks managing API queries, loading skeletons, error boundaries, and optimistic UI updates.

## Engineering Takeaways

- Clear separation of backend business domains and contract-first REST endpoints.
- Managing database migrations and connection pooling efficiently in cloud environments.

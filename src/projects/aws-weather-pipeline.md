---
layout: layouts/project.njk
title: "AWS CI/CD Weather Application Pipeline"
description: "Automated continuous integration and delivery pipeline deploying containerized weather service workloads across AWS cloud infrastructure with automated test gates."
category: "Cloud & DevOps"
year: "2025"
featured: true
tags:
  - project
techStack:
  - "AWS"
  - "CI/CD"
  - "Docker"
  - "GitHub Actions"
  - "Python"
demoUrl: "https://github.com/MillenniumParag"
githubUrl: "https://github.com/MillenniumParag"
image: "/uploads/project-aws-pipeline.webp"
---

## Overview

Developed as a capstone project during the **AWS Academy Graduate — Cloud Foundations** internship at Techno Billion AI, this project demonstrates end-to-end cloud infrastructure automation, container packaging, and continuous integration/continuous delivery (CI/CD) pipelines.

The core service queries external meteorological APIs, caches real-time metrics, and serves formatted weather advisories through an authenticated endpoint.

## Key Architecture & Highlights

- **Automated Delivery Pipeline**: Configured GitHub Actions workflows that automatically lint, test, build container images, and deploy upon merge into the primary release branch.
- **Cloud Foundations**: Mastered foundational AWS cloud concepts including compute (EC2), scalable storage (S3), networking, and Identity & Access Management (IAM) security policies.
- **Fail-Safe Rollbacks**: Integrated automated health probe verification to guard against broken deployments.

## What I Learned

1. Structuring declarative build pipelines with clear separation between build, test, and release stages.
2. Managing environment variables, API secrets, and cloud credentials safely.
3. Optimizing container images for minimal footprint and fast startup times.

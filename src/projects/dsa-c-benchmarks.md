---
layout: layouts/project.njk
title: "High-Performance Data Structures & Algorithms in C"
description: "Benchmarked implementations of balanced search trees, graph traversal algorithms, hash maps with collision resolution, and custom dynamic memory allocators."
category: "Systems"
year: "2025"
featured: false
tags:
  - project
techStack:
  - "C"
  - "GCC"
  - "Data Structures"
  - "Algorithms"
  - "Valgrind"
demoUrl: "https://github.com/MillenniumParag"
githubUrl: "https://github.com/MillenniumParag"
image: "/uploads/project-dsa-c.webp"
---

## Overview

A comprehensive collection of core computer science data structures and algorithmic implementations written in pure C from first principles, developed across the BCA Honours coursework at Techno India (Hooghly Campus).

Focusing on memory safety, zero-leak allocations, and cache-friendly contiguous layouts, each structure was benchmarked with high iteration volumes.

## Included Implementations

- **Self-Balancing Trees**: AVL Tree with LL, RR, LR, and RL rotation logic, and Red-Black tree insertion color-fixing.
- **Graph Algorithms**: Dijkstra's Shortest Path, Prim's and Kruskal's Minimum Spanning Tree (MST) with Disjoint Set Union (DSU).
- **Custom Memory Allocator**: A pool-based chunk allocator demonstrating how to avoid fragmentation from frequent `malloc` and `free` operations.

## Key Learnings

1. Using **Valgrind** to trace and eradicate dangling pointers, double frees, and memory leaks.
2. Understanding hardware cache hierarchy and the computational advantage of array-backed heaps over fragmented linked nodes.

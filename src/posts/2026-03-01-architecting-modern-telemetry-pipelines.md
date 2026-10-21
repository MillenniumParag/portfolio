---
layout: layouts/post.njk
title: "Building Sub-Second Telemetry Pipelines: Lessons from a Systems Project"
date: 2026-03-01T10:00:00.000Z
author: Parag Chatterjee
description: Architectural insights and practical lessons from benchmarking a high-throughput telemetry pipeline with Go, Protobuf, Kafka, and ClickHouse.
tags:
  - post
  - systems
  - golang
  - architecture
image: /uploads/banner-telemetry.png
featured: true
---

Processing real-time operational telemetry across distributed services is one of the most exciting systems engineering challenges I explored during university. When experimenting with simulated high-load spikes, I wanted to understand how to achieve instant analytical visibility without lag.

## The Bottleneck of Traditional Log Aggregation

In many architectures, logs and metrics are dumped as raw JSON strings into document stores. While flexible, this pattern quickly breaks down under heavy traffic:

1. **Storage Bloat**: Repeating key names across millions of records multiplies storage overhead.
2. **Slow Scans**: Querying unindexed timestamps or arbitrary metadata requires expensive full table scans.
3. **High Resource Contention**: Complex analytical aggregations degrade primary database throughput.

## Our Architectural Solution

To achieve sub-second analytical querying across millions of benchmark records, I architected the pipeline into a streaming columnar system:

```text
[Edge Agents] ──(Protobuf/gRPC)──> [Go Ingest Service] ──> [Kafka Topic] ──> [ClickHouse Engine]
```

### 1. Protobuf over JSON

By defining a strict Protobuf schema for all metric payloads, we eliminated runtime parsing overhead and reduced payload size over the wire by **58%**.

### 2. Batch Buffering in Go

Rather than writing each incoming record immediately to storage, our Go ingestion workers buffer metrics into 10,000-record batches or 500ms intervals before pushing to Kafka.

### 3. ClickHouse Columnar Compression

ClickHouse stores data column by column with native ZSTD compression. Queries computing 99th percentile latencies across millions of rows execute in less than **250ms**.

## Key Takeaways

- Schema enforcement at the edge saves massive compute costs downstream.
- Columnar analytical stores outperform document databases by orders of magnitude for time-series metrics.
- Asynchronous batching is essential to withstand sudden ingestion traffic spikes.

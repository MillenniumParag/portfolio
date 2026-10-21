---
layout: layouts/post.njk
title: "Git-Driven Content: Mastering Decap CMS on Netlify"
date: 2026-03-15T15:00:00.000Z
author: Parag Chatterjee
description: How to build a modern editorial workflow with Decap CMS, Netlify Identity, Git Gateway, and local offline backend testing.
tags:
  - post
  - jamstack
  - decapcms
  - netlify
image: /uploads/banner-decap-cms.png
---

Headless CMS architectures often require costly monthly subscriptions and complex database backends. For developer portfolios, blogs, and marketing sites, **Decap CMS** (formerly Netlify CMS) provides a powerful alternative: storing content as plain Markdown files directly in your Git repository.

## How Decap CMS Works with Git Gateway

When deploying with Netlify, authentication and commits are orchestrated seamlessly:

1. **Netlify Identity**: Manages authenticated logins with optional GitHub, Google, or email invitations.
2. **Git Gateway**: An authenticated bridge that uses an authorized GitHub API token to commit Markdown files and media uploads on behalf of logged-in editors.
3. **Continuous Deployment**: Netlify listens to commits on `main` and automatically rebuilds the static site in seconds.

## Offline Local Development

One of the greatest features is the ability to run Decap CMS locally without committing to Git:

```bash
npm run dev:cms
```

This starts the local `decap-server` proxy alongside Eleventy, letting you write, edit, and test content locally right at `http://localhost:8080/admin/`.

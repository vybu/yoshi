---
id: welcome
title: Welcome
sidebar_label: Welcome
---

## What is Yoshi?

:wave: Hey everybody and welcome to the Yoshi Universe!

Yoshi is a tool that lets you generate a new project out of a template, and then provide you with a toolkit that keeps updating your build infrastructure as you update its versions.

Its purpose is to speed up your development, provide you with cool developer experience features, and make sure infrastructure problems are being solved once in a single place.

---

## Yoshi Development Flows

Yoshi started as a simple toolkit to build a generic application in Wix. After understanding that we can't provide really good developer experience without fitting it to the type of the application being built, We've decided to split Yoshi into multiple Flows!

Each flow should be tailor-made, have zero boilerplate, and minimal configuration. While all use the same engine under the hood, each flow is a different toolkit, can have different CLI commands and different configuration options.

While we strive for all flows the feel the same, we understand that in order to provide the best experience, we have to keep them flexible enough to make even fundamental changes.

### [App Flow](app-flow.md)

> Also known as `projectType: "app"`

This is a generic flow to create Fullstack/Client applications.

### [Library Flow](library-flow.md)

This is a generic flow to create Client libraries.

### Editor Flow

This flow is specific to building Editor-Platform-Apps and Out-Of-iFrame Apps.

### Business Manager Flow

This flow is specific to building Business-Manager-Modules.

### Monorepo Flow

An experimental flow to support monorepos, currently used by the big platforms: Editor-X, Thunderbolt & Editor Elements.

### [Legacy Flow](legacy-flow.md)

> Also known as `yoshi`

This is how we refer to the old flowless yoshi nowadays, it can be configured in many ways and it's generally better to use a different, specific flow.

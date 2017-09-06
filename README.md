# notifR
Mobile Client for notifR-Project.

This is a very simple App implemented with Ionic2.

It was part of an MVP with evaluation of Microservices Architecture in modern Ecosystems.

![notifR App](https://www.ir-tech.ch/wp-content/uploads/2017/05/notifR_Screenshot_mobile_App_Splash_Logo-550x367.png "notifR App")

Introduction & Vision
=====================
We from notifR personally have a lot of interest and therefore apps which notify us about things.
Added together we have a lot of apps which do that, from apps of our favorite sport club which inform us about points scored and other related news to simple stuff like a weather app which tells us to take an umbrella with us in the morning.
As we find it cumbersome to have to deal with that many apps which we most of the time not fully use, but unwilling to give up those handy notification, we decided to do somethings about it.

Meet **notifR** a simple and easy way to get notified about pretty much anything.

Why use a bunch of different apps to get news for various things, when you can get all of them in a single place.
notifR subscribes to various sources of information for you, to be able to deliver whatever you want.
As we grow more and more sources of information will be on boarded and therefore more and more information to subscribe to will be available to you, our customers.

In the beginning we will concentrate on the following topics:

* Football (respectively soccer for our American friends)
    Stay informed about when your favorite club plays and get match events as well as events.
* Bands
    Where and when is your favorite band going to play? Want to get notified when they are in your area?
* TV
    You're a thriller Junky? Want to get informed whenever one is on the telly? Wan't to know whenever your favorite movie is aired? No problem.
* Weather
    Get informed about stuff like: sudden temperature drop, how is the weather going to be today in your area

Is there anything you're missing?
Use our [contact form](http://shit-doesnt-exist-yo.com) to hit us up and tell us what you'd like to see added in the future.

Main features
=============

notifR will read from various sources of information or use API's to be able to provide the information directly to the end user. We hope to free our customers from the cluster of apps they use today.

One of the biggest challenge we have is that there is a flood of information in the internet. There are a lot of ways this information is represented and we won't be able to get around to adapt to them. This will also be a problem that we face. We need to standardize all the information we read to a very simplistic interface, since we want to handle all kind of information.

First architecture
================== 

## Overall architecture
![notifR System Architecture](https://www.ir-tech.ch/wp-content/uploads/2017/05/notifR_Architecture_Oberview@2x-662x1024.png "notifR System Architecture")

We use a microservice architecture. This allows the microservices, the so called connectors, to be independent from each other, not only from a functionality perspective, but also from a technology point of view. The only thing the microservices need to have in common is a message interface, to communicate with the backend.

The communication between the business logic and the microservices happens over PubNub. The backend informs the microservices about the subscriptions the corrsponding microservice has to respond to. And the microservice simply sends the message for a subscription whenever something is found to notify the end user about.

The subscriptions are registered via the mobile app frontend, from there it is send to the business logic, which persists the information in a Mongo DB database.

The notification to the user happens using OneSignal. Whenever the business logic receives something from a microservice to notify the user about, it will forward it to OneSignal to perform the actual push notification to the end user.

Technologies 
============

As shown above we try to build our application as a cloud native application with very loose dependencies.
But we also want to prove that despite the various technologies we can bundle the project into one well working application.

Container
---------

We use small container to run every service needed by our application.
Using these container, especially docker containers in our case, allows us to run nearly every technology on one platform running [docker](https://www.docker.com/).

Mongo DB
--------

[Mongo DB](https://www.mongodb.com/) is a simple but scalable [NoSQL](https://www.mongodb.com/nosql-explained) database which is compatible with docker.

Aerospike
---------

[Aerospike](http://www.aerospike.com/) is a high speed, scalable and reliable NoSQL database optimized for real-time applications. We use it mainly as a key value store for temporary session data. It is not supposed to persist data due to its characteristic of running in memory only.

PHP
---

[PHP (Hypertext Preprocessor)](http://php.net/) is a widespread open-source script language in web technologies.
Our backend is written in PHP.

Angular 2
---------

[Angular 2](https://angular.io/) is a widespread mobile & desktop framework to create cross platform UI.
We use it together with Typescript, which is a script language which compiles to Javascript in the end, with respect to Javascripts best practices.

Go
--

[Go](https://golang.org/) (often referred to as golang) is a free and open-source programming language created at Google in 2007 by Robert Griesemer, Rob Pike, and Ken Thompson. It is a compiled, statically typed language in the tradition of Algol and C, with garbage collection, limited structural typing, memory safety features and CSP-style concurrent programming features added.

We use it to build at lease one of our microservices.

Java
----

[Java](https://www.java.com/en/) is a general-purpose computer programming language that is concurrent, class-based, object-oriented, and specifically designed to have as few implementation dependencies as possible. It is intended to let application developers "write once, run anywhere" (WORA), meaning that compiled Java code can run on all platforms that support Java without the need for recompilation.

We use it to build at lease one of our microservices.

NodeJS
------

[Node.js](https://nodejs.org/en/) is an open-source, cross-platform JavaScript runtime environment for developing a diverse variety of server tools and applications. Although Node.js is not a JavaScript framework, many of its basic modules are written in JavaScript, and developers can write new modules in JavaScript. The runtime environment interprets JavaScript using Google's V8 JavaScript engine.

Node.js has an event-driven architecture capable of asynchronous I/O. These design choices aim to optimize throughput and scalability in Web applications with many input/output operations, as well as for real-time Web applications (e.g., real-time communication programs and browser games).

We use it to build at lease one of our microservices.

Javascript
----------

[Javascript](https://www.javascript.com/) is a high-level, dynamic, untyped, and interpreted programming language. Alongside HTML and CSS, Javascript is one of the three core technologies of World Wide Web content production. The majority of websites employ it, and all modern Web browsers support it without the need for plug-ins. JavaScript is prototype-based with first-class functions, making it a multi-paradigm language, supporting object-oriented, imperative, and functional programming styles.

A lot of our technologies are based on or compile to Javascript, like NodeJS or Typescript.

PubNub
------

[PubNub](https://www.pubnub.com/) is a realtime publish/subscribe messaging API built on the companies global data stream network which is made up of a replicated network of at least 14 data centers located in North America, South America, Europe, and Asia. The network currently serves over 300 million devices and streams more than 750 billion messages per month.
PubNub offers a [wide variety of SDKs](https://www.pubnub.com/docs#all-sdks-home) to implement their API in pretty much any language which is used.

We use PubNub to communicate between our microservices and our business logic.

Definition of Done
==================

* All acceptance features taken from the stories are fulfilled
* The project is build, deployed and tested locally
* Code is committed and pushed to git repository
* The project is built by an automation tool
* [Coding guidelines](https://google.github.io/styleguide/) are adhered
* All FIXME and TODOS resolved
* No warnings at build and start time
* DB is up to date
* Using informative error messages
* Changes in change log and git reported
* Dependencies checked and adjusted
* Unit tests are up to date and all pass
* Additional rest request are documented and tested
* Positive and negative tests for all important methods and classes


Retrospective
==================

# Sprint 1

- Dates for decisions in Log
- Burndownchart visible
- Acceptance features for userstories
- only show what works (app)
- test coverage (unit test are essential)

# Sprint 2

- Calculate velocity for every Sprint (last: 80)
- improve acceptance features, create tests for acceptance criterias, positive/negative 
- improve collaboration, note what is decided, communication!
- fix dates for standup meetings (Monday at school, Thursday in whatsapp, Saturday at school, except eastern)
- feedback loops in team (pairprogramming, code review)
- code review (prepare for the next time, will be checked by coach)
- test review (together)

# Sprint 3

- available on android?
- Burndown charts on paper
- Issues on Bitbucket
- Releases for all projects
- GUI-Testing
- refactor code (max amount of lines per method: 30)
- coding guidelines/lint
- testing from frontend to backend and back
- additional features instead of more services (more informations for push notification)

# Installation #
Alle Notifr Microservices laufen in Docker Container. Um diese starten zu können benötigst du Docker und docker-compose. Wenn diese Tools noch nicht auf dem System laufen müssen diese noch installiert werden. Nutze dazu die offizielle Docker [Dokumentation](https://www.docker.com/).

Wenn dein Docker Daemon und docker-compose einwandfrei funktionieren, bist du bereit für die Installation. Jeder Docker Container im Notifr Projekt kann auf einem separaten Docker Host laufen.

## Notifr Backend ##
#### checkout projekt ####
```bash
git clone https://bitbucket.org/notifr/notifr.project.git
```
#### set Env ####
Du kannst zwischen "prod" and "test" wählen. Dies Variable wird nur zu Markierung des Containers genutzt
```bash
export ENV=test
```
#### create data dir####
```bash
sudo mkdir -p /opt/monogodb-$ENV/data
sudo chown docker /opt/monogodb-$ENV/data
```
Hinweis: Der User "docker", ist der User der privilegiert ist den Docker Daemon zu starten
#### run docker-compose ####
```bash
docker-compose up -d
```

## Microservices ##

### Microservice Football ###
#### checkout projekt ####
```bash
git clone https://bitbucket.org/notifr/microservice.football.git
```
#### set Env ####
Du kannst zwischen "prod" and "test" wählen. Dies Variable wird nur zu Markierung des Containers genutzt
```bash
export ENV=test
```
#### set Backen IP ####
```bash
export BACKEND_HOST=http://{BACKEND_IP}/
```
#### run docker-compose ####
```bash
docker-compose up -d
```

### Microservice Wetter ###
#### checkout projekt ####
```bash
git clone https://bitbucket.org/notifr/microservice.weather.git
```
#### set Env ####
Du kannst zwischen "prod" and "test" wählen. Dies Variable wird nur zu Markierung des Containers genutzt
```bash
export ENV=test
```
#### set Backen IP ####
```bash
export BACKEND-HOST={BACKEND_IP}
```
#### run docker-compose ####
```bash
docker-compose up -d
```

### Microservice Bands ###
#### checkout projekt ####
```bash
git clone https://bitbucket.org/notifr/microservice.bands.git
```
#### set Env ####
Du kannst zwischen "prod" and "test" wählen. Dies Variable wird nur zu Markierung des Containers genutzt
```bash
export ENV=test
```
#### set Backen IP ####
```bash
export BACKEND-HOST={BACKEND_IP}
```
#### create data and log dir####
```bash
sudo mkdir -p /opt/aerospike-$ENV/logs
sudo mkdir -p /opt/aerospike-$ENV/data
sudo chown docker /opt/aerospike-$ENV/logs
sudo chown docker /opt/aerospike-$ENV/data
```
Hinweis: Der User "docker", ist der User der privilegiert ist den Docker Daemon zu starten
#### run docker-compose ####
```bash
docker-compose up -d
```

### Microservice TV ###
#### checkout projekt ####
```bash
git clone https://bitbucket.org/notifr/microservice.tv.git
```
#### set Env ####
Du kannst zwischen "prod" and "test" wählen. Dies Variable wird nur zu Markierung des Containers genutzt
```bash
export ENV=test
```
#### set Backend IP ####
```bash
export BACKEND-HOST={BACKEND_IP}
```
#### create data and log dir####
```bash
sudo mkdir -p /opt/aerospike-tv-$ENV/logs
sudo mkdir -p /opt/aerospike-tv-$ENV/data
sudo chown docker /opt/aerospike-tv-$ENV/logs
sudo chown docker /opt/aerospike-tv-$ENV/data
```
Hinweis: Der User "docker", ist der User der privilegiert ist den Docker Daemon zu starten
#### run docker-compose ####
```bash
docker-compose up -d
```

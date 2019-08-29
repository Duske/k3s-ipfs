<!-- START TOP README -->
<h1 align="center">CSV Metadata Extractor Microservice</h1>

<div align="center">
  📡 📡 📡 📡 📡 
</div>
<div align="center">
  <strong>Extracts metadata from a csv file</strong>
</div>

<br />

<!-- END TOP README -->

<!-- START TABLE OF CONTENT -->
## Table of Contents
- [Table of Contents](#table-of-contents)
- [Motivation](#motivation)
- [Installation](#installation)
- [How to use?](#how-to-use)
- [API Reference](#api-reference)
  - [Web](#web)
  - [Kafka](#kafka)
- [License](#license)

<!-- END TABLE OF CONTENT -->

## Motivation
This service extracts the metadata from a csv file. A CSV file can be provided via a message in Kafka or directly with REST

## Installation
Please make sure to have Java and Node.js installed. Then run

```
$ npm i
```

## How to use? 
To start the service run

```
npm start
```

It starts a webserver at port 3000 and connects to kafka automatically by using the following env vars:

* profilingTopic (default = 'profiling.requests') - topic to retrieve requests from
* resultTopic (default = 'resource.mutations') - topic for the results
* kafkaHost (default = 'broker')
* kafkaPort (default = '9092')

## API Reference

### Web
Please use the `CSV Metadata Extractor.postman_collection.json` to inspect the REST API.

### Kafka
The service uses JSON-Schemas for (de-)serializing data from/to kafka. Please take a look in `/schemas`.

## License
Copyright © Fraunhofer ISST 2019
# Shroom Assist

A module for a farm management application. Allows an admin to create a task which modifies a database quantifying growing procedures. Admin translates task from a natural language description to a database modification and filter. This is acheived in the task creator through the addition of targets (a PUT or POST to growing proccess tables) and contstraints (filters data in task view). Also features a rough spreadsheet UI for displaying, sorting, selecting data and importing data to task viewer. I did some experimentation with generic structure allowing flexibility and the addition of growing process tables, this ended up lending some instability and security issues to the program but was a fun challenge. The concept of this module is to be integrated into a larger application where it could generate tasks as a template rathe than tasks directly, allowing for flexible automatic task generation and integrated data entry.

## Built With
* React.js
* React-redux
* React-saga
* React-router-dom
* Material-ui
* React-virtualized
* Moment.js
* Fast-sort
* Node.js
* Axios
* Express
* Passport
* Bcrypt
* Cooke-sessions
* PG
* PostgreSQL with postico

## Getting Started
Run things locally, in a development environment.

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [PostgreSQL client like Postico](https://eggerapps.at/postico/)
- [Nodemon](https://nodemon.io/)

### Installing

1. Download repo
2. Create database called 'feedback_form' and run queries in data.sql file
3. Install dependancies 
`npm install`
4. Start express server 
`npm run server`
5. Start react deployment server
`npm run client`
6. Navigate to http://localhost:3000/

## Screen Shot

Include one or two screen shots of your project here (optional). Remove if unused.

## Documentation

Link to a read-only version of your scope document or other relevant documentation here (optional). Remove if unused.

### Completed Features

High level list of items completed.

- [x] Feature a
- [x] Feature b

### Next Steps

Features that you would like to add at some point in the future.

- [ ] Feature c

## Deployment

Add additional notes about how to deploy this on a live system

## Authors

* Name of author(s)


## Acknowledgments

* Auth, server boilerplate, and basic clientside routing code provided by Prime Digital Academy

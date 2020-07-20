##Current-api

###Pre-requisites
- Node version >= 10
- MongoDb ( installed and running )

### DB setup
- Download the transactions.csv file from here: https://cdn.current.com/code-assignment/sample-data.zip
- Load this transaction.csv in DB named conduit as records colection
- npm run populateData (this step can take 3-4 hours)

### Installation
- git clone https://github.com/abab1/current-api.git
- npm i
- npm run build
- npm run serve

### For development
- npm run start ( This starts the server in watch mode)

### For testing
- npm run test

### Dependencies
- express -for managing routing
- babel - for transpiling the code to use async-await and other latest features still not available in node
- body-parser - middleware for parsing the request body
- jest - for writing and running unit tests
- node-fetch - for making http calls from node - used in calling places API
- uuid - for generating user and merchant IDs
- mongoose - provides an easy way to work with mongoDB
- ESLint - for code quality and finding bugs
- prettier - for code formatting

### Postman collection

### Public url for testing
- http://ec2-user@ec2-3-129-89-225.us-east-2.compute.amazonaws.com:3000

   
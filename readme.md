#NEM Server Boilerplate

##Node, Express, Mongoose Server.

Authors: Steve Belovarich

###Prequisites

* npm
* gulp
* mongodb database

###Installation

NOTE: If you do not have npm or gulp you will need to install them globally.

```brew install node```

```npm install --global gulp```


1. Clone the repo into a local folder
2. cd into project folder
3. run `npm install`


###Local Development Environment


Change the address of mongodb database in server.js. Currently defaults to localhost:27017.

line 19: server.js `mongoose.connect('mongodb://localhost:27017'); // connect to our database`



To start the express server, run `gulp dev`.

Changes to .js files will update the server and restart it.

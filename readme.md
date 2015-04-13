#Node Express Mongoose Server

##API Boilerplate v0.5


This repo is a boilerplate for creating new RESTful APIs with Node.js. Out of the box, the API offers user authentication by username and password. Some endpoints are protected and require user authentication. Create a new user, login, and begin making requests. Users are saved in MongoDB using Mongoose. Authorization is provided by Passport.

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


server.js depends on a configuration file not included in the repo.

Create config.js in the root folder and add the following content to the file.

```
var nemConfig = {
  origin: 'localhost',
  originPort: 4444,
  mongo: 'localhost,
  mongoPort: 27017,
  key: 'thesessionkey'
};


module.exports = nemConfig;

```

You can use config files like this to deploy the nem server to multiple environments.


To start the express server, run `gulp dev` or `node server` in the root folder.

Changes to .js files will update the server and restart it when using gulp.


Here is a simple [front end SPA example](https://github.com/steveblue/xhr-api-example) that uses XMLHttpRequest to login, logout and signup a User. 


###TODO

* Add user image and image handling example.
* Create better error reporting for login and signup.
* Create endpoints for resetting password.
* Integrate package for emailing notifications to Users.
* Integrate package for texting notifications to Users.
* Expand the Strategies used with passport to offer login with Facebook, Twitter, Github, and more.
* Update gulp tasks to build for multiple environments.

# Tech Blog
![Tech Blog](https://img.shields.io/github/languages/top/yooperjb/Tech_Blog) ![MIT](https://img.shields.io/badge/license-MIT-blue)

![Blog Screenshot](/public/assets/screenshot.jpg)

## Description
Tech Blog is proof of concept challenge project for UC Berkeley bootcamp. The requirement was to build a content management system (CMS) style blog where users can create, edit, and comment on technology blog posts. It follows a Model View Controller (MVC) paradigm architectural structure, using Handlebars.js as the templating language, Sequelize as the ORM, and the express-session npm package for authentication.

## Table of Contents
* [Installation Requirements](#install)
* [NPM Packages Used](#npm)
* [Application Usage](#usage)
* [Tests](#tests)
* [Questions](#questions)

## Preview
The blog is deployed on Heroku and can be veiwed [here](https://morning-coast-61041.herokuapp.com/).

## <a name=install></a>Installation Requirements


### <a name=npm></a>NPM Packages
* [mysql2](https://www.npmjs.com/package/mysql2) - MySQL Node.js client
* [dotenv](https://www.npmjs.com/package/dotenv) - loads environment variables
* [express](https://expressjs.com/) - web application framework
* [sequelize](https://www.npmjs.com/package/sequelize) - promise-based Node.js ORM
* [bcrypt](https://www.npmjs.com/package/bcrypt) - password hashing library
* [express-handlebars](https://www.npmjs.com/package/express-handlebars) - Handlebars view engine
* [express-session](https://www.npmjs.com/package/express-session) - express session library

***
## <a name=usage></a>Application Usage
The application can be cloned from github using:
```
git clone git@github.com:yooperjb/Tech_Blog.git
```
In order to properly connect the application with a MySQL databaase a .env file must be created and populated with the appropriate information including your database password:

```
DB_NAME='Tech_Blog_db'
DB_USER='root'
DB_PW='<your password>'
```
Once all of the dependencies are installed, the database can be built and seeded using the following commands. The first should be executed in the mysql CLI, and the second in node terminal. 
```
source db schema.sql
npm run seed
```
To run the application, from root use:
```
npm start
```
## Tests
No tests were completed yet for this application. 

## Questions
Any questions or feedback regarding this project can be sent directly to my [email](mailto:jason.barnes@humboldt.edu). This project and others can be found at my [Github page]('https://github.com/yooperjb').
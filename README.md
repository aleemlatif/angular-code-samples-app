######################################################
#      Aleem's web-client project guide      #
######################################################

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)

This document describes some of the conventions and configuration used in this project.

## Before You Begin

Following are some of the required dependencies for web-client based applications:

* AngularJS - (http://angularjs.org/) [other related learning resources: http://www.thinkster.io/, https://egghead.io/].
* Node.js - (http://nodejs.org/) and this [StackOverflow Thread](http://stackoverflow.com/questions/2353818/how-do-i-get-started-with-node-js).
* [Node.js](http://nodejs.org/)
* [Bower](http://bower.io/)
* [Grunt](http://gruntjs.com/)
* [SASS](http://sass-lang.com/)
* [Compass](http://compass-style.org/)

## Build & development

1.	Run `npm install`
2.	Run `bower install`
3.	Run `grunt build` for building the project
4.	Run `grunt serve` for preview

## Directory conventions

The src/app directory contains a subdirectory for
each main functionality, plus a few for common services or resources.

- 'bower-components' go into the `src/vendor` directory.
- all media assets go into `src/assets` folder into the their respective folder type.

## Testing

Jasmine unit tests are stored in a parallel directory structure under src/test. They are in a separate structure to
make it easier to report on code coverage.

Running `grunt test` will run the unit tests with karma.

## Karma configuration

You can run the Jasmine tests by running `grunt karma`. 

## Proxy configuration

Please change proxy settings in .bowerrc file in the root folder if your PC is using a proxy server to connect to the internet

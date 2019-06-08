# sakura-translation-frontend-example

## Front-end example with gulp

This is the example of using gulp for automated front-end development and build. The source folder contains html, 3rd party css and Javascript libraries, custom sass and Javascript, and images. 

## Third party Javascript & bootstrap

Here is the list of 3rd party JS & CSS libraries

### bootstrap

npm i bootstrap. Copy the files from node_modules/bootstrap/scss and pasted to src/sass/bootstrap. In this way, we can edit bootstrap sass files for customisation. Alternatively, move node_modules/bootstrap/dist/css into src/css folder and bundle them with custom sass.

Moved node_modules/bootstrap/bootstrap.min.js into /src/script folder

### JQuery & Popper.js

Moved node_modules/jquery.js and node_modules/dist/popper.js into /src/script folder.

### [jquery-sakura.js](https://github.com/timoschaefer/jQuery-Sakura)

Downloaded the whole folder from github and moved jquery-sakura.min.css to src/css folder and jquery-sakura.min.js to scripts/minified folder.

## Transpiling ES6 syntax to ES5

npm install --save-dev gulp-babel @babel/core @babel/preset-env @babel/polyfill


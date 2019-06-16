# sakura-translation-frontend-example

## Front-end Development Example

This is the example of Front end development by using HTML, CSS and JavaScript. It is not using any JavaScript framework like React or Angular. It includes all the technologies that are usually used in enterprise front end development for the classic HTML/CSS/Javascript approach.

- Gulp for build & local server hot loading.
- gulp-babel to transpiling ES6 syntax to ES5.
- Karma for JavaScript unit tests.
- HTML
- SASS
- jQuery
- JavaScript
- TypeScript

## (1) Approach to Styling

Installed Bootstrap 4 with npm i bootstrap. Copied & pasted all scss files into the style folder. Then customised Bootstrap when necessary as well as adding custom SASS code. All the files get compiled into a single main style file by gulp.

## (2) Approach to JavaScript

- Main Libray

  * Using jQuery.

- ES6 Syntax

  * The gulp-babel plugins enables us to write ES6 syntax and complies down to ES5. Plugins are selected individually (see prodJs gulp task where pulgins are piped individually). In this way, we can have better clarity on what we can write.

- Namespace

  * Instead of adding variables & functions to the global scope, I created sakura.public namespace. In this way, we do not need to pollute the global. I feel it's a better approach. On document ready, event handlers get initialized.

## (3) TypeScript

JS and TS can coexist in the same code base. The approach taken here is to first compile TS to JS into the source script folder and then use useref to uglify and concatenate all the js files together into a single bundle.

- Installation

  * Add TypeScript support to existing JavaScript only code base.
  ```
  npm i --save-dev typescript tslint

  # For Karma unit test, which uses webpack and ts-loader
  npm i --save-dev ts-loader karma-webpack

  # rollup plugin for gulp job
  npm i --save-dev rollup rollup-plugin-node-resolve rollup-plugin-typescript2 rollup-plugin-uglify
  ```

- Compilation

  * Using [rollup.js](https://rollupjs.org/guide/en/#gulp) instead of [gulp-typescript](https://www.npmjs.com/package/gulp-typescript). rollup.js has nicer features like tree-shaking and caching for faster compilation. It also has better Config options like adding extending namespace that work well with TypeScript.

- Namespece

  * Instead of adding variables & functions to the global scope, using sakura.validation namespace. Adding namespace to the custom sakura namespace which is used by JavaScript is done in the gulp compilation job when writing bundle. The child namespace is exported from TypeScript.


## (4) Approach to Unit Testing

Using [Karma](https://karma-runner.github.io/latest/index.html) for test runner and [Jasmine](https://jasmine.github.io/2.0/introduction.html) for framework.

Karma uses headless chrome broweser and I find emulating the UI behaviour nicer than other tools. It works well for both JS and TS as long as it's configured in karma.conf.js.

## (5) Petal Falling Effect

For Cherry blossom petal fall animation, I am using this fantastic javascript library!

- [jquery-sakura.js](https://github.com/timoschaefer/jQuery-Sakura)





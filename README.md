# angular2-base

A simple base project for Angular 2 apps, using Gulp to automate tasks and SystemJS to bundle the app.

Includes examples following the [official style guide](https://angular.io/docs/ts/latest/guide/style-guide.html) to create components, templates (inline and separate), and routes (using the latest router). Uses [Gulp](http://gulpjs.com/) to automate tasks and [systemjs-builder](https://github.com/systemjs/builder) to package files.

![Demo View](./docs/demo.png)

## Usage

Clone the repo to where you want to use it, then install the npm packages with `npm install`.

To generate the output directory `dist/` run the command `gulp`.

If you add more `@angular` packages, you will need to update the `system.config.js` file to include them in the bundle during the build process.

## Tests

Tests are in the `test` directory, with one already there as an example. To run the tests, use the command `gulp test`. This generates the JavaScript files, then runs the tests against them.

You can have the tests auto-run when tests or ts files change by running the `gulp watchtests` command.

## Production

For a production setup, uncomment the lines in `main.ts` to put Angular in production mode. Then, run the minification task to minify vendor files `gulp minify`.

## Auto-Refresh when Developing

You may run `gulp watch` in a stand-alone terminal to have the output automatically updated when you save changes.


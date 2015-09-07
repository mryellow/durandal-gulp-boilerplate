# durandal-gulp-boilerplate

Common Gulp tasks for Durandal development.

Based on [Aurelia seed project](https://github.com/aurelia/skeleton-navigation).

Staging:
![CircleCI staging status](https://circleci.com/gh/mryellow/durandal-gulp-boilerplate/tree/staging.svg?style=shield&circle-token=:circle-token)

Production:
![CircleCI production status](https://circleci.com/gh/mryellow/durandal-gulp-boilerplate/tree/production.svg?style=shield&circle-token=:circle-token)

## Usage

* `npm install`
* `gulp build-deps`
* `gulp watch`

## Commands

`gulp clean`
Delete files from `dist`.

`gulp clean-deps`
Delete bower dependencies, from `lib` and `dist/lib`.

`gulp clean-sass`
Delete processed CSS from `assets/style/dist`.

`gulp clean-e2e`
Delete processed tests from `test/e2e/dist`.

`gulp build`
Complete build including bower and Durandal.

`gulp build-bower-install`
Install bower dependencies.

`gulp build-bower`
Copy main files to `vendor` and `dist/vendor`.

`gulp build-deps`
Clean and reinstall bower dependencies. Room for other dependency managers.

`gulp build-system`
RequireJS optimise Durandal build.

`gulp build-html`
Copy html to `dist`.

`gulp build-assets`
Copy CSS, images and other assets, including vendor assets.

`gulp build-bootstrap-js`
Concat bootstrap components and copy to `vendor/`.

`gulp doc`
Generate YUIDocs.

`gulp cs`
JSCS code style.

`gulp lint`
JSHint linting.

`gulp test`
`gulp tdd`
Karma tests on `.` via PhantomJS.

`gulp e2e`
Protractor tests on `dist/` port 9001.

`gulp sass`
Preprocess `assets/style/main.scss` to css. Can process whole directory if needed.

`gulp serve`
`gulp serve-dist`
`gulp watch`

`gulp prepare-release`

## Configuration

`allowed: '{jpg,png,gif,css}'`  
Specify which asset types are copied.

`bootstrapjs: '{alert,button,collapse,dropdown,modal}'`  
Customise bootstrap javascript, leaving out unused components.

Also be aware most of bootstrap is disabled in `src/assets/style/bootstrap.scss`

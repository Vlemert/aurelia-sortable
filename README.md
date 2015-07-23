# aurelia-sortable
Wrapper for Sortable.js

## How to install this plugin?
1. In your project install the plugin via `jspm` with following command

  ```shell
jspm install aurelia-i18next=github:vlemert/aurelia-sortable
  ```
2. Make sure you use [manual bootstrapping](http://aurelia.io/docs#startup-and-configuration). In order to do so open your `index.html` and locate the element with the attribute aurelia-app. Change it to look like this:

  ```html
  <body aurelia-app="main">
  ...
  ```
3. Create (if you haven't already) a file `main.js` in your `src` folder with following content:

  ```javascript
  import {AureliaSortable} from 'aurelia-sortable';

  export function configure(aurelia) {
    aurelia.use
      .standardConfiguration()
      .developmentLogging()
      .plugin('aurelia-sortable');

    aurelia.start().then(a => a.setRoot());
  }
  ```
  
## How to use this plugin
TODO

# Urban Xplor Back office


# Installation utilities

```
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y build-essential


sudo apt-get install npm
sudo apt-get install ruby-dev

sudo npm install -g bower
sudo npm install -g grunt-cli
sudo gem install compass
```

# Urban BackOffice installation

```
cd urbanBackOffice
sudo npm install
bower install
grunt build
```

You should see "Done, without errors." in green.

### Usage

Run `grunt server` to run a local server that will serve a development version of the project.

Run `grunt test` to run the unit tests.

### View Angular

`yo angular:route user`

You should see
create app/views/user.html
create app/scripts/controllers/user.js
create test/spec/controllers/projects.js
Add route in app/scripts/app.js
Add script files in app/index.html

### Service Angular

`yo angular:service Projects`

You should see
create app/scripts/services/projects.js
create test/spec/services/projects.js

### Add dependenciy 

Bower: bower install --save -dev angular-bootstrap 
OR
* (exemple :angular-ui-tinymce)
* https://www.npmjs.org/package/angular-ui-tinymce


1. Add dependency to bower.json

```javascript
dependencies: {
		"angular-ui-tinymce": "latest"
	}
```
2. Then run

`bower install`

This will copy the ui-tinymce files into your components folder, along with its dependencies.

3. Load the script files in your application:

* <script src="bower_components/tinymce/tinymce.js"></script>
* <script src="bower_components/angular-ui-tinymce/src/tinymce.js"></script>

4. Add the tinymce module as a dependency to your application module (app.js):

```javascript
angular
  .module('sitejsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.tinymce'
  ])
```


### Adding a dependency : karma-jasmine

Because yeoman normally only uses node for build steps, all our dependencies will be dev dependencies. If we want to install a new local dev dependency (e.g. karma-jasmine) and save it to our package.json:

npm install --save-dev karma-jasmine

Note: If you are cloning a project created with Yeoman, you will need to manually install the dependencies:

bower install

You may need to run this occasionally after running git pull if members of your team add new dependencies.

bower install --save-dev karma-jasmine karma-chrome-launcher
karma start

in file karma.conf.js
autow


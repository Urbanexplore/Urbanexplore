'use strict';

/**
 * @ngdoc overview
 * @name urbanBackOfficeApp
 * @description
 * # urbanBackOfficeApp
 *
 * Main module of the application.
 */
angular
  .module('urbanBackOfficeApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.tinymce',
    'datatables',
    'leaflet-directive',
    'angularFileUpload',
    'ui.bootstrap',
    'nya.bootstrap.select',
    'rdf.ui',
    'isArray', 'nbOfMedia', 'isEmpty', 'isVideo',
    'config'
  ])


  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/user/:userId', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl'
      })
      .when('/medias', {
        templateUrl: 'views/medias.html',
        controller: 'MediasCtrl'
      })
      .when('/users', {
        templateUrl: 'views/users.html',
        controller: 'UsersCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
      })
      .when('/footer/:projectId', {
        templateUrl: 'views/footer.html',
        controller: 'FooterCtrl'
      })
      .when('/homePage', {
        templateUrl: 'views/homepage.html',
        controller: 'HomepageCtrl'
      })
      .when('/homePage/:projectId', {
        templateUrl: 'views/homepage.html',
        controller: 'HomepageCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/project/:projectId', {
        templateUrl: 'views/project.html',
        controller: 'ProjectCtrl'
      })
      .when('/projectroute/:projectId', {
        templateUrl: 'views/projectroute.html',
        controller: 'ProjectrouteCtrl'
      })
      .when('/projectroute/:projectId/step/:stepId', {
        templateUrl: 'views/projectroute.html',
        controller: 'ProjectrouteCtrl'
      })
      .when('/areaproject/:projectId', {
        templateUrl: 'views/areaproject.html',
        controller: 'AreaprojectCtrl'
      })

      .when('/search', {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl'
      })
      .when('/project/:projectId/step/:stepId', {
        templateUrl: 'views/step.html',
        controller: 'StepCtrl'
      })

      .when('/media/:mediaId', {
        templateUrl: 'views/media.html',
        controller: 'MediaCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'MediaCtrl'
      })
      .when('/cart/:cartId', {
        templateUrl: 'views/cart.html',
        controller: 'CartCtrl'
      })

      .when('/test',{
        templateUrl:'views/test.html',
        controller:'TestCtrl'
      })

      .when('/login',{
        templateUrl:'views/login.html',
        controller:'LoginCtrl'
      })

      .when('/projects',{
        templateUrl:'views/projects.html',
        controller:'ProjectsCtrl'
      })


      .when('/stepViewIpad/:projectId/step/:stepId', {
        templateUrl: 'views/stepviewipad.html',
        controller: 'StepviewipadCtrl'
      })
      .when('/projects2', {
        templateUrl: 'views/projects2.html',
        controller: 'Projects2Ctrl'
      })
      .when('/file', {
        templateUrl: 'views/file.html',
        controller: 'FileCtrl'
      })
      .otherwise({
        redirectTo: '/login'
      });

  })

  .run(function($http,urlStanbol){

      //NOTE : the cryptoJs lib is not still maintained.
      //Migrate to : https://github.com/digitalbazaar/forge
      //set the login password
//      function getAuthorization(log,mp){
//          var bytes = CryptoJS.enc.Utf8.parse(log + ":" + mp);
//          var pw = "Basic " + CryptoJS.enc.Base64.stringify(bytes);
//          return pw;
//      }
//
//
//
      function setAuth(){
          var log = "admin";
          var mp="admin";
          //for $http related queries
          $http.defaults.headers.common['Authorization'] = urlStanbol.pwd;//getAuthorization(log,mp);

      }

      setAuth();


  })

   .directive('match', [function () {
  return {
    require: 'ngModel',
    link: function (scope, elem, attrs, ctrl) {

      scope.$watch('[' + attrs.ngModel + ', ' + attrs.match + ']', function(value){
        ctrl.$setValidity('match', value[0] === value[1] );
      }, true);

    }
  }
}])
    .directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}])

  .directive('ngThumb', ['$window', function($window) {
        var helper = {
            support: !!($window.FileReader && $window.CanvasRenderingContext2D),
            isFile: function(item) {
                return angular.isObject(item) && item instanceof $window.File;
            },
            isImage: function(file) {
                var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        };

        return {
            restrict: 'A',
            template: '<canvas/>',
            link: function(scope, element, attributes) {
                if (!helper.support) return;

                var params = scope.$eval(attributes.ngThumb);

                if (!helper.isFile(params.file)) return;
                if (!helper.isImage(params.file)) return;

                var canvas = element.find('canvas');
                var reader = new FileReader();

                reader.onload = onLoadFile;
                reader.readAsDataURL(params.file);

                function onLoadFile(event) {
                    var img = new Image();
                    img.onload = onLoadImage;
                    img.src = event.target.result;
                }

                function onLoadImage() {
                    var width = params.width || this.width / this.height * params.height;
                    var height = params.height || this.height / this.width * params.width;
                    canvas.attr({ width: width, height: height });
                    canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
                }
            }
        };
    }])

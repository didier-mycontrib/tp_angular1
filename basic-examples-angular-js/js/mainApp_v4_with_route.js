var myAjsApp = angular.module('myAjsApp', [ 'ngRoute','myAjsControllers']);

// app module 'myAjsApp' depends on  [ 'ngRoute','myAjsControllers']  other modules

myAjsApp.config(['$routeProvider',
  function($routeProvider) {
      $routeProvider.
	when('/products', {
		templateUrl: 'partials/product_list_view.html',
		controller: 'ProductListCtrl'
	}).
	when('/products/:prodId', {
		templateUrl: 'partials/product_details_view.html',
		controller: 'ProductDetailCtrl'
	}).
	otherwise({
		redirectTo: '/products'
	});
   }]);

// when local relative url '/products' ,  '/products/:prodId' (in web browser) will be
// interpreted by Angular-js and ngRoute module (with $route and $routeParams services) ,
// partial template will be loaded in <div ng-view> and specific controller will be associated

 
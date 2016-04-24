var myAjsApp = angular.module('myAjsApp', []);
 
myAjsApp.controller('ProductListCtrl', function ($scope,$http) {

 $http.get('data/products.json').success(function(data) {
	$scope.products = data;
	});

$scope.orderProp = '-date'; //by default , -date : ordre decroissant , date : ordre croissant

$scope.title = "list of smartphones";

});
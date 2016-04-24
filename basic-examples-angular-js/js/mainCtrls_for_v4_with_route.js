var myAjsControllers = angular.module('myAjsControllers', []);
 
//******************** ProductListCtrl ***************

myAjsControllers.controller('ProductListCtrl', ['$scope','$http', function ($scope,$http) {

 $http.get('data/products.json').success(function(data) {
	$scope.products = data;
	});

$scope.orderProp = '-date'; //by default , -date : ordre decroissant , date : ordre croissant

$scope.title = "list of smartphones";

}]);

//******************** ProductDetailCtrl ***************

myAjsControllers.controller('ProductDetailCtrl', ['$scope', '$routeParams','$http',
 function($scope, $routeParams,$http) {
 	$scope.prodId = $routeParams.prodId;
	$http.get('data/products.json').success(function(data) {
		  nbProd = data.length;
		  for(i=0;i<nbProd;i++){
			  if(data[i].id == $scope.prodId){
				  $scope.prod = data[i];
				  break;
			  }
		  }
	});

}]);

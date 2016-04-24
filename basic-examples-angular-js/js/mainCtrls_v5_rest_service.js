var myAjsApp = angular.module('myAjsApp', [ 'productServices']);
 
myAjsApp.controller('ProductListCtrl', [ '$scope' , 'Product' , function ($scope,Product) {
 
$scope.maximumPrice = '2000';//by default
	
//$scope.products =  Product.queryCheap({value : $scope.maximumPrice});
//$scope.products =  Product.query({ maxPrice : $scope.maximumPrice});   // url = .../products?maxPrice=2000
$scope.products =  Product.query();

$scope.prodId='0'; //by default

$scope.selectedProd = Product.get({idRes : $scope.prodId});

$scope.orderProp = '-date'; //by default , -date : ordre decroissant , date : ordre croissant

$scope.title = "list of smartphones";

$scope.refreshWithPriceWithRest = function (){
		 //$scope.products =  Product.queryCheap({value : $scope.maximumPrice});
		 $scope.products =  Product.query({ maxPrice : $scope.maximumPrice});   // url = .../products?maxPrice=2000
	};
	
$scope.refreshSelectedProdWithRest = function (){
	$scope.selectedProd = Product.get({idRes : $scope.prodId});
};

$scope.newPrice='200'; //by default

$scope.updatePrice = function (){
	$scope.selectedProd.price = $scope.newPrice;
	//Product.update( {idRes:$scope.prodId},$scope.selectedProd );  //ok
	//Product.update( $scope.selectedProd );  //ok with { idRes : '@id' } in $resource definition  in Product service
	//$scope.selectedProd.$update(); //ok with { idRes : '@id' } in $resource definition  in Product service
	
	//Product.remove({idRes:3}); //ok
	//$scope.products[2].$delete(); //ok 
	
	//Product.save( {idRes:$scope.prodId},$scope.selectedProd ); //ok saveOrUpdate
	//Product.save($scope.selectedProd ); //ok saveOrUpdate with { idRes : '@id' } in $resource definition  in Product service
	
	$scope.selectedProd.$save(); //ok saveOrUpdate with { idRes : '@id' } in $resource definition  in Product service
	/*
	var newProd =new Product();
	newProd.name='xxx';
	newProd.id=0; //peut être mieux à faire ? (en concordance avec interprétation coté serveur) ?
	newProd.label="yyyyy";
	newProd.price=$scope.newPrice;
	newProd.date="2014-02-02";
	//Product.save(newProd);
	newProd.$save();//ok with id=0 in object (or maybe with String id whose value may be null)
	*/
};

}]);
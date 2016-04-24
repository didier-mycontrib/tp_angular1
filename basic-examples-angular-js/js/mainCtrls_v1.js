var myAjsApp = angular.module('myAjsApp', []);
 
myAjsApp.controller('ProductListCtrl', function ($scope,$log) {

$scope.products = [
{"name": "iphone 5C",
"label": "very good smartphone",
"date" : "2013-10-12",
"price" : 600},
{"name": "galaxy S4 mini",
"label": "good smartphone of Samsung with medium screen",
"date" : "2013-05-23",
"price" : 350.50},
{"name": "experia Z2",
"label": "good smartphone of sony",
"date" : "2013-06-12",
"price" : 200.50}
];



$scope.title = "list of smartphones";

$log.log("a new logged line");
$log.info("ok - normal info");
$log.warn("my warning : attention ");
$log.error("my erreur : ... ");
$log.debug("title (as debug):" + $scope.title);

});
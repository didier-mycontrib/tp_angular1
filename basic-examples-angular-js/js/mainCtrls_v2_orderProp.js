var myAjsApp = angular.module('myAjsApp', []);
 
myAjsApp.controller('ProductListCtrl', function ($scope) {

$scope.products = [
{"name": "iphone 5C",
"label": "very good smartphone",
"date" : "2013-10-12",
"price" : 600},
{"name": "galaxy S4 mini",
"label": "good smartphone of Samsung with medium screen",
"date" : "2013-05-23",
"price" : 350.50},
{"name": "ultym 5",
"label": "cheap and good smartphone by Bougues-Telecom",
"date" : "2014-05-23",
"price" : 120 }
];

$scope.orderProp = '-date'; //by default , -date : ordre decroissant , date : ordre croissant

$scope.title = "list of smartphones";

});
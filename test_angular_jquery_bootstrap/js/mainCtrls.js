var myApp = angular.module('myApp', []);

/*
NB: angular.element('...') is an equivalent of jquery('...') or $('...')
*/

myApp.controller('MainCtrl', function ($scope,$log) {
	
$scope.x=0;
$scope.y=0;

$scope.myDate = "01/01/2016";

$scope.txtColor = 'black';
$scope.tempTxtColor = 'black';

$scope.sEuro = 0;	
	
$scope.title = "calcul de TVA";
$scope.ht = 200.0;
$scope.taux = 20.0;

$scope.listeTaux= [ {nom: "normal", valeur: 20.0 }, {nom: "reduit", valeur: 10.0} ];
$scope.listeChoixCouleur= [ {nom: "black", valeur: "black"} , {nom: "red", valeur: '#cc0000' }, {nom: "blue", valeur: "#0000cc"} , {nom: "green", valeur: "#00cc00"}  ];


$scope.calcul_ttc= function(){
	var ttc = $scope.ht* (1 + $scope.taux/100);
	$log.log("computed ttc:" + ttc);
	return ttc.toFixed(2); //arrondi à 2 chiffres après virgule.
};


angular.element( "#datepicker1").datepicker({dateFormat: 'dd/mm/yy'});

$scope.on_color_choose = function(){
	$scope.txtColor =  $scope.tempTxtColor; 
	$log.info("txtColor="+$scope.txtColor);
	$scope.$apply(); //to ask immediate angular refresh
}

			
$scope.open_myDialog =  function(){
		angular.element("#myDialog" ).dialog( {modal: true,
										  buttons: { "Oui": function() {
											 angular.element( this ).dialog( "close" );
											 $scope.on_color_choose();	//after or before dialog close							
											},"Non": function() {
											  angular.element( this ).dialog( "close" );
											}
										  }
										});
};


});
var myApp = angular.module('myApp', []);

/*
NB: angular.element('...') is an equivalent of jquery('...') or $('...')
*/

/*
myApp.directive('directiveName', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      angular.element(element).myPluginFunction(scope.$eval(attrs.directiveName));
    }
  };
});

<div directiveName="{width: "220px", placeholder: "Search..."}"></div>
<script type="text/javascript" src="pluginName.js"></script>
*/

myApp.directive('mydatepicker', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      angular.element(element).datepicker(scope.$eval(attrs.mydatepicker));
    }
  };
});



myApp.directive('myTabs', function() {
			return {
				restrict: 'E',/* A: as Attribute , C:as css Class , E:as Element */
				scope: {
					bsClass: '=myBsClass', /* my-bs-class="'nav-pills'" or 'nav-tabs' or 'nav-pills nav-stacked'*/
				},
				template: '<div></div>' ,
				transclude: true,
				link: function(scope, element, attrs, ctrl, transclude) {
					
					 var bsClass = scope.bsClass; 
					 if(bsClass == undefined && ( bsClass != 'nav-tabs' &&  bsClass != 'nav-pills'  && bsClass != 'nav-pills nav-stacked') ) bsClass='nav-tabs'; //by default
					
					 transclude(function(clone) {
						var divTabList =  angular.element('<div></div>'); element.append(divTabList);
						var ulElt = angular.element('<ul class="nav '+bsClass+'"></ul>'); divTabList.append(ulElt);
						var divTabContent = angular.element('<div class="tab-content"></div>'); element.append(divTabContent);
						clone.filter('div').each(function(index){
							var divTabElt = angular.element(this);
							var tabId=divTabElt.attr('id');
							if(tabId == undefined) {
								tabId="idtab"+(index+1);
								divTabElt.attr('id',tabId);
							}
							var tabTitle=divTabElt.attr('title'); if(tabTitle == undefined) tabTitle="tab"+(index+1);
							var liElt = angular.element('<li><a href="#' + tabId +'" data-toggle="tab">'+tabTitle+'</a></li>'); ulElt.append(liElt);
							divTabElt.addClass('tab-pane fade');
							if(index==0) {
								liElt.addClass('active');
								divTabElt.addClass('in active');
							}
							divTabContent.append(this);							
						});
												
					});
				}
			};
		});

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
var myDeviseApp = angular.module('deviseApp', []);

myDeviseApp.controller('simpleUnsecureCtrl', function ($scope,$log,$http) {
	
	$scope.deviseMap=new Object();
	
	$scope.srcId=null;
	$scope.targetId=null;
	$scope.montant=0;
	$scope.resConv=0;
	
	$scope.deviseIdSelected=0;
	$scope.msg = "";
	
	$http.get( "http://localhost:8282/devise/devises")
	      .then(function (response) {
               if (response.data) {
			       var deviseList = response.data;
				  // alert(JSON.stringify(deviseList));
				   for(deviseIndex in deviseList){
				       var devise=deviseList[deviseIndex];
					   $scope.deviseMap[devise._id]=devise;
					   /*if(deviseIndex==0)
					      {  $scope.deviseIdSelected = devise._id; }	*/			      
				   }
				  $scope.msg = "nb devises = " + deviseList.length;
               } else {
                   $scope.msg ="Cannot GET devises !";
               }
           });
        
	$scope.updateDeviseViaRest = function(){
		
		$http.put( "http://localhost:8282/devise/devises" , $scope.deviseMap[$scope.deviseIdSelected] )
	      .then(function (response) {
			  var updatedData = response.data;
				   if (updatedData) {
					  $scope.msg ="updated data (server side):" + JSON.stringify(updatedData);
				   } else {
					   $scope.msg ="Cannot PUT updated data";
				   }
		  });
	};
	
	$scope.convertViaRest = function(){
		var convURL="http://localhost:8282/devise/convert?amount="+$scope.montant+"&src="+$scope.deviseMap[$scope.srcId].code+"&target="+$scope.deviseMap[$scope.targetId].code;
		$http.get(convURL)
	      .then(function (response) {
               if (response.data) {
				 $scope.resConv=Number(response.data).toFixed(2);
			   }
			   else {
					   $scope.msg ="Cannot convert with URL=" + convURL;
				   }
		  });
	};
	
});
 
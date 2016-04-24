angular.module('deviseApp.publicSpace', [])
  .controller('PublicSpaceController',  [ '$http' , PublicSpaceController] );

 function PublicSpaceController( $http ) {
	// in controller of component : this instead of $scope 
    var publicSpace = this;  //in order to not use this in embedded callback 
	//PublicSpaceController.prototype prefix instead of $scope prefix for "event method" :
	  
    this.welcomeMessage = 'welcome to deviseApp';
	this.deviseMap=new Object();
	
	this.srcId=null;
	this.targetId=null;
	this.montant=0;
	this.resConv=0;
	this.msg="...";

	$http.get( "http://localhost:8282/devise/devises")
	      .then(function (response) {
               if (response.data) {
			       var deviseList = response.data;
				   //alert(JSON.stringify(deviseList));
				   for(deviseIndex in deviseList){
				       var devise=deviseList[deviseIndex];
					   publicSpace.deviseMap[devise._id]=devise;					  	      
				   }
				  publicSpace.msg = "nb devises = " + deviseList.length;
               } else {
                   publicSpace.msg ="Cannot GET devises !";
               }
           });
		   
    PublicSpaceController.prototype.convertViaRest = function(){
		var convURL="http://localhost:8282/devise/convert?amount="+publicSpace.montant+"&src="+publicSpace.deviseMap[publicSpace.srcId].code+"&target="+publicSpace.deviseMap[publicSpace.targetId].code;
		$http.get(convURL)
	      .then(function (response) {
               if (response.data) {
				 publicSpace.resConv=Number(response.data).toFixed(2);
			   }
			   else {
					   publicSpace.msg ="Cannot convert with URL=" + convURL;
				   }
		  });
	};		   
		 
	
  }
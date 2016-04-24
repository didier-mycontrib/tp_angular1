angular.module('deviseApp.adminSpace', [])
  .controller('AdminSpaceController',  ['$routeParams','$http','$log','$location', AdminSpaceController ]);
  
function AdminSpaceController($routeParams,$http , $log , $location) {
    // in controller of component : this instead of $scope 
    var adminSpace = this;  //in order to not use this in embedded callback 
	//AdminSpaceController.prototype prefix instead of $scope prefix for "event method" :
	
	this.deviseMap=new Object();
	this.deviseIdSelected=0;
 	this.username =  $routeParams ? $routeParams.username  : "?"; 
	this.msg="";
	
	$http.get( "http://localhost:8282/devise/devises")
	      .then(function (response) {
               if (response.data) {
			       var deviseList = response.data;
				   //alert(JSON.stringify(deviseList));
				   for(deviseIndex in deviseList){
				       var devise=deviseList[deviseIndex];
					   adminSpace.deviseMap[devise._id]=devise;					  	      
				   }
				  adminSpace.msg = "nb devises = " + deviseList.length;
               } else {
                   adminSpace.msg ="Cannot GET devises !";
               }
           });
	
   AdminSpaceController.prototype.updateDeviseViaRest = function(){
		
		$http.put( "http://localhost:8383/devise/devises" , adminSpace.deviseMap[adminSpace.deviseIdSelected] )
	      .then(function sucessCallBack(response) {
			  var updatedData = response.data;
				   if (updatedData) {
					  adminSpace.msg ="updated data (server side):" + JSON.stringify(updatedData);
				   } else {
					   adminSpace.msg ="Cannot PUT updated data";
				   }
		  },function errorCallBack(response){
			   adminSpace.msg = "response.status=" + response.status + " response.statusText="  + response.statusText;
		  });
	};
	
	AdminSpaceController.prototype.accessPrivateDataViaRest = function(){
		
		
		$http.get( "http://localhost:8383/simple_private_data")
	      .then(function sucessCallBack(response) {
               if (response.data) {
			       var privateData = response.data;
				   
				  adminSpace.msg = "privateData = " + JSON.stringify(privateData);
               } else {
                   adminSpace.msg ="Cannot GET privateData !";
               }
           },function errorCallBack(response){
			   adminSpace.msg = "response.status=" + response.status + " response.statusText="  + response.statusText;
		  });
		
	};
	
	AdminSpaceController.prototype.logoutCurrentUser = function(){
		adminSpace.username = null;
		localStorage.removeItem('token');
	    $location.path('/login');
	    $log.log("logout to login");
	};
	
	
    this.currentUserFromToken = getUserInfoFromToken();

}


   function urlBase64Decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Illegal base64url string!';
            }
            return window.atob(output);
        }
		
   function getUserInfoFromToken() {
            var token = localStorage.getItem('token');
			//structure d'un "bearer token" =  b64(header).b64(payload).signature
            var payload = {};
            if (token && (typeof token !== 'undefined')) {
				var encodedHeader = token.split('.')[0];
                header = JSON.parse(urlBase64Decode(encodedHeader));
                var encodedPayload = token.split('.')[1];
                payload = JSON.parse(urlBase64Decode(encodedPayload));
				var encodedSignature = token.split('.')[2];
				console.log("raw token = " + token);
				console.log("in token = " + JSON.stringify(header)+"."+JSON.stringify(payload)+"."+encodedSignature);
            }
            return payload;
        }

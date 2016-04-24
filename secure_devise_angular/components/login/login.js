angular.module('deviseApp.login', [])
  .controller('LoginController', [ '$log' , '$http' , LoginController] );

// NB: localStorage.get/setItem(key,value) is predefinded in Html5 browser
// $localStorage required ngStorage module and injection
  
 function LoginController($log , $http ) {
	  
	// in controller of component : this instead of $scope   
	var login = this;  //in order to not use this in embedded callback 
	
	//LoginController.prototype prefix instead of $scope prefix for "event method" :
	
	this.authOk = false;
	this.title = "login as admin (deviseApp)";
	this.msg ="";
	this.signType = "auth" ; //"auth" or "signin"
	this.email="userXy@gmail.com"; //by Default
	
	LoginController.prototype.verifPassword = function(){
	   return login.authOk;
    };
	
	/*
	var md5 = function(value) {
         return CryptoJS.MD5(value).toString();
    }*/
	
	var sha1 = function(value) {
         return CryptoJS.SHA1(value).toString();
    }
	
	var hashSaltPasswordWithSHA1 = function(password){
		var basic_salt = "mySalt";
		var cryptedPwd  = sha1(sha1(password)+basic_salt);
		console.log("password="+password+ " client-side cryptedPwd(with sha1 and salt)=" + cryptedPwd);
		return cryptedPwd ;
	}

	
	
	LoginController.prototype.postLoginInfosViaRest = function(){
		
		$http.post( "http://localhost:8383/login" , { 'username' : login.username , 'password' : hashSaltPasswordWithSHA1(login.password) } )
	      .then(function sucessCallBack(response) {
			  var data = response.data;
				   if (data) {
					  login.msg ="authentication result (from server side):" + JSON.stringify(data.msg);
					  if(data.ok === true) login.authOk = true; 
					     else login.authOk = false; 
					  localStorage.setItem('token',data.token);
				   } else {
					   login.msg ="Cannot perform login/authentication";
					   login.authOk = false;
				   }
		  },function errorCallBack(response){
			   login.msg = "response.status=" + response.status + " response.statusText="  + response.statusText;
			   login.authOk = false;
		  });
	};
	
	LoginController.prototype.postSignInInfosViaRest = function(){
		
		$http.post( "http://localhost:8383/signin" , { 'username' : login.username , 'password' : hashSaltPasswordWithSHA1(login.password), 'email' : login.email } )
	      .then(function sucessCallBack(response) {
			  var data = response.data;
				   if (data) {
					  login.msg ="message ( from server side):" + JSON.stringify(data.msg);
					  login.authOk = data.ok;
					  localStorage.setItem('token',data.token);
				   } else {
					   login.msg ="Cannot perform login/authentication";
					   login.authOk = false;
				   }
		  },function errorCallBack(response){
			   login.msg = "response.status=" + response.status + " response.statusText="  + response.statusText;
			   login.authOk = false;
		  });
	};
	
	

}

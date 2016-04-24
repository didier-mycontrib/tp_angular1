var app = angular.module('deviseApp', [ 'ngNewRouter' ,'deviseApp.publicSpace' , 'deviseApp.login' , 'deviseApp.adminSpace']);

// app module 'deviseApp' depends on  [ 'ngNewRouter','...']  other modules


app.controller('AppController', ['$router', AppController]);
app.config( ['$httpProvider' , pushHttpProviderInterceptor]);

function AppController ($router) {
	$router.config([
     { path: '/', redirectTo: '/welcomePublic' },
     { path: '/welcomePublic', component: 'publicSpace' } ,
	 { path: '/login', component: 'login' },
     { path: '/adminSpace/:username', component: 'adminSpace' }
   ]);
	
}


function pushHttpProviderInterceptor ($httpProvider) {
	
	
	$httpProvider.interceptors.push(['$q', '$location', '$log' , function($q, $location, $log) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if (localStorage.getItem('token')) {
                        config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
                    }
                    return config;
                },
                'responseError': function(response) {
                    if(response.status === 401 || response.status === 403) {
                        $location.path('/login');
						$log.log("401/403 to login");
                    }
                    return $q.reject(response);
                }
            };
        }]);
}

// a etudier : meilleur endroit pour stocker le jeton : localStorage ou "CacheService" ou $rootScope ou ... ou cookie ou ... ?

   
  
 
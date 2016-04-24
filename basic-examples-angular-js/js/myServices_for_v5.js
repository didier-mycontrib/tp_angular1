var productServices = angular.module('productServices', ['ngResource']);
         
productServices.factory('Product', ['$resource',
        function($resource){
	
	    //ex of url : ".../products/:idRes.:format" avec :format = "xml" ou "json"
	    //            ".../products/:idRes.json"
		//            ".../json/products/:idRes"
	
		//si un seul param en fin d'url et plusieurs valeurs fixés pour param 
	    //ex: { idRes= 'xxx' , a = '12' , b = '3' } 
		//alors  url complete en "..../json/products/xxx?a=12&b=3
	
		//si valeur préfixé par @ , alors valeur résultante = valeur le l'attribut/champ/propriété 
	    //de l'objet dont le nom est préfixé par @
	
		return $resource('services/rest/json/products/:idRes' /*default url*/, {  idRes:'@id' } /*default params */, {			       	                           	              
	                update : {method:'PUT'},
	           });
	       }
   
]);

/*
NB0: la chose fabriquée via  productServices.factory('Product', ...) et return $resource(...)
     ici appelée 'Product' correspond à une sorte de mixte entre:
           * une classe de données 'Product' (dont la structure est récupérée via REST) et qui a
             (via $resource) des facultées de persistance à distance (via REST) : méthode $save() , $delete() , ...
           * une classe de 'Service' permettant de déclencher des recherches : Product.query(...) , Product.get() , ...

NB1: default actions are:
 {  'get':    {method:'GET'},
    'save':   {method:'POST'},
    'query':  {method:'GET', isArray:true},
    'remove': {method:'DELETE'},
    'delete': {method:'DELETE'} };
    
NB2: la partie variable en fin d'url ne peut pas comporter de "/" 
     d'où le besoin de rédéfinir quelquefois une url avec un "/" en plus 
     ou bien définir explicitement une fin d'url complexe du type .../products/:idRes/:action/:idAction
     
NB3: la méthode save() comporte toujours comme dernier paramètre l'objet à sauvegarder et retourne en retourne les valeurs mises à jour
     (ex: clef primaire auto-incrémentée)   ex d'url /..../json/products/ avec { id: 1  , name='xxx' , label ='yyy' , ...} dans le corps/body de la requête POST
     en première position de l'appel à serviceXxxx.save() on trouve éventuellement un tableau avec les valeurs des paramètres
     ex: MyProductService.save( {idRes:''},$scope.selectedProd );
     
NB4: par défaut (d'un point de vue angular-js) , la méthode save() en mode "POST" à une sémantique de "saveOrUpdate'   
     mais rien n'empêche de considérer save() comme un createNew et ajouter update() en mode "put" . 
     update (PUT) est généralement invoqué en passant l'id en fin d'URL
     
NB5: delete et remove ont la même sémantique , remove est moins problématique si delete est interprété comme un mot clef
     (id à passer en fin d'URL)

NB6: declenchement en objetRatacheAPersistanceDistante.$save() ou bien servicexxxx.save(objet) avec objet souvent préfixé par $scope.           
*/
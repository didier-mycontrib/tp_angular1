// Librairie
var Convertisseur = {
	
	coeffEuroToFranc : 6.55957 ,
	
    euroToFranc: function(euro) {
        if(isNaN(euro - 1)) {
            throw "Valeur Incorrecte , pas numerique";
        }
        return euro * this.coeffEuroToFranc;
    } ,
	
	francToEuro: function(franc) {
        if(isNaN(franc - 1)) {
            throw "Valeur Incorrecte , pas numerique";
        }
        return franc / this.coeffEuroToFranc;
    }
};
var Convertisseur={coeffEuroToFranc:6.55957,euroToFranc:function(a){if(isNaN(a-1))throw"Valeur Incorrecte , pas numerique";return a*this.coeffEuroToFranc},francToEuro:function(a){if(isNaN(a-1))throw"Valeur Incorrecte , pas numerique";return a/this.coeffEuroToFranc}};
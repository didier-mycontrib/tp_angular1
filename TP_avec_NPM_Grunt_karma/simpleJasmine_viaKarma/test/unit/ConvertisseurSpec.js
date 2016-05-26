// .toBe(..)  .toEqual(...) .toBeGreaterThan(...) .toBeLessThan(...)
// .toBeCloseTo(...,precision_apres_virgule)  .toContain(substring) .not.to...  .toBeFalsy()  .toBeTruthy() 
// .toBeNull() .not.toBeNull()   .toBeUndefined()  .toMatch( regexp )

describe('librairie/composant Convertisseur', function(){
	
	describe('conversion de euro vers franc / euroToFranc', function(){

		it("devrait multiplier le montant par 6.55957", function() {
		  expect(Convertisseur.euroToFranc(15)).toBeCloseTo(98.39, 2);
		});
		
		it("devrait lancer une exception si l'entree n'est pas numerique", function()  {
             expect(Convertisseur.euroToFranc.bind("abc"))
               .toThrow("Valeur Incorrecte , pas numerique");
        });
		
	});
	
	describe('conversion de franc vers euro / francToEuro', function(){

		it("devrait diviser le montant par 6.55957", function() {
		  var sommeFranc = 100;
		  var sommeEuro = Convertisseur.francToEuro(100);
		   //expect(sommeEuro).toBe(15.24);
		  expect(sommeEuro).toBeCloseTo(15.24, 2);
		});
		
	});
});
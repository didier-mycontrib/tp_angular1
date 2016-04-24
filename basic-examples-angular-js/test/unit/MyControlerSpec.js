describe('ProductListCtrl', function(){

  beforeEach(module('myAjsApp'));

  it('should create "products" model with 3 products', inject(function($controller) {
    var scope = {},
        ctrl = $controller('ProductListCtrl', {$scope:scope});

    expect(scope.products.length).toBe(3);
  }));

});
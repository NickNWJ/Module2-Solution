(function () {
  'use strict';

  //List to buy
  var toBuyList = [
      {
        name: "Milk",
        quantity: "2"
      },
      {
        name: "Donuts",
        quantity: "200"
      },
      {
        name: "Cookies",
        quantity: "300"
      },
      {
        name: "Chocolate",
        quantity: "5"
      },
      {
        name: "Peanut Butter",
        quantity: "80"
      }
    ];
    
  //list of bought item
  var boughtList = [];
  
  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;
    toBuy.items = ShoppingListCheckOffService.getItemsToBuy();
    toBuy.bought = function (index) {
      ShoppingListCheckOffService.buyItem(index);
    };
  }
  
  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var bought = this;
    bought.items = ShoppingListCheckOffService.getboughtItems();
  }
  
  function ShoppingListCheckOffService() {
    var service = this;
    
    // List of shopping items to buy
    var itemsToBuy = toBuyList;
    // List of shopping items bought
    var boughtItems = boughtList;

    //Move item to bought list
    service.buyItem = function (itemIndex) {
  	var item =  itemsToBuy[itemIndex];
  	service.addBoughtItem(item);
      removeFromItemsToBuy(itemIndex);
    };
  
    service.getItemsToBuy = function () {
      return itemsToBuy;
    };
    
    service.getboughtItems = function () {
      return boughtItems;
    };
    
    service.addBoughtItem = function (item) {
      boughtItems.push(item);
    };
    
    //private functions
    function removeFromItemsToBuy(itemIndex) {
  	  itemsToBuy.splice(itemIndex, 1);
    };
  }

})();

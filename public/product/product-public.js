var app = angular.module('myApp', []);

app.controller('myCtrl', function ($scope, $http) {

    //list product here
    $http.get('http://localhost:5000/api/product')
        .then(function (response) {
            $scope.items = response.data;
        });

    //my shopping cart
    //myItems [], ==> Conditional (ternary)
    $scope.myItems = JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : [];
    $scope.totalPrice = JSON.parse(localStorage.getItem('price')) ? JSON.parse(localStorage.getItem('price')) : 0
    
    //add to cart
    $scope.addItem = function (newItem) {
        // $scope.myItems.splice(0, $scope.myItems.length);

        if ($scope.myItems.length === 0) {
            newItem.count = 1;
            $scope.myItems.push(newItem);
            localStorage.setItem("cart", JSON.stringify($scope.myItems))
         } else {
            var repeat = false;
            // console.log($scope.myItems.length)
            for (var i = 0; i < $scope.myItems.length; i++) {
                // if (window.CP.shouldStopExecution(1)) { break; }
                if ($scope.myItems[i].id === newItem.id) {
                    $scope.myItems[i].count++;
                    localStorage.setItem('cart', JSON.stringify($scope.myItems))
                    // localStorage.setItem("qty", JSON.stringify($scope.myItems.count))
                    repeat = true;
                }
            }
            // window.CP.exitedLoop(1);

            if (!repeat) {
                newItem.count = 1;
                $scope.myItems.push(newItem);
                console.log($scope.myItems);
                localStorage.setItem("cart", JSON.stringify($scope.myItems))
                // localStorage.setItem("qty", JSON.stringify($scope.myItems.count)
            }
        }
        updatePrice();
    };

    //update price
    var updatePrice = function () {
        var totalPrice = 0;
        for (var i = 0; i < $scope.myItems.length; i++) {
            // if (window.CP.shouldStopExecution(2)) { break; }
            totalPrice += ($scope.myItems[i].count) * ($scope.myItems[i].price);
        }
        // window.CP.exitedLoop(2);
        $scope.totalPrice = totalPrice;
        localStorage.setItem('price', ($scope.totalPrice))

    };

    //empty your cart
    $scope.removeBasket = function () {
        $scope.myItems.splice(0, $scope.myItems.length);
        updatePrice();
    };

});

app.filter('reverse', function () {
    return function (items) {
        // console.log(items)
        var x = items.slice().reverse();
        if (items.length > 1) {
            angular.element('#ok tr').css('background', '#fff');
            angular.element('#ok tr').filter(':first').css('background', 'lightyellow');
            setTimeout(function () {
                angular.element('#ok tr').filter(':first').css('background', '#fff');
            }, 500);
        }
        return x;
    };
});

var app = angular.module('myApp', []);


app.controller('myCtrl', function ($scope, $http) {

    $scope.myItems = JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : [];
    $scope.totalPrice = JSON.parse(localStorage.getItem('price')) ? JSON.parse(localStorage.getItem('price')) : 0


    $http.get('http://localhost:5000/api/order')
        .then(function (response) {

            let data = response.data
            for (let i = 0; i < $scope.myItems.length; i++) {
                data.find(function (element) { 
                    return $scope.myItems[i].id === element.id 
                }).quantity = data.find(function (element) { 
                    return $scope.myItems[i].id === element.id 
                }).quantity - $scope.myItems[i].count
                }
            $scope.Users = response.data;    
            console.log(data)
            })

            // $scope.myItems.map(item => {

            // data.find(element => item.id === element.id).quantity = data.find(element => item.id === element.id).quantity -  item.count
            // $scope.Users = response.data;
            // })

        
});


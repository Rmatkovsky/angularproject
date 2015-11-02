"use strict";

app.controller('mainController', ['$scope', 'globalFunctions', 'authorization', 'userModel',
    function( $scope, globalFunctions, authorization, userModel ) {
        angular.extend( $scope, globalFunctions );

        $scope.isAuthenticated = false;
        $scope.selectedFields = {};

        $scope.next = function() {
            console.log($scope.selectedFields)
        };

        $scope.dataFields = {
            "items": [
                {
                    "name": "Login",
                    "type": "text",
                    "value": "",
                    "placeholder": "Login"
                },
                {
                    "name": "Password",
                    "type": "password",
                    "value": "",
                    "placeholder":"Password"
                },
                {
                    "name": "Name",
                    "type": "text",
                    "value": "Unknown",
                    "placeholder": "Name"
                },
                {
                    "name": "Lastname",
                    "type": "text",
                    "value": "Unknown",
                    "placeholder": "Lastname"
                },
                {
                    "name": "Country",
                    "type": "select",
                    "value": [
                        {
                            "name": "Ukraine",
                            "id": "23"
                        },
                        {
                            "name": "England",
                            "id": "19"
                        },
                        {
                            "name": "Indonesia",
                            "id": "20"
                        }
                    ]
                },
                {
                    "name": "Sex",
                    "type": "radio",
                    "value": [
                        {
                            "name": "Men",
                            "value": "m"
                        },
                        {
                            "name": "Women",
                            "value": "w"
                        }
                    ],
                    "placeholder": "Lastname"
                },
                {
                    "name": "Terms & Conditionals",
                    "type": "checkbox",
                    "value": "true"
                }
            ]
        };

    }
]);

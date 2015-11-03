"use strict";

app.controller('mainController', ['$scope', '$state', '$http', 'globalFunctions', function( $scope, $state, $http, globalFunctions ) {
    angular.extend( $scope, globalFunctions );
    $scope.uiState = $state;

    $scope.selectedFields = {};
    $scope.model = {};
    $scope.form = null;
    $scope.isSend = false;


    /**
     * [checkState - check if selected one more fields]
     * @param iState
     */
    var checkState = function( iState ) {
        if( iState == 'results' && $scope.isEmpty( $scope.selectedFields ) ) {
            $state.transitionTo('start');
        };
    };

    /**
     * [getFields - get fields from server]
     */
    var getFields = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:8000/fields'
        }).then(function (response) {
            $scope.dataFields = response.data;
        }, function errorCallback(response) {
            console.warn('error', response)
        });
    };

    /**
     * [reset - reset form and selected fields]
     */
    $scope.reset = function( ) {
        $scope.selectedFields = {};
        $scope.isSend = false;
        $scope.model = {};
    };

    /**
     * [next - next step ]
     * @returns {boolean}
     */
    $scope.next = function() {
        if(  !$scope.isEmpty( $scope.selectedFields ) ) {
            $state.transitionTo('results');
        }
        return false;
    };

    /**
     * [sendResults - immulate sending results to server]
     * @param iForm
     * @returns {boolean}
     */
    $scope.sendResults = function( iForm ) {
        if( iForm.$pristine ) {
            return false;
        };
        $scope.isSend = true;
    };

    /**
     * watcher for state
     */
    $scope.$watch('uiState.current.name', function(newValue) {
        checkState( newValue );
    });

    getFields();

}]);

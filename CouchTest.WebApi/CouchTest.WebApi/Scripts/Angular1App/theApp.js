(function() {
'use strict';

    angular.module("app", ["ngRoute", "ngCookies"])
        .config(function ($routeProvider) {
            $routeProvider
            .when("/", {
                templateUrl: "Scripts/Angular1App/main.html",
                controller: "mainController",
                controllerAs: "vm"
            })
            .when("/facebookCallback/:register", {
                templateUrl: "Scripts/Angular1App/facebookCallback.html",
                controller: "facebookCallbackController",
                controllerAs: "vm"
            })
            .when("/test2", {
                templateUrl: "Scripts/Angular1App/test2.html",
                controller: "test2Controller",
                controllerAs: "vm"
            })
            .when("/test3", {
                templateUrl: "Scripts/Angular1App/test3.html",
                controller: "test3Controller",
                controllerAs: "vm"
            });
        });

    angular
        .module('app')
        .controller('mainController', mainController);

    mainController.$inject = ['$http'];
    function mainController($http) {
        var vm = this;
        vm.externalLogins = [];
        
        activate();

        function activate() { 
            $http({
                method: 'GET',
                url: 'http://localhost:2999/api/Account/ExternalLogins?returnUrl=http://localhost:2999/FacebookCallback&generateState=true'
                }).then(function successCallback(response) {
                    vm.externalLogins = response.data;
                }, function errorCallback(response) {
                    vm.error = response;
                });
        }
    }

    angular
        .module('app')
        .controller('facebookCallbackController', facebookCallbackController);

    facebookCallbackController.$inject = ['$location', '$routeParams', '$http'];
    function facebookCallbackController($location, $routeParams, $http) {
        var vm = this;
        
        activate();

        function activate() {
            var externalToken = $location.hash().split('=')[1].split('&')[0];
            vm.externalToken = externalToken;
            console.log(externalToken);
            console.log($routeParams);
            console.log($routeParams.register);

            if($routeParams.register == 1) {
                
                $http({
                    method: 'POST',
                    url: 'http://localhost:2999/api/Account/RegisterExternal',
                    headers: { 'Authorization': 'Bearer ' + externalToken }
                }).then(function successCallback(response) {
                    vm.response = response;

                    var header = response.config.headers.Authorization;
                    
                    $http({
                        method: 'GET',
                        url: 'http://localhost:2999/api/Account/ExternalLogin?provider=Facebook&response_type=token&client_id=self&redirect_uri=http://localhost:2999/#/test2',
                        headers: { Authorization: header }
                    }).then(function successCallback(extRes) {
                        // This will be 'Bearer ZYXHASHYdeHashHasHas987....'
                        vm.theUsersSessionBearerAuthHeader = response.config.headers.Authorization; 

                    }, function errorCallback(response) {
                        //Error message???
                    });


                }, function errorCallback(response) {
                    vm.error = response;
                });
                
            }
            else {
                vm.theUsersSessionBearerAuthHeader = externalToken;
            }
        }

        vm.callSecureEndpoint = function() {
            $http({
                method: 'GET',
                url: 'http://localhost:2999/api/Values',
                headers: { Authorization: 'Bearer ' + vm.theUsersSessionBearerAuthHeader }
            }).then(function successCallback(valuesResult) {
                vm.valuesResult = valuesResult; 

            }, function errorCallback(response) {
                vm.ohshit = response;
            });
        };
    }

    angular
        .module('app')
        .controller('test2Controller', test2Controller);

    //test2Controller.$inject = ['dependency1'];
    function test2Controller() {
        var vm = this;
        
        activate();

        function activate() { 

        }
    }

    angular
        .module('app')
        .controller('test3Controller', test3Controller);

    //test3Controller.$inject = ['dependency1'];
    function test3Controller() {
        var vm = this;
        
        activate();

        function activate() { 

        }
    }


})();




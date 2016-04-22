//
// preset-tap module
//
(function() {
    'use strict';
    angular
        .module('pt', [
            'ui.router',
            'ngAnimate',
            'angular-loading-bar',
            'rzModule',
            'pt.controllers',
            'pt.data'
        ])
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
    function config($stateProvider, $urlRouterProvider, $locationProvider) {
        console.log('angular')
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('root', {
                url: '/',
                templateUrl: '/home.view.html',
                controller: 'pt.home.controller',
                resolve : {
                    PRESETS: ['api', function(api) {
                        return api.presets();
                    }]
                }
            })
            .state('preset', {
                url: '/preset/:id',
                templateUrl: '/preset.view.html',
                controller: 'pt.preset.controller',
                resolve : {
                    PRESET: ['api', '$stateParams', function(api, $stateParams) {
                        return api.preset.read($stateParams.id);
                    }]
                }
            })
            .state('create', {
                url: '/create',
                templateUrl: '/preset.create.view.html',
                controller: 'pt.preset.create.controller'
            });
    };
})();

//
// pt.controllers module
//
(function() {
    'use strict';
    angular
        .module('pt.controllers', [
            'ui.router'
    ])
        .controller('pt.home.controller', homeController)
        .controller('pt.preset.controller', presetController)
        .controller('pt.preset.create.controller', presetCreateController);

    homeController.$inject = ['$scope', 'PRESETS'];
    function homeController($scope, PRESETS) {
        $scope.presets = PRESETS;
    }

    presetController.$inject = ['$scope', 'api', '$state', 'PRESET'];
    function presetController($scope, api, $state, PRESET) {
        $scope.presetOriginal = angular.copy(PRESET);
        $scope.preset = angular.copy(PRESET);
        $scope.dirty = false;

        $scope.dbSlider = {
            floor: -10,
            ceil: 10,
            vertical: true
        };
        $scope.hzSlider = {
            floor: -250,
            ceil: 250,
            vertical: true
        };

        $scope.$watch('preset', function() {
            var original = JSON.stringify($scope.presetOriginal);
            var current = JSON.stringify($scope.preset);
            if (original === current) {
                $scope.dirty = false;
                return;
            }
            $scope.dirty = true;
            $scope.$broadcast('rzSliderForceRender');
        }, true);

        $scope.reset = function() {
            $scope.preset = angular.copy($scope.presetOriginal);
        };

        $scope.save = function() {
            api.preset.update($scope.preset)
                .then(function(data) {
                    $state.transitionTo($state.current, $state.params, {
                        reload: true,
                        inherit: false,
                        notify: false
                    });
                });
        };

        $scope.delete = function() {
            api.preset.delete($scope.preset._id)
                .then(function(data) {
                    $state.transitionTo('root');
                });

        };
    }

    presetCreateController.$inject = ['$scope', 'api', '$state'];
    function presetCreateController($scope, api, $state) {
        console.log('create ctrl')
        $scope.preset = {}

        $scope.dbSlider = {
            floor: -10,
            ceil: 10,
            vertical: true
        };
        $scope.hzSlider = {
            floor: -250,
            ceil: 250,
            vertical: true
        };

        $scope.$watch('preset', function() {
            $scope.$broadcast('rzSliderForceRender');
        }, true);

        $scope.save = function() {
            api.preset.create($scope.preset)
                .then(function(data) {
                    $state.go('preset', {
                        id: data.data._id
                    });
                });
        };

    }
})();

//
// pt.data module
//
(function() {
    'use strict';

    angular
        .module('pt.data', [
            'toastr'
        ])
    .service('api', apiService);

    apiService.$inject = ['$http', '$q', 'toastr'];

    function apiService($http, $q, toastr) {
        var urlBase = '/api/v1/';
        var api = {
            presets: readPresets,
            preset: {
                create: createPreset,
                read: readPreset,
                update: updatePreset,
                delete: deletePreset,
            }
        };

        return api;
        /////////////////////

        function readPresets() {
            var url = urlBase + '/presets';
            return httpGet(url);
        }

        function createPreset(preset) {
            var url = urlBase + '/presets';
            return $http.post(url, preset);
        }

        function readPreset(id) {
            var url = urlBase + '/presets/' + decodeURIComponent(id);
            return httpGet(url);
        }

        function updatePreset(preset) {
            var url = urlBase + '/presets/' + decodeURIComponent(preset._id);
            return $http.put(url, preset);
        }

        function deletePreset(id) {
            var url = urlBase + '/presets/' + decodeURIComponent(id);
            return $http.delete(url);
        }

        function httpGet(url) {
            var deffered = $q.defer();
            $http.get(url)
                .success(function(data) {
                    deffered.resolve(data);
                })
                .error(function(err, status) {
                    errorHandler(err, status);
                    deffered.reject(err, status);
                });
            return deffered.promise;
        }

        function errorHandler(err, status) {
            toastr.error(status + ': Some API Error');
        }
    };
})();

(function () {
    'use strict';

    angular
        .module('app')
        .controller('WeatherAppController', WeatherAppController);

    WeatherAppController.$inject = ['$http', 'toastr'];
    /* @ngInject */
    function WeatherAppController($http, toastr) {
        var vm = this;

        vm.callWeatherApi = callWeatherApi;
        vm.data = false;
        vm.aHistory = [];

        //////////////////////Functions Below/////////////////////
        function callWeatherApi(city) {
            vm.loading = true;
            vm.data = true;
            $http
                .get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&APPID=eb52374423c4a69a2b4dee6b9f73b80f')
                .then(function(response) {
                    toastr.success('Your information has been retrieved!', 'Success!');
                    vm.cityData= response.data;
                    vm.loading = false;
                    vm.nowDate = new Date(new Date().getTime()).toLocaleDateString();
                    vm.nowTime = new Date(new Date().getTime()).toLocaleTimeString();

                    var obj = {city: vm.cityData.name, date: vm.nowDate, time: vm.nowTime}
                    vm.aHistory.push(obj);
                    })

                    .catch(function(error) {
                        toastr.error('No information available for your search!', 'Sad!');
                    });
            
        }
    }
})();

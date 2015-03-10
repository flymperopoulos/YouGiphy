var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider, $locationProvider){

  $routeProvider

    // route to home page
	.when("/",
	{
    	controller: "mainController"
    })

	// route to creation of new wiki form
	.when('/account', {
		templateUrl : '../htmlLayouts/signUpPage.html',
		controller  : 'loginController'
	})

    $locationProvider.html5Mode(true);
});

app.controller('mainController', function($scope, $http, $location){
	//main route tuff here
});

app.controller('loginController', function($scope, $http, $location, $routeParams){
	$scope.logStatus = true;
	console.log(logStatus);
	$scope.f = "fasdf";

});

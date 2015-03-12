var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider, $locationProvider){

  $routeProvider

    // route to home page
	.when("/",
	{
    	controller: "mainController"
    })

    $locationProvider.html5Mode(true);
});

app.controller('mainController', function($scope, $http, $location){

	$scope.submitTweet = function (){
		var splitSpaces = String($scope.tweetField).split(' ');
		for (i in splitSpaces){
			var elt = splitSpaces[i];
			if (elt.indexOf('#') == 0){
				$scope.hashtag = elt;
			}
			else {
				console.log("didn't find hashtag");
			};
		};
	}

	$http.get('/account')
	    .success(function(data, status, headers, config) {
	        console.log("data", data);
	        console.log("status", status);
		    $scope.userName=data.name;
		    $scope.logStatus = true;
		    $scope.welcomeMessage = true;
		    $scope.formForTweets= true;
		    $scope.greetingHeading = true;
	      })

	    .error(function(data, status, headers, config) {
	        console.log("data", data);
	        console.log("status", status);
	      });

	$scope.submitTweet();
});
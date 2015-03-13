var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider, $locationProvider){

  $routeProvider

    // route to home page
	.when("/",
	{
    	controller: "mainController"
    })
	
	// route to creation of new post
	.when('/newpost', {
	  templateUrl : '../htmlLayouts/newpost.html',
	  controller  : 'newPostController'
	})

    $locationProvider.html5Mode(true);
});

app.controller('mainController', function($scope, $http, $location){

	// when button clicked parses for hash
	$scope.submitTweet = function (){
		var splitSpaces = String($scope.tweetField).split(' ');

		splitSpaces.forEach(function (element){
				
			if (element.indexOf('#') === 0){
				$scope.hashtag = element.replace('#','');
				debugger;
				$http.get("http://api.giphy.com/v1/gifs/search?q="+ $scope.hashtag + "&api_key=dc6zaTOxFJmzC&limit=5")
				    .success(function(data, status, headers, config) {
				        console.log("data from Giph ", data);
				        console.log("status", status);
				        $scope.randomNumber = Math.floor(Math.random()*data.data.length);
				        $scope.giphURL = data.data[$scope.randomNumber].embed_url;
				        $location.path('/newpost');
				      })

				    .error(function(data, status, headers, config) {
				        console.log("data", data);
				        console.log("status", status);
				      });
			}
			else {
				console.log("didn't find hashtag");
				$location.path('/newpost');
			};
		}) 
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
});

app.controller('newPostController', function($scope, $http, $location){
	
	$scope.submitNewPost = function($files){ 
	    var postX = {
	        author : $scope.userName,
	        content: $scope.tweetField,
	        giphURL : $scope.giphURL
	    };

	    console.log('PostInfo: ', postX);

	    // posts new wiki
	    $http.post("/createPost", postX)
	        .success(function(data, status, headers, config) {
	        	console.log('JAHAHAHAH');
	            console.log("data", data);
	            console.log("status", status);
	    })
		    .error(function(data, status, headers, config) {
		        console.log("data", data);
		        console.log("status", status);
		      });
	}

	$scope.submitNewPost();
});

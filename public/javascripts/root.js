var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider, $locationProvider){

  $routeProvider

    // route to home page
	.when("/",
	{
		templateUrl : '../htmlLayouts/formForNew.html',
    	controller: "mainController"
    })

	.when('/posts',
	{
		templateUrl : '../htmlLayouts/posts.html',
		controller : 'postsController'
	})

    $locationProvider.html5Mode(true);
});

app.controller('mainController', function($scope, $http, $location){

	$scope.submitNewPost = function($files){ 
	    var postX = {
	        author : $scope.userName,
	        content: $scope.tweetField,
	        giphURL : $scope.giphURL,
	        date : Date.now()
	    };

	    // posts new wiki
	    $http.post("/createPost", postX)
	        .success(function(data, status, headers, config) {
	            console.log("data", data);
	            console.log("status", status);
	            $scope.nameInForm = $scope.tweetField;
	            $scope.tweetField = null;
	            $scope.showDirection = true;
	    })
		    .error(function(data, status, headers, config) {
		        console.log("data", data);
		        console.log("status", status);
		      });
	}

	// when button clicked parses for hash
	$scope.submitTweet = function (){
		var splitSpaces = String($scope.tweetField).split(' ');

		splitSpaces.forEach(function (element){

			if (element.indexOf('#') === 0){
				$scope.hashtag = element.replace('#','');

				$http.get("http://api.giphy.com/v1/gifs/search?q="+ $scope.hashtag + "&api_key=dc6zaTOxFJmzC&limit=10")
				    .success(function(data, status, headers, config) {
				        console.log("data from Giph ", data);
				        console.log("status", status);
				        $scope.randomNumber = Math.floor(Math.random()*data.data.length);
				        $scope.giphURL = data.data[$scope.randomNumber].embed_url;
				        $scope.submitNewPost();
				        $scope.resultingPost = true;
				      })

				    .error(function(data, status, headers, config) {
				        console.log("data", data);
				        console.log("status", status);
				      });
			}
			else {
				console.log("didn't find hashtag");
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

// gives posts to the respective html document
app.controller('postsController', function($scope, $http, $location){

	$scope.posts = function (){

	    $http.get('/posts')
	        .success(function(data, status, headers, config) {
	            console.log("data", data);
	            console.log("status", status);
	            $scope.posts=data;	 
	            $scope.headingList = true;         
	          })

	        .error(function(data, status, headers, config) {
	            console.log("data", data);
	            console.log("status", status);
	          });
	    }

	// method with all our stuff from get request
	$scope.posts();
});
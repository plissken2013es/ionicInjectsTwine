angular.module('starter', ['ionic'])

.controller('AppCtrl', function($scope, HttpService) {
    $scope.itemsToLoad = 2;
    $scope.twineContainers = '<style role="stylesheet" id="twine-user-stylesheet" type="text/twine-css"></style><script role="script" id="twine-user-script" type="text/twine-javascript"></script>';
    $scope.checkAppStart = function() {
        if ($scope.itemsToLoad <= 0) {
            console.log("app should start now");
            window.story.start();
        }
    };
    
    // get Story content
    HttpService.getTwineStory()
        .then(function(story) {
            var storyContainer = document.getElementsByTagName("tw-storydata")[0];
            console.log(storyContainer);
            storyContainer.innerHTML = story;
            console.log("story content loaded.");
            storyContainer.innerHTML = storyContainer.innerHTML + $scope.twineContainers;
            console.log("twine containers added");
        })
        .then(function() {
            // get lib and custom code
            HttpService.getTwineLib()
                .then(function(code) {
                    var twineEl = document.createElement("script");
                    twineEl.textContent = code;
                    document.body.appendChild(twineEl);
                    console.log("twine loaded. is jquery ready?", $("body").selector == "body");
                })
                .then(function() {
                    HttpService.getLuisquin()
                        .then(function(response) {
                            var luisquinEl = document.getElementById("twine-user-script");
                            luisquinEl.textContent = response;
                            console.log("luisquin loaded.");
                            $scope.itemsToLoad--;
                            $scope.checkAppStart();
                        });
                });  
            // get custom CSS styles
            HttpService.getTwineCSS()
                .then(function(css) {
                    var cssContainer = document.getElementById("twine-user-stylesheet");
                    cssContainer.textContent = css;
                    console.log("twine styles loaded.");
                    $scope.itemsToLoad--;
                    $scope.checkAppStart();
                });
        });
    
})

.service('HttpService', function($http) {
    return {
        getTwineCSS: function() {
            return $http.get("css/twine_styles.css")
                .then(function(styles){
                    return styles.data;
                });
        },
        getTwineLib: function() {
            return $http.get("js/lib.js")
                .then(function(code){
                    return code.data;
                });
        },
        getTwineStory: function() {
            return $http.get("data/story.txt")
                .then(function(story){
                    return story.data;
                });
        },
        getLuisquin: function() {
            // $http returns a promise, which has a then function, which also returns a promise.
            return $http.get("js/luisquin.js")
                .then(function (response) {
                    // In the response, resp.data contains the result. Check the console to see all of the data returned.
                    return response.data;
                });
        }
    };
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

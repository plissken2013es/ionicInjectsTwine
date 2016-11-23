angular.module("countdown.controllers", [])

.controller('GameCtrl', function($scope, HttpService, CountdownFactory) {
    $scope.itemsToLoad = 2;
    $scope.twineContainers = '<style role="stylesheet" id="twine-user-stylesheet" type="text/twine-css"></style><script role="script" id="twine-user-script" type="text/twine-javascript"></script>';
    $scope.userScripts = [];
    $scope.checkAppStart = function() {
        if ($scope.itemsToLoad <= 0) {
            console.log("app should start now");
            setTimeout(function() {
                window.story.userScripts = $scope.userScripts;
                window.story.start();
            }.bind(this), 300);
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
                            $scope.userScripts = [response];
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
    
});
angular.module("countdown.controllers", [])

.controller('GameCtrl', function($scope, HttpService, CountdownFactory, $ionicModal) {
    $scope.itemsToLoad = 2;
    $scope.twineContainers = '<style role="stylesheet" id="twine-user-stylesheet" type="text/twine-css"></style><script role="script" id="twine-user-script" type="text/twine-javascript"></script>';
    $scope.userScripts = [];
        
    $ionicModal.fromTemplateUrl("templates/modalHabilities.html", {
        scope: $scope,
        animation: "slide-in-up"
    }).then(function(modal) {
        $scope.modalHabilities = modal;
    });
    $ionicModal.fromTemplateUrl("templates/modalClock.html", {
        scope: $scope,
        animation: "slide-in-up"
    }).then(function(modal) {
        $scope.modalClock = modal;
    });
    $ionicModal.fromTemplateUrl("templates/modalObjectFound.html", {
        scope: $scope,
        animation: "slide-in-up"
    }).then(function(modal) {
        $scope.modalObject = modal;
    });
    
    $scope.openModalHabilities = function(psg, hab) {
        console.log("ionic open modal Habilities", psg, hab);
        $scope.modalHabilities.show();
        $(".button-small").hide();
        hab.forEach(function(val, i) {
            $("#btn"+val).show();
        });
    };
    $scope.closeModalHabilities = function() {
        $scope.modalHabilities.hide();
    };    
    $scope.openModalClock = function() {
        console.log("ionic open modal clock");
        $scope.modalClock.show();
    };
    $scope.closeModalClock = function() {
        $scope.modalClock.hide();
    };
    $scope.openModalObject = function(img, title, desc) {
        console.log("ionic open modal object");
        $scope.modalObject.show();
        $("#objContainer").attr("src", img);
        $("#objTitle").text(title);
        $("#objDesc").text(desc);
    };
    $scope.closeModalObject = function() {
        $scope.modalObject.hide();
    };
    
    $scope.checkAppStart = function() {
        if ($scope.itemsToLoad <= 0) {
            console.log("app should start now");
            var interval = setInterval(function() {
                if (window.story) {
                    window.story.userScripts = $scope.userScripts;
                    window.story.start();
                    document.luisquin.loadScope($scope);
                    clearInterval(interval);
                }
            }.bind(this), 250);
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
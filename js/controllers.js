angular.module("countdown.controllers", [])

.controller('GameCtrl', function($scope, $state, HttpService, CountdownFactory, $ionicModal, $ionicPlatform) {
    // handling hardware back button
    $ionicPlatform.registerBackButtonAction(function (event) {
        navigator.app.exitApp();
    }, 100);
    
    $scope.seenIntro = false;
    $scope.itemsToLoad = 2;
    $scope.twineContainers = '<style role="stylesheet" id="twine-user-stylesheet" type="text/twine-css"></style><script role="script" id="twine-user-script" type="text/twine-javascript"></script>';
    $scope.userScripts = [];
        
    // --------------- modals -------------------------------------
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
    $ionicModal.fromTemplateUrl("templates/modalMisteries.html", {
        scope: $scope,
        animation: "slide-in-up"
    }).then(function(modal) {
        $scope.modalMistery = modal;
    });
    $ionicModal.fromTemplateUrl("templates/modalEvents.html", {
        scope: $scope,
        animation: "slide-in-up"
    }).then(function(modal) {
        $scope.modalEvent = modal;
    });
    
    $scope.openModalHabilities = function(psg, hab) {
        console.log("ionic open modal Habilities", psg, hab);
        $scope.modalHabilities.show();
        $("#habilitySelection .button-small").hide();
        hab.forEach(function(val, i) {
            $("#btn"+val).show();
        });
    };
    $scope.closeModalHabilities = function() {
        $scope.modalHabilities.hide();
    };     
    $scope.openModalMisteries = function() {
        console.log("ionic open modal Misteries");
        $scope.modalMistery.show();
        $("#letterSelection .button-small").remove();
    };
    $scope.closeModalMisteries = function() {
        $scope.modalMistery.hide();
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
    $scope.openModalEvents = function() {
        console.log("ionic open modal Events");
        $scope.modalEvent.show();
    };
    $scope.closeModalEvents = function() {
        $scope.modalEvent.hide();
    };
    // --------------- modals -------------------------------------
    
    $scope.checkAppStart = function() {
        if ($scope.itemsToLoad <= 0) {
            console.log("app should start now");
            
            if ($scope.seenIntro) {
                var interval = setInterval(function() {
                    if (window.story) {
                        window.story.userScripts = $scope.userScripts;
                        window.story.start();
                        document.luisquin.loadScope($scope);
                        clearInterval(interval);
                    }
                }.bind(this), 250);
            } else {
                console.log("should launch intro now");
                
                // this is not the optimal way to launch the intro, but... :S
                var $cover = $("#cover");
                //$cover.append('<img id="logo" src="../img/carpenterSoft_logo_200.gif">');
                var $logo = $("#logo");
                var $wrapper = $("#wrapper");
                var $pane = $(".pane");
                $logo.delay(6000).fadeOut("slow", function() {
                    window.globalStartMusic();
                    $logo.remove();
                    var content = "<div id='credits'><p>Una historia de:<br/>Fernando Lafuente</p><p>Ilustrada por:<br/>Nombre Ilustrador</p></div>";
                    $cover.append(content);
                    $("#credits").delay(1000).fadeIn("slow").delay(4000).fadeOut("slow", function() {
                        $wrapper.addClass("coverImage");
                        $pane.fadeOut("slow", function() {
                            $pane.css("backgroundColor", "transparent").fadeIn("slow", function() {
                                $wrapper.addClass("backgroundImage").removeClass("coverImage");
                                $("#credits").remove();
                                content = "<div id='title'><p>Cuenta Atrás</p></div>";
                                $cover.append(content);
                                $pane.addClass("coverImage").delay(4000).fadeOut("slow", function() {
                                    $cover.remove();
                                    $pane.removeClass("coverImage").removeClass("backgroundImage").show();
                                    $scope.seenIntro = true;
                                    $scope.checkAppStart();
                                }.bind(this));
                            }.bind(this));
                        }.bind(this));
                    }.bind(this));
                });
            }
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
angular.module('countdown', ['ionic', 'countdown.controllers'])

.config(function($stateProvider, $urlRouterProvider){
    $stateProvider
    .state('game', {
        url: "/game",
        templateUrl: "templates/game.html",
        controller: 'GameCtrl'
    })

    // If none of the above states are matched, use this as the fallback:
    $urlRouterProvider.otherwise('game');
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

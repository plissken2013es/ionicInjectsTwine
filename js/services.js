angular.module("countdown.services", [])

.service('HttpService', function($http) {
    this.getTwineCSS = function() {
        return $http.get("css/twine_styles.css")
            .then(function(styles){
                return styles.data;
            });
    };
    this.getTwineLib = function() {
        return $http.get("js/lib.js")
            .then(function(code){
                return code.data;
            });
    };
    this.getTwineStory = function() {
        return $http.get("data/story.txt")
            .then(function(story){
                return story.data;
            });
    };
    this.getLuisquin = function() {
        // $http returns a promise, which has a then function, which also returns a promise.
        return $http.get("js/luisquin.js")
            .then(function (response) {
                // In the response, resp.data contains the result. Check the console to see all of the data returned.
                return response.data;
            });
    };
    this.getIntroScript = function() {
        // $http returns a promise, which has a then function, which also returns a promise.
        return $http.get("js/intro.js")
            .then(function (response) {
                // In the response, resp.data contains the result. Check the console to see all of the data returned.
                return response.data;
            });
    };
});
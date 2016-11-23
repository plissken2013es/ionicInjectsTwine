angular.module("countdown.factories", [])

.factory("CountdownFactory", function() {
    return {
        test: function() {
            console.log("factory running well!");
        }
    };
});
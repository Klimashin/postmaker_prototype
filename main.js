angular.module('InstagramService', []).service('instagram', function() {
	
});

angular.module('PinterestService', []).service('pinterest', function() {

});

var app = angular.module('app', ['InstagramService', 'PinterestService']);
app.controller('AppCtrl', function($scope, instagram, pinterest) {

});
angular.module('InstagramService', []).service('instagram', function() {
	
});

angular.module('PinterestService', []).service('pinterest', function() {

});

var AppCtrl = function($scope, instagram, pinterest) {
	this.activeTab = 1;
	this.$scope = $scope;

	this.$scope.openTab = function(tabNumber) {
		this.activeTab = tabNumber;
	}.bind(this);
};


var app = angular.module('app', ['InstagramService', 'PinterestService']);
app.controller('AppCtrl', AppCtrl);
angular.module('InstagramService', []).service('instagram', function() {

});

angular.module('PinterestService', []).service('pinterest', function() {
	this.accessToken = undefined;
	this.board = false;
	this.image = undefined;
	this.pinterestUser = undefined;

	this.login = function() {
		PDK.login({scope: 'write_public,read_public'}, function() {
			if (PDK.getSession()) {
				console.log(PDK.getSession());
				this.accessToken = PDK.getSession().accessToken;

				PDK.request('/v1/me/boards', function (response) {
					if (response.data) {
						this.board = response.data[0];
					} else {
						console.error('No pin boards found! Please create one.');
					}
				}.bind(this));

				PDK.request('/v1/me/', function (response) {
					if (response.data) this.pinterestUser = response.data;
				}.bind(this));
			} else {
				console.log('Autorization failure')
			}
		}.bind(this));
	}.bind(this);

	this.pinFile = function() {
		if (!this.pinterestUser || !this.board) return console.error('Board or User are not set!');
		if (!this.image) return console.error('Image is not selected');

		var board = this.pinterestUser.first_name + '/' + this.board.name;
		var note = 'Pinned by postmaker prototype';
		var image = this.image;

		$.post('https://api.pinterest.com/v1/pins/',{
			access_token: this.accessToken,
			board: board,
			note: note,
			image_base64: image
		}).done(function(data, statusText, xhr) {
			if (xhr.status === 201) {
				console.log('Success!');
				this.image = null;
			} else {
				console.error(xhr.status + ' Failed to pin image!');
			}
		}.bind(this));
	}.bind(this);
});

var AppCtrl = function($scope, instagram, pinterest) {
	this.activeTab = 1;
	this.$scope = $scope;
	this.instagram = instagram;
	this.pinterest = pinterest;

	this.$scope.pinButtonClick = this.pinterest.pinFile;

	this.$scope.openTab = function(tabNumber) {
		this.activeTab = tabNumber;
	}.bind(this);
};


var app = angular.module('app', ['InstagramService', 'PinterestService']);
app.controller('AppCtrl', AppCtrl)
	.directive("fileread", [function () {
	    return {
	        scope: {
	            fileread: "="
	        },
	        link: function (scope, element, attributes) {
	            element.bind("change", function (changeEvent) {
	                var reader = new FileReader();
	                reader.onload = function (loadEvent) {
	                    scope.$apply(function () {
	                        scope.fileread = loadEvent.target.result;
	                    });
	                }
	                reader.readAsDataURL(changeEvent.target.files[0]);
	            });
	        }
	    }
	}]);
angular.module('topMenuModule', [])
    .controller('topMenuController', function($scope, $location) {
        $scope.getTitle = function() {
            var path = $location.path();
            if (path.indexOf('/page/stories/view/') === 0) {
                return 'View Story';
            } else if (path.indexOf('/page/stories/new/') === 0) {
                return 'New Story';
            } else if (path.indexOf('/page/composites/') === 0) {
                return 'Composites';
            } else if (path.indexOf('/page/reports/') === 0) {
                return 'Reports';
            } else if (path.indexOf('/page/login/') === 0) {
                return 'Login';
            } else if (path.indexOf('/page/loginWelcome/') === 0) {
                return 'Welcome';
            } else if (path.indexOf('/page/tour/') === 0) {
                return 'Home';
            } else {
                return '';
            }
        };
    });

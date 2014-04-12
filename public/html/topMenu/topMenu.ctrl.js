angular.module('topMenuModule', [])
    .controller('topMenuController', ['$scope', '$modal', '$location',
        function($scope, $modal, $location) {
            $scope.openStory = function() {
                $modal.open({
                    templateUrl: '/assets/html/stories.tmpl.html',
                    controller: 'storiesCtrl',
                    resolve: {
                        data: function() {
                            return {};
                        }
                    }
                });
            };
            $scope.openCompositeClass = function() {
                openCompositeClass($modal);
            };
            $scope.getTitle = function() {
                var path = $location.path();
                if (path.indexOf(getViewStoryUrl()) === 0) {
                    return 'View Story';
                } else if (path.indexOf(getNewStoryUrl()) === 0) {
                    return 'New Story';
                } else {
                    return '';
                }
            };
        }
    ]);

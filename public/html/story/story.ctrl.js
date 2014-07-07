angular.module('storyModule', [])
    .controller('storyCtrl', ['$scope', '$http', '$modal', '$location', '$cookieStore', '$q', '$anchorScroll', 'story', 'steps', 'groovyComposites',
        function($scope, $http, $modal, $location, $cookieStore, $q, $anchorScroll, story, steps, groovyComposites) {
            $scope.pendingSteps = [];
            $scope.setAction = function() {
                if ($scope.story.name === '') {
                    $scope.action = 'POST';
                } else {
                    $scope.action = 'PUT';
                    $scope.addHistoryItem($scope.story.name + ' story');
                }
            };
            $scope.expandPanels = function() {
                var scenariosExpanded = true;
                if ($scope.panelsExpanded === undefined) {
                    $scope.panelsExpanded = false;
                } else {
                    $scope.panelsExpanded = !$scope.panelsExpanded;
                    scenariosExpanded = $scope.panelsExpanded;
                }
                $scope.panels = {
                    story: $scope.panelsExpanded,
                    description: $scope.panelsExpanded,
                    meta: $scope.panelsExpanded,
                    narrative: $scope.panelsExpanded,
                    givenStories: $scope.panelsExpanded,
                    lifecycle: $scope.panelsExpanded,
                    scenarios: scenariosExpanded
                };
            };
            $scope.story = story;
            $scope.steps = steps;
            $scope.groovyComposites = groovyComposites;
            $scope.stepTypes = ['GIVEN', 'WHEN', 'THEN'];
            $scope.storyFormClass = 'col-md-12';
            $scope.storyRunnerVisible = false;
            $scope.storyRunnerInProgress = false;
            $scope.storyRunnerSuccess = true;
            $scope.expandPanels();
            $scope.originalStory = angular.copy(story);
            var pathArray = $scope.story.path.split('/');
            $scope.dirPath = pathArray.slice(0, pathArray.length - 1).join('/');
            if ($scope.dirPath !== '') {
                $scope.dirPath += '/';
            }
            $scope.setAction();
            $scope.cssClass = cssClass;
            $scope.buttonCssClass = buttonCssClass;
            $scope.canSaveStory = function() {
                var isValid = $scope.storyForm.$valid;
                var hasChanged = !angular.equals($scope.story, $scope.originalStory);
                return isValid && hasChanged;
            };
            $scope.stepTextPattern = stepTextPattern;
            // TODO Test
            $scope.saveStory = function() {
                if ($scope.canSaveStory()) {
                    $scope.story.path = $scope.dirPath + $scope.story.name + ".story";
                    if ($scope.action === 'POST') {
                        var strippedPathArray = $scope.dirPath.split('/');
                        var strippedPath = strippedPathArray.slice(0, strippedPathArray.length - 1).join('/');
                        if (strippedPath !== '') {
                            strippedPath += '/';
                        }
                        $http.post('/stories/story.json', $scope.story).then(function () {
                            $location.path(getViewStoryUrl() + strippedPath + $scope.story.name);
                            $scope.originalStory = angular.copy($scope.story);
                        }, function (response) {
                            $scope.openErrorModal($modal, response.data);
                        });
                    } else {
                        if ($scope.story.name !== $scope.originalStory.name) {
                            $scope.story.originalPath = $scope.originalStory.path;
                        }
                        $http.put('/stories/story.json', $scope.story).then(function () {
                            $scope.originalStory = angular.copy($scope.story);
                        }, function (response) {
                            $scope.openErrorModal($modal, response.data);
                        });
                    }
                }
            };
            $scope.canRunStory = function () {
                return $scope.storyForm.$valid && !$scope.storyRunnerInProgress;
            };
            // TODO Test
            $scope.runStory = function () {
                if ($scope.canRunStory()) {
                    $scope.saveStory();
                    $scope.openRunnerModal().result.then(function (data) {
                        var classes = data.classes;
                        $scope.storyFormClass = 'col-md-6';
                        $scope.storyRunnerClass = 'col-md-6';
                        $scope.storyRunnerVisible = true;
                        $scope.storyRunnerInProgress = true;
                        classes.forEach(function (classEntry) {
                            classEntry.params.forEach(function (paramEntry) {
                                $cookieStore.put(classEntry.fullName + "." + paramEntry.key, paramEntry.value);
                            });
                        });
                        var json = {
                            storyPaths: [{path: $scope.story.path}],
                            classes: classes,
                            groovyComposites: $scope.groovyComposites
                        };
                        $http.post('/runner/run.json', json).then(function (response) {
                            $scope.storyRunnerSuccess = (response.data.status === 'OK');
                            $scope.storyRunnerInProgress = false;
                            $scope.getReports(response.data.id);
                        }, function (response) {
                            $scope.storyRunnerSuccess = false;
                            $scope.storyRunnerInProgress = false;
                            $scope.openErrorModal($modal, response.data);
                        });
                    }, function () {
                        // Do nothing
                    });
                }
            };
            $scope.getReports = function(reportsId) {
                $http.get('/api/v1/reporters/list/' + reportsId).then(function (response) {
                    $scope.reports = response.data;
                    $scope.setPendingSteps($scope.reports);
                }, function (response) {
                    // TODO Test
                    $scope.openErrorModal($modal, response.data);
                });
            };
            // TODO Test
            $scope.openRunnerModal = function() {
                return openRunnerParametersModal($modal, false);
            };
            $scope.getRunnerProgressCss = function () {
                return getRunnerProgressCss($scope.storyRunnerInProgress);
            };
            $scope.getRunnerStatusCss = function () {
                return getRunnerStatusCss(
                    $scope.storyRunnerInProgress,
                    $scope.storyRunnerSuccess,
                    ($scope.pendingSteps > 0)
                );
            };
            $scope.setPendingSteps = function(reports) {
                $scope.pendingSteps = [];
                reports.forEach(function(report) {
                    report.steps.forEach(function(step) {
                        if (step.status === 'pending') {
                            $scope.pendingSteps.push({text: step.text});
                        }
                    });
                });
            };
            $scope.hasPendingSteps = function() {
                return $scope.pendingSteps !== undefined && $scope.pendingSteps.length > 0;
            };
            $scope.getStoryRunnerStatusText = function () {
                return getStoryRunnerStatusText(
                    $scope.storyRunnerInProgress,
                    $scope.storyRunnerSuccess,
                    $scope.pendingSteps.length
                );
            };
            $scope.removeCollectionElement = removeCollectionElement;
            $scope.addElement = function (collection) {
                collection.push({});
            };
            $scope.addScenarioElement = function (collection) {
                collection.push({title: '', meta: [], steps: [], examplesTable: ''});
            };
            $scope.revertStory = function () {
                $scope.story = angular.copy($scope.originalStory);
                $scope.storyForm.$setPristine();
            };
            // TODO Test
            $scope.canRevertStory = function () {
                return !angular.equals($scope.story, $scope.originalStory);
            };
            // TODO Test
            $scope.canDeleteStory = function () {
                return $scope.action === 'PUT' && !$scope.storyRunnerInProgress;
            };
            // TODO Test
            $scope.deleteStory = function () {
                var path = $scope.dirPath + $scope.story.name + '.story';
                deleteStory($modal, $http, $location, $q, path);
            };
            $scope.stepEnterKey = newCollectionItem;
            // TODO Test
            $scope.clickPendingStep = function(stepText) {
                var compositeClass = $cookieStore.get("compositeClass");
                if (compositeClass === undefined || compositeClass === '') {
                    return openCompositeClass($modal, stepText);
                } else {
                    return $location.search('stepText', stepText).path('/page/composites/composites.com.technologyconversations.bdd.steps.' + compositeClass);
                }
            };
            // TODO Test
            $scope.openErrorModal = openErrorModal;
        }
    ]);
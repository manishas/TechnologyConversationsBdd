describe('runnerModule', function() {

    var scope, modal;

    beforeEach(module('ngCookies', 'runnerModule'));

    beforeEach(
        inject(function($rootScope) {
            scope = $rootScope.$new();
            modal = {
                open: jasmine.createSpy('modal.open')
            };
        })
    );

    describe('runnerCtrl controller', function() {

        var modalInstance, httpBackend;
        var pendingSteps = [
            "Given Web user is in the Browse Stories dialog",
            "Given something else"
        ];

        beforeEach(
            inject(function($controller, $httpBackend, $http, $location) {
                httpBackend = $httpBackend;
                $controller('runnerCtrl', {
                    $scope: scope,
                    $modal: modal,
                    $modalInstance: modalInstance,
                    $http: $http,
                    $location: $location
                });
            })
        );

        describe('init function', function() {
            beforeEach(function() {
                spyOn(scope, 'openRunner');
                scope.init();
            });
            it('should call the openRunner function', function() {
                expect(scope.openRunner).toHaveBeenCalled();
            });
            it('should set storyRunnerInProgress to false', function() {
                expect(scope.storyRunnerInProgress).toEqual(false);
            });
            it('should set storyRunnerSuccess to false', function() {
                expect(scope.storyRunnerSuccess).toEqual(false);
            });
            it('should set pendingSteps to an empty array', function() {
                expect(scope.pendingSteps.length).toEqual(0);
            });
            it('should set showRunnerProgress to false', function() {
                expect(scope.showRunnerProgress).toEqual(false);
            });
            it('should set reportsUrl to an empty string', function() {
                expect(scope.reportsUrl).toEqual('');
            });
            it('should set showApi to false', function() {
                expect(scope.showApi).toEqual(false);
            });
        });

        describe('openRunnerSelector function', function() {
            it('openRunnerSelector call open on modal', function() {
                scope.openRunnerSelector();
                expect(modal.open).toHaveBeenCalled();
            });
        });

        describe('run function', function() {
            var runResponse = {
                status: 'OK',
                reportsPath: 'public/this/is/reports/path/index.html'
            };
            it('should set storyRunnerInProgress to true', function() {
                scope.run({});
                expect(scope.storyRunnerInProgress).toEqual(true);
            });
            it('should set showRunnerProgress to true', function() {
                scope.run({});
                expect(scope.showRunnerProgress).toEqual(true);
            });
            it('should set reportsUrl to an empty string', function() {
                scope.run({});
                expect(scope.reportsUrl).toEqual('');
            });
            it('should call POST on /runner/run.json', function() {
                httpBackend.expectPOST('/runner/run.json').respond(runResponse);
                scope.run({});
                httpBackend.flush();
            });
            it('should open error modal in case of an error', function() {
                httpBackend.expectPOST('/runner/run.json').respond(400, '');
                scope.run({});
                httpBackend.flush();
                expect(modal.open).toHaveBeenCalled();
            });
            it('should open error modal in case of a status different than OK', function() {
                httpBackend.expectPOST('/runner/run.json').respond({status: 'NOK'});
                scope.run({});
                httpBackend.flush();
                expect(modal.open).toHaveBeenCalled();
            });
            it('should set storyRunnerInProgress to false after success', function() {
                httpBackend.expectPOST('/runner/run.json').respond(runResponse);
                scope.run({});
                httpBackend.flush();
                expect(scope.storyRunnerInProgress).toEqual(false);
            });
            it('should set storyRunnerSuccess to true after success', function() {
                httpBackend.expectPOST('/runner/run.json').respond(runResponse);
                scope.run({});
                httpBackend.flush();
                expect(scope.storyRunnerSuccess).toEqual(true);
            });
            it('should set storyRunnerInProgress to false after failure', function() {
                httpBackend.expectPOST('/runner/run.json').respond(400, '');
                scope.run({});
                httpBackend.flush();
                expect(scope.storyRunnerInProgress).toEqual(false);
            });
            it('should set storyRunnerSuccess to false after failure', function() {
                httpBackend.expectPOST('/runner/run.json').respond(400, '');
                scope.run({});
                httpBackend.flush();
                expect(scope.storyRunnerSuccess).toEqual(false);
            });
            it('should set reportsUrl', function() {
                httpBackend.expectPOST('/runner/run.json').respond(runResponse);
                scope.run({});
                httpBackend.flush();
                expect(scope.reportsUrl).toEqual('/assets/this/is/reports/path/index.html');
            });
        });

        describe('getRunnerStatusCss function', function() {
            it('should use general getRunnerStatusCss function', function() {
                var expected = getRunnerStatusCss(
                    scope.storyRunnerInProgress,
                    scope.storyRunnerSuccess,
                    (scope.pendingSteps.length > 0));
                expect(scope.getRunnerStatusCss()).toEqual(expected);
            });
        });

        describe('getStoryRunnerStatusText function', function() {
            it('should use general getStoryRunnerStatusText function', function() {
                scope.pendingSteps = pendingSteps;
                var expected = getStoryRunnerStatusText(
                    scope.storyRunnerInProgress,
                    scope.storyRunnerSuccess,
                    scope.pendingSteps.length);
                expect(scope.getStoryRunnerStatusText()).toEqual(expected);
            });
        });

        describe('getRunnerProgressCss function', function() {
            it('should use general getRunnerProgressCss function', function() {
                var expected = getRunnerProgressCss(
                    scope.storyRunnerInProgress
                );
                expect(scope.getRunnerProgressCss()).toEqual(expected);
            });
        });

        describe('apiUrl function', function() {
            it('should return the API url', function() {
                expect(scope.apiUrl()).toMatch('/runner/run.json');
            });
        });

    });

    describe('runnerSelectorCtrl controller', function() {

        var httpBackend, modal, modalInstance;
        var filesWithoutPath = {status: 'OK', files: 'filesWithoutPath'};

        beforeEach(
            inject(function($controller, $httpBackend, $http) {
                modalInstance = {
                    dismiss: jasmine.createSpy('modalInstance.dismiss'),
                    close: jasmine.createSpy('modalInstance.close')
                };
                $controller('runnerSelectorCtrl', {
                    $scope: scope,
                    $http: $http,
                    $modal: modal,
                    $modalInstance: modalInstance
                });
                httpBackend = $httpBackend;
                httpBackend.expectGET('/stories/list.json?path=').respond(filesWithoutPath);
            })
        );

        describe('by default', function() {
            it('dirs should be set to an empty array', function() {
                expect(scope.files.dirs.length).toEqual(0);
            });
            it('stories should be set to an empty array', function() {
                expect(scope.files.stories.length).toEqual(0);
            });
        });

        describe('getStories function', function() {
            it('should be called by the controller with the empty path', function() {
                httpBackend.flush();
                expect(scope.files).toEqual(filesWithoutPath);
            });
        });

        describe('cancel function', function () {
            it('should dismiss the modal', function() {
                scope.cancelRunnerSelector();
                expect(modalInstance.dismiss).toHaveBeenCalledWith('cancel');
            });
        });

        describe('ok function', function () {
            it('should include elements with selected set to true', function() {
                scope.files = {
                    dirs: [{name: 'dir1', selected: true}],
                    stories: [{name: 'story1', selected: true}]
                };
                var expected = {
                    dirs: [{path: 'dir1'}],
                    stories: [{path: 'story1.story'}]
                };
                scope.okRunnerSelector();
                expect(modalInstance.close).toHaveBeenCalledWith(expected);
            });
            it('should ignore elements with selected set to false', function() {
                scope.files = {
                    dirs: [{name: 'dir1', selected: false}],
                    stories: [{name: 'story1.story', selected: false}]
                };
                var expected = {
                    dirs: [],
                    stories: []
                };
                scope.okRunnerSelector();
                expect(modalInstance.close).toHaveBeenCalledWith(expected);
            });
            it('should ignore elements that selected undefined', function() {
                scope.files = {
                    dirs: [{name: 'dir1'}],
                    stories: [{name: 'story1.story'}]
                };
                var expected = {
                    dirs: [],
                    stories: []
                };
                scope.okRunnerSelector();
                expect(modalInstance.close).toHaveBeenCalledWith(expected);
            });
            it('should use full path', function() {
                scope.rootPath = 'this/is/dir/';
                scope.files = {
                    dirs: [],
                    stories: [{name: 'story1', selected: true}]
                };
                var expected = {
                    dirs: [],
                    stories: [{path: 'this/is/dir/story1.story'}]
                };
                scope.okRunnerSelector();
                expect(modalInstance.close).toHaveBeenCalledWith(expected);
            });
            it('should close the modal with selected files', function() {
                scope.files = {
                    dirs: [{name: 'dir1', selected: true}, {name: 'dir2', selected: false}, {name: 'dir3'}],
                    stories: [{name: 'story1', selected: true}, {name: 'story2', selected: true}, {name: 'story2'}]
                };
                var expected = {
                    dirs: [{path: 'dir1'}],
                    stories: [{path: 'story1.story'}, {path: 'story2.story'}]
                };
                scope.okRunnerSelector();
                expect(modalInstance.close).toHaveBeenCalledWith(expected);
            });
        });

        describe('allowToPrevDir function', function() {
            it('should return true when rootPath is NOT an empty string', function() {
                scope.rootPath = 'this/is/path';
                expect(scope.allowToPrevDir()).toEqual(true);
            });
            it('should return false when rootPath is an empty string', function() {
                scope.rootPath = '';
                expect(scope.allowToPrevDir()).toEqual(false);
            });
        });

        describe('canContinue function', function() {
            it('should return false when there is NO directory or story selected', function() {
                scope.files = {
                    dirs: [{name: 'dir1', selected: false}],
                    stories: [{name: 'story1', selected: false}]
                };
                expect(scope.canContinue()).toEqual(false);
            });
            it('should return true when there is at least one directory selected', function() {
                scope.files = {
                    dirs: [{name: 'dir1', selected: true}],
                    stories: [{name: 'story1', selected: false}]
                };
                expect(scope.canContinue()).toEqual(true);
            });
            it('should return true when there is at least one story selected', function() {
                scope.files = {
                    dirs: [{name: 'dir1', selected: false}],
                    stories: [{name: 'story1', selected: true}]
                };
                expect(scope.canContinue()).toEqual(true);
            });
        });

    });

    describe('runnerParamsCtrl controller', function() {

        var modalInstance, data, cookieStore, scope, classes;
        var cookieValue = 'value1';

        beforeEach(
            inject(function($rootScope, $injector, $controller) {
                scope = $rootScope.$new();
                classes = [{
                    fullName: 'full.name.of.the.class',
                    params: [{key: 'key1'}, {key: 'key2'}]
                }];
                data = {classes: classes};
                cookieStore = $injector.get('$cookieStore');
                cookieStore.put(classes[0].fullName + "." + classes[0].params[0].key, cookieValue);
                cookieStore.put(classes[0].fullName + "." + classes[0].params[1].key, 'value2');
                modalInstance = {
                    dismiss: jasmine.createSpy('modalInstance.dismiss'),
                    close: jasmine.createSpy('modalInstance.close')
                };
                $controller('runnerParamsCtrl', {
                    $scope: scope ,
                    $modalInstance: modalInstance,
                    $cookieStore: cookieStore,
                    data: data,
                    showGetApi: true});
            })
        );

        describe('by default', function() {
            it('should put classes with values from cookies to the scope', function() {
                var expected = [{
                    fullName: 'full.name.of.the.class',
                    params: [{key: 'key1', value: 'value1'}, {key: 'key2', value: 'value2'}]
                }];
                expect(scope.classes).toEqual(expected);
            });
        });

        describe('hasParams function', function() {
            it('should return true if it contains at least one parameter', function() {
                var classEntry = {params: [{param: "param1"}, {param: "param2"}]};
                expect(scope.hasParams(classEntry)).toEqual(true);
            });
            it('should return false if it does NOT contain parameters', function() {
                var classEntry = {params: []};
                expect(scope.hasParams(classEntry)).toEqual(false);
            });
        });

        describe('paramElementId function', function() {
            it('should return first letter of the className as lower case', function() {
                var actual = scope.paramElementId("ThisIsClassName", "thisIsParamKey");
                expect(actual).toMatch(/thisIsClassName/);
            });
            it('should return first letter of the paramKey as upper case', function() {
                var actual = scope.paramElementId("ThisIsClassName", "thisIsParamKey");
                expect(actual).toMatch(/ThisIsParamKey/);
            });
        });

        describe('cancel function', function () {
            it('should dismiss the modal', function() {
                scope.cancel();
                expect(modalInstance.dismiss).toHaveBeenCalledWith('cancel');
            })
        });

        describe('ok function', function() {
            it('should close the modal and return data', function() {
                scope.ok();
                expect(modalInstance.close).toHaveBeenCalledWith({action: 'run', classes: classes});
            });
        });

        describe('showGetApi function', function() {
            it('should return showGetApi value', function() {
                expect(scope.showGetApi()).toEqual(true);
            });
        });

        describe('getApi function', function() {
            it('should close the modal and return data with action set to api', function() {
                scope.getApi();
                expect(modalInstance.close).toHaveBeenCalledWith({action: 'api', classes: classes});
            });
        });

    });

});
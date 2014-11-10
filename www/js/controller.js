/**
 * Created by Dev on 7/11/14.
 */

angular.module('ionicApp', ['ionic'])

    .config(function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('signin', {
                url: '/sign-in',
                templateUrl: 'templates/sign-in.html',
                controller: 'SignInCtrl'
            })
            .state('forgotpassword', {
                url: '/forgot-password',
                templateUrl: 'templates/sign-in.html'
            })
            .state('tabs', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html',
                controller:'tabCtrl'
            })
            .state('tabs.home', {
                url: '/memberList',
                views: {
                    'home-tab': {
                        templateUrl: 'templates/memberList.html',
                        controller: 'memberListCtrl'
                    }
                }
            })
            .state('tabs.facts', {
                url: '/facts',
                views: {
                    'home-tab': {
                        templateUrl: 'templates/facts.html'
                    }
                }
            })
            .state('tabs.facts2', {
                url: '/facts2',
                views: {
                    'home-tab': {
                        templateUrl: 'templates/facts2.html'
                    }
                }
            })
            .state('tabs.about', {
                url: '/about',
                views: {
                    'about-tab': {
                        templateUrl: 'templates/about.html'
                    }
                }
            })
            .state('tabs.navstack', {
                url: '/navstack',
                views: {
                    'about-tab': {
                        templateUrl: 'templates/nav-stack.html'
                    }
                }
            })
            .state('tabs.contact', {
                url: '/contact',
                views: {
                    'contact-tab': {
                        templateUrl: 'templates/contact.html'
                    }
                }
            });


        $urlRouterProvider.otherwise('/sign-in');

    })

    .run(function($ionicPlatform , $rootScope ,$state) {


        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if(window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if(window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
        $rootScope.$on('$stateChangeStart', function(event, toState ) {




            console.log("check")
            console.log(toState);

            console.log("check")
           // console.log(window.localStorage.toState)
            if(toState.name == "signin")
            {
               if(window.localStorage.LoggedIn == "true")
               {
              $state.go('tabs.home');
            }
            }




        })
    })

    .controller('SignInCtrl', function($scope, $state,$http) {
        $scope.user={};

        $scope.signIn = function(isValid) {

            //alert(conferenceForm.$valid);
       if(isValid)
       {
           $scope.submitted=false;

           console.log('Sign-In');
           console.log($scope.user);
           $http.post('http://seyasoftech.com/conference/Backend/index.php/api/company/create', $scope.user).success(function(response)
           {
               alert('post')
               window.localStorage.LoggedIn = true;
               console.log(response)
           });
           $state.go('tabs.home');
       }
            else
       {
           $scope.submitted=true;
           alert('true')


       }
        };

    })

    .controller('memberListCtrl', function($scope , $http) {

        $scope.conferenceFormData={};
        console.log('memberListCtrl');
        $http.get('http://seyasoftech.com/conference/Backend/index.php/api/company/list').success(function(response)
        {
         console.log(response)
        console.log(response.result)
           $scope.items=response.result;


        })



;    })
    .controller('tabCtrl', function($scope , $http , $state) {

        $scope.signOut = function() {

            window.localStorage.LoggedIn = false;
            $state.go('signin')


        }

        });


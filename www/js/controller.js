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
                templateUrl: 'templates/forgot-password.html'
            })
            .state('tabs', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })
            .state('tabs.home', {
                url: '/home',
                views: {
                    'home-tab': {
                        templateUrl: 'templates/home.html',
                        controller: 'HomeTabCtrl'
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


        $urlRouterProvider.otherwise('/home');

    })

    .controller('SignInCtrl', function($scope, $state,$http) {
        $scope.user={};

        $scope.signIn = function() {
        // alert(conferenceForm.$valid)
            console.log('Sign-In');
            alert(0)
          //$state.go('tabs.home');
            console.log($scope.user);
           $http.post('http://seyasoftech.com/conference/Backend/index.php/api/company/create', $scope.user).success(function(response)
            {
                alert('post')
                console.log(response)
            });
        };

    })

    .controller('HomeTabCtrl', function($scope , $http) {

        $scope.conferenceFormData={};
        console.log('HomeTabCtrl');
        $http.get('http://seyasoftech.com/conference/Backend/index.php/api/company/list').success(function(response)
        {
         console.log(response)
        console.log(response.result)
           $scope.items=response.result;
        })

        $scope.items=[
            {id:1 , companyName:'CompanyName1' , emailId:'email Id 1',phoneNumber:'phonenumber 1' , aboutYour:'details of mine'},
            {id:2 , companyName:'CompanyName2' , emailId:'email Id 2',phoneNumber:'phonenumber 2' , aboutYour:'details of mine'},
            {id:3 , companyName:'CompanyName3' , emailId:'email Id 3',phoneNumber:'phonenumber 3' , aboutYour:'details of mine'},
            {id:4 , companyName:'CompanyName4' , emailId:'email Id 4',phoneNumber:'phonenumber 4' , aboutYour:'details of mine'}

        ]
;    });

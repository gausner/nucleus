const app = angular.module('app', ['ui.bootstrap', "ngRoute"]);

app.config(function ($routeProvider, $locationProvider) {

    $routeProvider
        .when("/main", {
            templateUrl: "views/main.html"
        })
        .when("/summary", {
            templateUrl: "views/summary.html"
        }).otherwise({redirectTo: '/main'});
});
/**
 * Created by pguindon on 2017-04-29.
 */



app.directive('projectResource', function () {
    return {
        templateUrl: './views/card.html'
    };
});

app.directive('phaseCard', function () {
    return {
        templateUrl: './views/phase.html'
    };
});

app.directive('showtab',
    function () {
        return {
            link: function (scope, element, attrs) {
                element.click(function(e) {
                    e.preventDefault();
                    $(element).tab('show');
                });
            }
        };
    });

const roles = [
    {
        role: "QA", costs: [
        {cost: "dl", amount: "30"},
        {cost: "bill", amount: "35"}
    ]
    },
    {
        role: "Dev", costs: [
        {cost: "dl", amount: "40"},
        {cost: "bill", amount: "45"}
    ]
    }
];

app.controller('MainCtrl', function ($scope, $location, $anchorScroll, $timeout) {


    this.price = {};
    this.quantity = "QTY: ";
    this.price.resources = [];
    this.totalPrice = 0;

    this.data = {};
    // Creating a local copy of selectedRole because the = operator creates a new reference to the same data.
    this.data.roles = JSON.parse(JSON.stringify(roles));

    this.items = [
        {role: "QA Tech/Specialist I", rate: "20"},
        {role: "QA Tech/Specialist II", rate: "21"},
        {role: "QA Tech/Specialist III", rate: "22"},
        {role: "SDET", rate: "23"},
        {role: "Java Developer", rate: "24"}
    ];

    this.selectOption = function (choice) {
        this.role = choice.role;
        this.rate = choice.rate;
        this.query = "";
    };

    this.countResource = function () {
        this.quantityAsNumber = Number(this.quantity.match(/\d+/));
        this.result = this.quantityAsNumber * this.rate;
    };

    this.addResource = function () {
        this.price.resources.unshift({
            resource: this.selectedRole,
            resourceName: this.resourceName,
            resourceAllocation: this.resourceAllocation
        });

        this.data.roles = JSON.parse(JSON.stringify(roles));
    };

// jQuery
    $('.dropdown-menu').find('input').click(function (e) {
        e.stopPropagation();
    });


    var jsonfile = require('jsonfile');

    var file = './data.json';
// var obj = {name: 'JP'};


    const {dialog} = require('electron').remote;
    this.export = function () {
        jsonfile.writeFile((dialog.showSaveDialog()), this.price, function (err) {
            console.error(err)
        })
    };

    //Anchor scrolling
    $scope.scrollTo = function(id) {
        $timeout(function() {
            $location.hash(id);
            $anchorScroll();
        }, 50)

    };


})
;


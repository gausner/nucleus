const app = angular.module('app', ['ui.bootstrap', "ngRoute"]);

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when("/main", {
            templateUrl: "views/main.html"
        })
        .when("/summary", {
            templateUrl: "views/summary.html"
        })
        .otherwise({redirectTo: '/main'});
});
/**
 * Created by pguindon on 2017-04-29.
 */



app.directive('myCustomer', function () {
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

app.controller('MainCtrl', function ($scope, $location, $anchorScroll, $timeout) {

    this.price = {};
    this.quantity = "QTY: ";
    this.price.resources = [];
    this.totalPrice = 0;

    this.data = {};
    this.data.roles = [
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

        console.log("dd " + this.selectedRole);

        this.price.resources.unshift({
            role: this.selectedRole
        });

        //console.log("ff " + this.price.resources[0].role.costs[1].amount)


        // this.price.resources.unshift({
        //     role: this.role,
        //     rate: this.rate,
        //     quantity: this.quantityAsNumber,
        //     total: this.result
        // });

        this.totalPrice = this.totalPrice + this.result;
        this.role = "";
        this.rate = "";
        this.quantity = "QTY:";
        this.quantityAsNumber = "";
        this.result = "";
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


const app = angular.module('app', ['ui.bootstrap',"ngRoute"]);

app.config(function($routeProvider,$locationProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "views/main.html"
        })
        .when("/summary", {
            templateUrl : "views/summary.html",
            controller: 'MainCtrl'
        })
        .otherwise({redirectTo : '/'});
});/**
 * Created by pguindon on 2017-04-29.
 */

app.controller('MainCtrl', function () {

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
        this.price.resources.unshift({
            role: this.role,
            rate: this.rate,
            quantity: this.quantityAsNumber,
            total: this.result
        });

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
})
;


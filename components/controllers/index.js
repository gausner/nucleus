const app = angular.module('app', ['ui.bootstrap', "ngRoute", "ngMessages"]);

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
app.directive('phasebar', function () {
    return {
        templateUrl: './views/progressbar.html'
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
        {cost: "dl", amount: 30},
        {cost: "bill", amount: 35}
    ]
    },
    {
        role: "Dev", costs: [
        {cost: "dl", amount: 40},
        {cost: "bill", amount: 45}
    ]
    }
];

app.controller('MainCtrl', function ($scope, $location, $anchorScroll, $timeout) {
    this.price = {};
    this.quantity = "QTY: ";
    this.price.resources = [];
    this.price.phases = [];
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
        this.resourceName = "";
        this.resourceAllocation = "";
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





    //hacky hacky - nothing to see here

    function stringGen(len)
    {
        var text = "";

        var charset = "abcdefghijklmnopqrstuvwxyz";

        for( var i=0; i < len; i++ )
            text += charset.charAt(Math.floor(Math.random() * charset.length));

        return text;
    }

    this.addPhases = function() {


        this.price.phases.unshift({
            name: this.phaseName,
            weeks: this.phaseWeek,
            id: stringGen(5)
        });

        this.phaseName ="";
        this.phaseWeek ="";

        addCss(this.price.phases);
    };


    function addCss(phases) {

        var html = [
            {progress: "progress-bar-success"},
            {progress: "progress-bar-info"},
            {progress: "progress-bar-warning"},
            {progress: "progress-bar-danger"}
        ];

        for(var i=0; i < phases.length; i++){
            if (i >= 4)
            {
                var x = 4;
                x = i - x;
                phases[i].css = html[x].progress;
            }
            else {
                phases[i].css = html[i].progress;
            }

        }
    };

    $scope.addWeeks = function(phase,phases) {
        var sum = 0;
        for(var i=0; i < phases.length; i++){
            sum += parseInt(phases[i].weeks);
        }
        var width;
        sum = phase.weeks / sum;
        sum = sum * 100;
        width = "width: "+sum+"%";
        console.log(width);
        return width;
    };

})
;


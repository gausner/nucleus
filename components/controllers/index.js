const app = angular.module('app', ['ui.bootstrap', 'chart.js', "ngRoute", "ngMessages"]);

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

app.directive('editResource', function () {
    return {
        templateUrl: './views/editcard.html'
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
        role: "SDET Level 1",
        costs: [
            {cost: "dl", amount: 45},
            {cost: "bill", amount: 75}
        ]
    },
    {
        role: "SDET Level 2",
        costs: [
            {cost: "dl", amount: 55},
            {cost: "bill", amount: 100}
        ]
    },
    {
        role: "SDET Level 3",
        costs: [
            {cost: "dl", amount: 65},
            {cost: "bill", amount: 120}
        ]
    },
    {
        role: "DEV Level 1",
        costs: [
            {cost: "dl", amount: 45},
            {cost: "bill", amount: 75}
        ]
    },
    {
        role: "DEV Level 2",
        costs: [
            {cost: "dl", amount: 55},
            {cost: "bill", amount: 100}
        ]
    },
    {
        role: "DEV Level 3",
        costs: [
            {cost: "dl", amount: 65},
            {cost: "bill", amount: 120}
        ]
    },
    {
        role: "BA Level 1",
        costs: [
            {cost: "dl", amount: 45},
            {cost: "bill", amount: 75}
        ]
    },
    {
        role: "BA Level 2",
        costs: [
            {cost: "dl", amount: 55},
            {cost: "bill", amount: 100}
        ]
    },
    {
        role: "BA Level 3",
        costs: [
            {cost: "dl", amount: 65},
            {cost: "bill", amount: 120}
        ]
    },
    {
        role: "Architects",
        costs: [
            {cost: "dl", amount: 75},
            {cost: "bill", amount: 200}
        ]
    },
    {
        role: "DM",
        costs: [
            {cost: "dl", amount: 75},
            {cost: "bill", amount: 200}
        ]
    },
    {
        role: "TSM",
        costs: [
            {cost: "dl", amount: 75},
            {cost: "bill", amount: 200}
        ]
    }
];

app.controller('MainCtrl', function ($scope, $location, $anchorScroll, $timeout) {


    this.price = {};
    this.quantity = "QTY: ";
    this.price.resources = [];
    this.price.phases = [];
    this.totalPrice = 0;

    // DEBUG: having a resource without registration
    // this.price.resources.unshift({
    //     resource: roles[0],
    //     resourceName: "TEST",
    //     resourceAllocation: 42
    // });

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
            resourceAllocation: this.resourceAllocation,
            resourcePhase:this.selectedRolePhase.name
        });

        if (this.selectedRolePhase.resources) {
            this.selectedRolePhase.resources.push({name:this.resourceName});
        }
        else {
            this.selectedRolePhase.resources = [];
            this.selectedRolePhase.resources.push({name:this.resourceName});
        }

        this.data.roles = JSON.parse(JSON.stringify(roles));
        this.resourceName = "";
        this.resourceAllocation = "";
    };

    this.deleteResource = function(index){
        this.price.resources.splice(index, 1);
    };

    this.editResource = function(index, event){
        this.oldObject = JSON.parse(JSON.stringify(this.price.resources[index]));
        this.resourceId = event.target.id;
        this.resourceIndex = index;
        this.showEditor = true;
    };

    this.saveAfterEditing = function(){
        this.showEditor = false;
    };

    this.cancelEditing = function(){
        this.price.resources[this.resourceIndex] = this.oldObject;
        this.showEditor = false;
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


        this.price.phases.push({
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
    }

    $scope.addWeeks = function(phase,phases) {
        var sum = 0;
        for(var i=0; i < phases.length; i++){
            sum += parseInt(phases[i].weeks);
        }
        var width;
        sum = phase.weeks / sum;
        sum = sum * 100;
        width = "width: "+sum+"%";
        return width;
    };


    $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
    $scope.chartdata = [300, 500, 1000];

    $scope.wavelabels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.waveseries = ['Series A', 'Series B'];
    $scope.wavedata = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
    ];
    $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };
    $scope.wavedatasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
    $scope.waveoptions = {
        scales: {
            yAxes: [
                {
                    id: 'y-axis-1',
                    type: 'linear',
                    display: true,
                    position: 'left'
                },
                {
                    id: 'y-axis-2',
                    type: 'linear',
                    display: true,
                    position: 'right'
                }
            ]
        }
    };







})
;


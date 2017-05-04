const app = angular.module('app', ['ui.bootstrap', 'chart.js', "ngRoute", "ngMessages"]);

app.config(function ($routeProvider, $locationProvider) {

    $routeProvider
        .when("/main", {
            templateUrl: "views/main.html"
        })
        .when("/summary", {
            templateUrl: "views/summary.html"

        })
        .when("/repo", {
            templateUrl: "views/repo.html"

        })
        .otherwise({ redirectTo: '/main' });
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
                element.click(function (e) {
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
            { cost: "dl", amount: 45 },
            { cost: "bill", amount: 75 }
        ]
    },
    {
        role: "SDET Level 2",
        costs: [
            { cost: "dl", amount: 55 },
            { cost: "bill", amount: 100 }
        ]
    },
    {
        role: "SDET Level 3",
        costs: [
            { cost: "dl", amount: 65 },
            { cost: "bill", amount: 120 }
        ]
    },
    {
        role: "DEV Level 1",
        costs: [
            { cost: "dl", amount: 45 },
            { cost: "bill", amount: 75 }
        ]
    },
    {
        role: "DEV Level 2",
        costs: [
            { cost: "dl", amount: 55 },
            { cost: "bill", amount: 100 }
        ]
    },
    {
        role: "DEV Level 3",
        costs: [
            { cost: "dl", amount: 65 },
            { cost: "bill", amount: 120 }
        ]
    },
    {
        role: "BA Level 1",
        costs: [
            { cost: "dl", amount: 45 },
            { cost: "bill", amount: 75 }
        ]
    },
    {
        role: "BA Level 2",
        costs: [
            { cost: "dl", amount: 55 },
            { cost: "bill", amount: 100 }
        ]
    },
    {
        role: "BA Level 3",
        costs: [
            { cost: "dl", amount: 65 },
            { cost: "bill", amount: 120 }
        ]
    },
    {
        role: "Architects",
        costs: [
            { cost: "dl", amount: 75 },
            { cost: "bill", amount: 200 }
        ]
    },
    {
        role: "DM",
        costs: [
            { cost: "dl", amount: 75 },
            { cost: "bill", amount: 200 }
        ]
    },
    {
        role: "TSM",
        costs: [
            { cost: "dl", amount: 75 },
            { cost: "bill", amount: 200 }
        ]
    }
];

app.controller('priceSheetCtrl', function ($scope) {
    $scope.public_sheets = [
        { "Name": "SDET QA PS 01", "Practice_Area": "QA Practice", "Owner": "John Doe", "Version": "1", "Last_Modified": "01:12:17", "Status": "Active" },
        { "Name": "UI Dev", "Practice_Area": "ADM", "Owner": "Jane Doe", "Version": "1", "Last_Modified": "01:12:17", "Status": "Active" },
        { "Name": ".NET Dev", "Practice_Area": "ADM", "Owner": "McAllaster Doe", "Version": "1", "Last_Modified": "01:12:17", "Status": "In-Active" },
        { "Name": "SDET QA PS 02", "Practice_Area": "ADM", "Owner": "Sanjay Doe", "Version": "1", "Last_Modified": "01:12:17", "Status": "Review" }
    ];

    $scope.statusClass = function (status) {
        if(status === 'Active') {
            return 'label-success';
        } else if(status === 'Review') {
            return 'label-warning';
        } else {
            return 'label-danger';
        }
    }
});

app.controller('MainCtrl', function ($scope, $location, $anchorScroll, $timeout) {


    this.price = {};
    this.quantity = "QTY: ";
    this.price.resources = [];
    this.price.phases = [];
    this.totalPrice = 0;

    // DEBUG: having a phase without creation
    this.price.phases.push({
        name: "TestPhase",
        weeks: 2,
        id: stringGen(5)
    });

    // this.price.phases.push({
    //     name: "TestPhase1",
    //     weeks: 3,
    //     id: stringGen(5)
    // });

    // // DEBUG: having a resource without adding
    // this.price.resources.unshift({
    //     resource: roles[0],
    //     resourceName: "TEST",
    //     resourceAllocation: 10,
    //     resourcePhaseWeeks: this.price.phases[0].weeks,
    //     resourcePhase: this.price.phases[0].name
    // });
    //
    // this.price.resources.unshift({
    //     resource: roles[1],
    //     resourceName: "TEST1",
    //     resourceAllocation: 30,
    //     resourcePhase: this.price.phases[1].name,
    //     resourcePhaseWeeks: this.price.phases[1].weeks
    // });

    this.countGrossRevenuPhase = function (phase) {
        let grossRevenu = 0;

        for (let i = 0; i < this.price.resources.length; i++) {
            if (this.price.resources[i].resourcePhase === phase.name) {
                const bill = this.price.resources[i].resource.costs[1].amount;
                const weeks = this.price.resources[i].resourcePhaseWeeks;
                const allocation = this.price.resources[i].resourceAllocation;

                grossRevenu = grossRevenu + (bill * weeks * 40) / 100 * allocation;
            }
        }

        return !isNaN(grossRevenu) ? Math.round(grossRevenu * 100) / 100 : "";
    };

    this.countGrossRevenu = function () {
        let grossRevenu = 0;

        for (let i = 0; i < this.price.resources.length; i++) {
            const bill = this.price.resources[i].resource.costs[1].amount;
            const weeks = this.price.resources[i].resourcePhaseWeeks;
            const allocation = this.price.resources[i].resourceAllocation;

            grossRevenu = grossRevenu + (bill * weeks * 40) / 100 * allocation;
        }

        return !isNaN(grossRevenu) ? Math.round(grossRevenu * 100) / 100 : "";
    };

    this.countProfit = function () {
        return this.countGrossRevenu() - this.countLabour();
    };

    this.countProfitPhase = function (phase) {
        return this.countGrossRevenuPhase(phase) - this.countLabourPhase(phase);
    };

    this.countProfitPercent = function () {
        const percentage = this.countLabour() / this.countGrossRevenu();
        return !isNaN(percentage) ? (percentage * 100).toFixed(2) : "";
    };

    this.countProfitPercentPhase = function (phase) {
        const percentage = this.countLabourPhase(phase) / this.countGrossRevenuPhase(phase);
        return !isNaN(percentage) ? (percentage * 100).toFixed(2) : "";
    };

    this.countLabourPhase = function (phase) {
        let grossRevenu = 0;

        for (let i = 0; i < this.price.resources.length; i++) {
            if (this.price.resources[i].resourcePhase === phase.name) {
                const dl = this.price.resources[i].resource.costs[0].amount;
                const weeks = this.price.resources[i].resourcePhaseWeeks;
                const allocation = this.price.resources[i].resourceAllocation;

                grossRevenu = grossRevenu + (dl * weeks * 40) / 100 * allocation;
            }
        }
        return !isNaN(grossRevenu) ? Math.round(grossRevenu * 100) / 100 : "";
    };

    this.countLabour = function () {
        let grossRevenu = 0;

        for (let i = 0; i < this.price.resources.length; i++) {
            const dl = this.price.resources[i].resource.costs[0].amount;
            const weeks = this.price.resources[i].resourcePhaseWeeks;
            const allocation = this.price.resources[i].resourceAllocation;

            grossRevenu = grossRevenu + (dl * weeks * 40) / 100 * allocation;
        }

        return !isNaN(grossRevenu) ? Math.round(grossRevenu * 100) / 100 : "";
    };

    this.countGp = function (selectedRole) {
        if (selectedRole) {
            var dl = selectedRole.costs[0].amount;
            var bill = selectedRole.costs[1].amount;
        }

        let gp = dl / bill * 100;
        return !isNaN(gp) ? Math.round(gp * 100) / 100 : "";
    };

    this.data = {};
    // Creating a local copy of selectedRole because the = operator creates a new reference to the same data.
    this.data.roles = JSON.parse(JSON.stringify(roles));

    this.items = [
        { role: "QA Tech/Specialist I", rate: "20" },
        { role: "QA Tech/Specialist II", rate: "21" },
        { role: "QA Tech/Specialist III", rate: "22" },
        { role: "SDET", rate: "23" },
        { role: "Java Developer", rate: "24" }
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
            resourcePhase: this.selectedRolePhase.name,
            resourcePhaseWeeks: this.selectedRolePhase.weeks
        });

        if (this.selectedRolePhase.resources) {
            this.selectedRolePhase.resources.push({ name: this.resourceName });
        }
        else {
            this.selectedRolePhase.resources = [];
            this.selectedRolePhase.resources.push({ name: this.resourceName });
        }

        this.data.roles = JSON.parse(JSON.stringify(roles));
        this.resourceName = "";
        this.resourceAllocation = "";
    };

    this.deleteResource = function (index) {
        this.price.resources.splice(index, 1);
    };

    this.updatePhase = function (index) {
        for (var i = 0; i < this.price.phases.length; i++) {
            // Delete resource from old phase
            if (this.price.phases[i].name === this.resourceForUpdatePhase.resourcePhase) {
                for (var j = 0; j < this.price.phases[i].resources.length; j++) {
                    if (this.price.phases[i].resources[j].name === this.price.resources[index].resourceName) {
                        this.price.phases[i].resources.splice(j, 1);
                    }
                }
            }
            // add resource to new phase
            if (this.price.phases[i].name === this.price.resources[index].resourcePhase) {
                // this.price.phases[i].resources = []
                this.price.phases[i].resources.unshift({ name: this.price.resources[index].resourceName });
            }
        }

        this.resourceForUpdatePhase.resourcePhase = this.price.resources[index].resourcePhase;
    };

    this.editResource = function (index, event) {
        this.oldObject = JSON.parse(JSON.stringify(this.price.resources[index]));
        this.resourceForUpdatePhase = JSON.parse(JSON.stringify(this.price.resources[index]));
        this.resourceId = event.target.id;
        this.resourceIndex = index;
        this.showEditor = true;
    };

    this.saveAfterEditing = function () {
        this.showEditor = false;
    };

    this.cancelEditing = function () {
        this.price.resources[this.resourceIndex] = this.oldObject;
        this.updatePhase(this.resourceIndex);
        this.showEditor = false;
    };

    // jQuery
    $('.dropdown-menu').find('input').click(function (e) {
        e.stopPropagation();
    });


    var jsonfile = require('jsonfile');

    var file = './data.json';
    // var obj = {name: 'JP'};


    const { dialog } = require('electron').remote;
    this.export = function () {
        jsonfile.writeFile((dialog.showSaveDialog()), this.price, function (err) {
            console.error(err)
        })
    };

    //Anchor scrolling
    $scope.scrollTo = function (id) {
        $timeout(function () {
            $location.hash(id);
            $anchorScroll();
        }, 50)

    };





    //hacky hacky - nothing to see here

    function stringGen(len) {
        var text = "";

        var charset = "abcdefghijklmnopqrstuvwxyz";

        for (var i = 0; i < len; i++)
            text += charset.charAt(Math.floor(Math.random() * charset.length));

        return text;
    }

    this.addPhases = function () {


        this.price.phases.push({
            name: this.phaseName,
            weeks: this.phaseWeek,
            id: stringGen(5)
        });

        this.phaseName = "";
        this.phaseWeek = "";

        addCss(this.price.phases);
    };


    function addCss(phases) {

        var html = [
            { progress: "progress-bar-success" },
            { progress: "progress-bar-info" },
            { progress: "progress-bar-warning" },
            { progress: "progress-bar-danger" }
        ];

        for (var i = 0; i < phases.length; i++) {
            if (i >= 4) {
                var x = 4;
                x = i - x;
                phases[i].css = html[x].progress;
            }
            else {
                phases[i].css = html[i].progress;
            }

        }
    }

    $scope.addWeeks = function (phase, phases) {
        var sum = 0;
        for (var i = 0; i < phases.length; i++) {
            sum += parseInt(phases[i].weeks);
        }
        var width;
        sum = phase.weeks / sum;
        sum = sum * 100;
        width = "width: " + sum + "%";
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

    $scope.barlabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    $scope.barseries = ['Series A', 'Series B'];

    $scope.bardata = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
    ];





})
    ;


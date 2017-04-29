const app = angular.module('app', ['ui.bootstrap']);

app.controller('MainCtrl', function () {

    this.price = [];
    this.quantity = "QTY: ";
    this.price.resources = [];
    this.totalPrice = 0;

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
        this.resources.unshift({
            role: this.role,
            rate: this.rate,
            quantity: this.quantityAsNumber,
            total: this.result,
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
});


const app = angular.module('app-login', []);

function UserInfo(username, password) {
    this.username = username;
    this.password = password;
}

var userInfo = [];
userInfo.push(new UserInfo("admin", "admin"));


app.controller('login', function ($scope, $location, $anchorScroll) {
    this.signUp = function () {
        if (this.username && this.password) {
            userInfo.push(new UserInfo(this.username, this.password));
            document.location.href = 'index.html';
        }
    }

    this.signIn = function () {
        for (var i = 0; i < userInfo.length; i++) {
            if (userInfo[i].username === this.username && userInfo[i].password === this.password) {
                document.location.href = 'index.html'
                return;
            }
        }
        console.log("Invalid Login Credentials");
    }
});

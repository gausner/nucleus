const app = angular.module('app-login', []);

function UserInfo(firstname, lastname, email, username, password) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.username = username;
    this.password = password;
}

var userInfo = [];
//default admin created at start
userInfo.push(new UserInfo("Admin", "Admin", "admin@nucleus.tek.ca", "admin", "admin"));

function isUserFound(username) {
    for (var i = 0; i < userInfo.length; i++) {
        if (userInfo[i].username === username)
            return true;
    }
    return false;
}


app.controller('login', function ($scope, $location, $anchorScroll) {

    this.signIn = function () {
        for (var i = 0; i < userInfo.length; i++) {
            console.log(JSON.stringify(userInfo[i]));
            if (userInfo[i].username === this.username && userInfo[i].password === this.password) {
                document.location.href = 'index.html'
                return;
            }
        }
        console.log("Invalid Login Credentials");
    }

    this.signUp = function () {
        $('#alert-msg').before('');
        console.log(this.username);
        console.log(this.password);
        if (this.username && this.password && !isUserFound(this.username)) {
            event.preventDefault()
            document.location.href = "index.html";
            var currentUserInfo = new UserInfo(this.firstname, this.lastname, this.email, this.username, this.password)
            userInfo.push(currentUserInfo);
            console.log("Current user saved: " + JSON.stringify(currentUserInfo))
            return;
        } else if (isUserFound(this.username)) {
            $('#alert-msg').after('<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert">x</button>User Already Exists!</div>');
        } else {
            $('#alert-msg').after('<div class="alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert">x</button>Username and Password fields are mandatory</div>');
        }
        setTimeout(function () {
            $('.alert').fadeOut('slow');
        }, 3000
        );
    }

});

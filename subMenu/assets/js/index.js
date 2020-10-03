/*회원가입*/
function signUp() {
    let id = $(".emails").val();
    let pw = $(".userPW").val();
    let pwCheck = $(".userPWCheck").val();

    if(pw != pwCheck) {
        alert("Password does not match the confirm Password, Try Again");
        return;
    }
    else {
        firebase.auth().createUserWithEmailAndPassword(id, pw)
            .then(() => {
                alert('회원가입이 완료되었습니다.');
                location.href = "login.html";
            })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(error.code)
            });
    }
}
/*로그인 기능*/
function signIn() {
    let emails = $(".emails").val();
    let password = $(".passwords").val();

    firebase.auth().signInWithEmailAndPassword(emails, password).then(function () {
        alert("Login Success!");
        location.href = "diary.html";
    })
    .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(error.code)
    });
}

/*로그아웃*/
function logOut() {
    let islogout = firebase.auth().currentUser;
    if(!islogout) {
        alert("로그아웃 상태입니다.");
    }
    else {
        let logout = confirm("로그아웃 하시겠습니까?");
        if(logout) {
            firebase.auth().signOut().then(function () {
                alert("로그아웃 되었습니다.");
                location.href = "diary.html";
            });
        }
        else {return;}
    }

}

/*로그인 여부*/
function isLogin() {
    var user = firebase.auth().currentUser;
    if(!user) {
        alert("로그인을 해주세요!");
        let toSignIn = confirm("로그인 페이지로 이동하시겠습니까?");
        if(toSignIn) {
            location.href = "login.html";
        }
        else {return;}
    }
}
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
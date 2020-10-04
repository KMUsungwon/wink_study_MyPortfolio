/*Session Login function*/
function sessionLogin() {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(function() {
            return signIn();
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
        });
}



/*signUp.html*/
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
/*login.html*/
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
/*diary.html*/
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

/*로그인 여부 및 diary 게시판 작성 권한 기능 구현*/
function isLogin() {
    let user = firebase.auth().currentUser;
    if(!user) {
        alert("로그인을 해주세요!");
        let toSignIn = confirm("로그인 페이지로 이동하시겠습니까?");
        if(toSignIn) {
            location.href = "login.html";
        }
        else {return;}
    }
    else {
        let email = user.email;
        if(email != "sungwontoto@kookmin.ac.kr") {
            alert("작성 권한이 없습니다!");
            return;
        }
        else {
            let storyBoard = confirm("게시물을 작성하시겠습니까?");
            if(storyBoard) {location.href = "./assets/html/boardForm.html";}
            else {return;}
        }
    }
}

/*boardForm.html*/

/*Back to the diary.html*/
function goDiary() {location.href = "../../diary.html";}

/*boardForm.html write board codes*/

function start() {
    let subjects = $('#subject').val();
    let days = $('#day').val();
    let contents = $('#content').val();
    writeBoard(days, subjects, contents);
    alert("게시글 작성이 완료되었습니다.");
    document.getElementById("subject").value = "";
    document.getElementById("day").value = "";
    document.getElementById("content").value = "";
}
function writeBoard(day, subject, content) {
    const postData = {
        day,
        subject,
        content,
    }

    //Get a key for a new Post.
    const newPostKey = firebase.database().ref().child('posts').push(postData);
}

function getDiary() {
    const postRef = firebase.database().ref('/posts/').once('value', function (snapshot) {
        const postData = Object.entries(snapshot.val());
        let diaryContent = document.querySelector(".diary_content");
        for(let i=0; i<postData.length; i++) {
            const [key, values] = postData[i];

            diaryContent.innerHTML += "<tr><td>"+"<h2 class='subject_design'>"+values.subject+"</h2>"+"</td></tr>" +
                "<tr class='sex'><td class='date_design'>"+ values.day+"</td></tr>" +
                "<tr><td>"+"<p class='content_design'>"+values.content+"</p>"+"</td></tr>" + "<hr class='lines'>"
        }
    });
}

/*email pass function*/


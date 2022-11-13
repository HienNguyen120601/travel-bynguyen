// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional



const firebaseConfig = {
    apiKey: "AIzaSyCzr_whzBIUOJESw6QXi-pteqSZt6X7YdU",
    authDomain: "travel-booking-f3ed4.firebaseapp.com",
    databaseURL: "https://travel-booking-f3ed4-default-rtdb.firebaseio.com",
    projectId: "travel-booking-f3ed4",
    storageBucket: "travel-booking-f3ed4.appspot.com",
    messagingSenderId: "157649672876",
    appId: "1:157649672876:web:a5287e61e2f2a124f95d09",
    measurementId: "G-LEB7S5JC19"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const auth = getAuth()

var islogin = sessionStorage.getItem('login')
if (islogin == 1) {
    const accout = document.querySelector('.header__topbar__account')
    const user = document.querySelector('.header__topbar__user')
    accout.classList.add('hide')
    user.classList.remove('hide')
}
else {

    const accout = document.querySelector('.header__topbar__account')
    accout.classList.remove('hide')
    const user = document.querySelector('.header__topbar__user')

    user.classList.add('hide')

}
const handleLogout = document.querySelector('.header__topbar__user__list')
const logout = handleLogout.querySelector('.logout')
logout.addEventListener('click', () => {
    sessionStorage.clear()

    // sessionStorage.setItem('login', 0)
    location.reload()
})

// Initialize Firebase

function getUser(callback) {
    fetch(apiUser).then(function (reponse) {
        return reponse.json()
    })
        .then(callback)
        .catch(function () {

        })
}

// Sign up
const signUpform = document.querySelector('.registerform')
const formGroup = signUpform.querySelector('.auth-form')
const signUp = signUpform.querySelector('.btn_signup')
const apiUser = 'https://travel-api-hiennguyen.herokuapp.com/api/customer'
var nameRegex = /^[a-zA-Z0-9\-]+$/;
var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
signUp.addEventListener('click', () => {
    const username = signUpform.querySelector('.username').value
    const email = signUpform.querySelector('.email').value
    const password = signUpform.querySelector('.password').value
    if (nameRegex.test(username) == false) {
        formGroup.querySelector('.messageUsername').innerText = 'User name không hợp lệ'
        return
    }
    else {
        formGroup.querySelector('.messageUsername').innerText = ''
    }
    if (emailRegex.test(email) == false) {
        formGroup.querySelector('.messageEmail').innerText = 'Email không hợp lệ'
        return
    }
    else {
        formGroup.querySelector('.messageEmail').innerText = ''
    }
    if (nameRegex.test(password) == false) {
        formGroup.querySelector('.messagePasswork').innerText = 'Password không hợp lệ'
        return
    }
    else {
        formGroup.querySelector('.messagePasswork').innerText = ''

    }

    var data = {
        username: username,
        email: email,
        password: password,
        block: 0
    }
    getUser(function (users) {
        users.map((user) => {

            if (user.email == email)
                formGroup.querySelector('.messageEmail').innerText = 'Email đã tồn tại'
        })
    })
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            set(ref(database, 'user/' + user.uid), {
                username: username,
                email: email
            })

            fetch(apiUser, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)

            })
                .then(function (reponse) {
                    reponse.json()
                })
                .then()
            signUpform.querySelector('.username').value = ''
            signUpform.querySelector('.email').value = ''
            signUpform.querySelector('.password').value = ''
            alert('Created')
            location.reload()
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..

        });
})
const signInform = document.querySelector('.loginform')
const signIn = signInform.querySelector('.btn_signin')
const formLogin = signInform.querySelector('.auth-form')
signIn.addEventListener('click', () => {

    const email = signInform.querySelector('.email').value

    const password = signInform.querySelector('.password').value

    getUser(function (users) {
        if (!users[0]) {
            formLogin.querySelector('.messageEmail').innerText = 'Email không tồn tại'
        }
        else {

            const findEmail = users.filter((user) => {
                return user.email == email
            })
            if (!findEmail[0]) {
                formLogin.querySelector('.messageEmail').innerText = 'Email không tồn tại'
            }
            else {
                formLogin.querySelector('.messageEmail').innerText = ''
            }

            if (findEmail[0].password == password)
                formLogin.querySelector('.messagePassword').innerText = ''
            else
                formLogin.querySelector('.messagePassword').innerText = 'Vui lòng kiểm tra lại mật khẩu'
            if (findEmail[0].email == email && findEmail[0].password == password) {
                if (findEmail[0].block == 1) {
                    location.reload()
                    alert("Tài khoản của bạn đã bị khóa vui lòng liên hệ quản trị viên")
                }
            }

        }
    })
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            let dt = new Date()
            update(ref(database, 'user/' + user.uid), {
                last_login: dt
            })
            signInform.querySelector('.email').value = ''
            signInform.querySelector('.password').value = ''
            sessionStorage.setItem('login', 1)
            sessionStorage.setItem('email', email)
            location.reload()
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}
)



// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBszDcZwcTHQkD-dG9r_SjljxozpvH_HLI",
    authDomain: "travel-booking-admin.firebaseapp.com",
    databaseURL: "https://travel-booking-admin-default-rtdb.firebaseio.com",
    projectId: "travel-booking-admin",
    storageBucket: "travel-booking-admin.appspot.com",
    messagingSenderId: "338654828593",
    appId: "1:338654828593:web:c9073c1a48f43327595d10"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth()



const signInform = document.querySelector('.formgroup')
const signIn = signInform.querySelector('.loginbtn')
signIn.addEventListener('click', () => {

    var email = signInform.querySelector('.email').value
    var password = signInform.querySelector('.password').value


    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 

            const user = userCredential.user;
            let dt = new Date()
            update(ref(database, 'user/' + user.uid), {
                last_login: dt
            })
            sessionStorage.setItem('adminlogin', 1)

            window.location = './admin.html'
            // ..
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage + 'Code:' + errorCode)
        });
}
)
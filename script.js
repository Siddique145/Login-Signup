
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { 
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
 } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDQbyVvXSYQJZ1uTKo4yxu12WVJB8fcE7A",
  authDomain: "my-app-7c78a.firebaseapp.com",
  projectId: "my-app-7c78a",
  storageBucket: "my-app-7c78a.appspot.com",
  messagingSenderId: "26511624895",
  appId: "1:26511624895:web:3ba095b720a2150bded40a",
  measurementId: "G-P2ERWBXXJR"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const signup_email = document.getElementById('signup_email')
const signup_password = document.getElementById('signup_password')
const signup_btn = document.getElementById('signup_btn')
const login_email = document.getElementById('login_email')
const login_password = document.getElementById('login_password')
const login_btn = document.getElementById('login_btn')
const signin_div = document.getElementById('signin_div')
const login_div = document.getElementById('login_div')
const auth_container = document.getElementById('auth_container')
const user_container = document.getElementById('user_container')

const user_email = document.getElementById('user_email')
const logout = document.getElementById('logout')


signup_btn.addEventListener('click', createUserAccount)
login_btn.addEventListener('click', loginAccount)
logout.addEventListener('click', signout)


onAuthStateChanged(auth, (user) => {
    if (user) {
      
      const uid = user.uid;
      auth_container.style.display = "none"
      user_container.style.display = "block"
      user_email.innerText = user.email
      console.log("user logged")
      
    } else {
        console.log("user not logged")
        auth_container.style.display = "block"
        user_container.style.display = "none"
        
    }
  });

  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    login_email.value = ""
    login_password.value = ""
    signup_email.value = ""
    signup_password.value = ""
    // ...
    const user = userCredential.user;
    signin_div.style.display = "none"
    // ...
  })

  .catch((error) => {
    alert(error)
    login_email.value = ""
    login_password.value = ""
    signup_email.value = ""
    signup_password.value = ""
    // ...
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

  function createUserAccount(){
    createUserWithEmailAndPassword(auth, signup_email.value, signup_password.value)
  .then((userCredential) => {
    alert(success)
    login_div.style.display = "block"
    signin_div.style.display = "none"
    const user = userCredential.user;
    login_email.value = ""
    login_password.value = ""
    signup_email.value = ""
    signup_password.value = ""
    // ...
  })
  .catch((error) => {
    alert(error)
    login_div.style.display = "none"
    signin_div.style.display = "block"
    login_email.value = ""
    login_password.value = ""
    signup_email.value = ""
    signup_password.value = ""
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
  }


function loginAccount(){
    signInWithEmailAndPassword(auth, login_email.value, login_password.value)
  .then((userCredential) => {
    console.log("userin") 
    alert(success)
    login_email.value = ""
    login_password.value = ""
    signup_email.value = ""
    signup_password.value = ""
    login_div.style.display = "none"
    signin_div.style.display = "none"
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    alert(error)
    login_email.value = ""
    login_password.value = ""
    signup_email.value = ""
    signup_password.value = ""
    login_div.style.display = "block"
    signin_div.style.display = "none"
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}

function signout(){
    signOut(auth).then(() => {
        login_email.value = ""
        login_password.value = ""
        signup_email.value = ""
    signup_password.value = ""
        
      }).catch((error) => {
        alert(error)
        login_email.value = ""
        login_password.value = ""
        signup_email.value = ""
    signup_password.value = ""
        
      });
}
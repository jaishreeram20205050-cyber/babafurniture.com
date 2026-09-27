// ============================================
// HOMEWORKZ - CUSTOMER SIGN UP
// FIREBASE AUTHENTICATION + FIRESTORE
// ============================================

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    getFirestore,
    doc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


// ============================================
// FIREBASE CONFIG
// ============================================

const firebaseConfig = {
    apiKey: "AIzaSyCkW1v3ZArKw9hX2ZXl2SBbn8lEiuH2jTM",
    authDomain: "homeworkz-f287c.firebaseapp.com",
    projectId: "homeworkz-f287c",
    storageBucket: "homeworkz-f287c.firebasestorage.app",
    messagingSenderId: "1069436038560",
    appId: "1:1069436038560:web:9cfed8bc9229ebbdbdc8c5"
};


// ============================================
// INITIALIZE FIREBASE
// ============================================

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);


// ============================================
// GET HTML ELEMENTS
// ============================================

const signupForm = document.getElementById("signupForm");

const nameInput = document.getElementById("name");

const emailInput = document.getElementById("email");

const phoneInput = document.getElementById("phone");

const passwordInput = document.getElementById("password");

const confirmPasswordInput =
    document.getElementById("confirmPassword");

const termsInput =
    document.getElementById("terms");

const showPassword =
    document.getElementById("showPassword");

const showConfirmPassword =
    document.getElementById("showConfirmPassword");

const loading =
    document.getElementById("loading");

const googleSignup =
    document.getElementById("googleSignup");


// ============================================
// CREATE ACCOUNT BUTTON
// ============================================

const signupButton =
    signupForm.querySelector(
        'button[type="submit"]'
    );


// ============================================
// SHOW / HIDE PASSWORD
// ============================================

showPassword.addEventListener(
    "click",
    function () {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            showPassword.textContent = "🙈";

        } else {

            passwordInput.type = "password";

            showPassword.textContent = "👁";

        }

    }
);


// ============================================
// SHOW / HIDE CONFIRM PASSWORD
// ============================================

showConfirmPassword.addEventListener(
    "click",
    function () {

        if (
            confirmPasswordInput.type ===
            "password"
        ) {

            confirmPasswordInput.type =
                "text";

            showConfirmPassword.textContent =
                "🙈";

        } else {

            confirmPasswordInput.type =
                "password";

            showConfirmPassword.textContent =
                "👁";

        }

    }
);


// ============================================
// SIGN UP
// ============================================

signupForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        // ====================================
        // GET VALUES
        // ====================================

        const name =
            nameInput.value.trim();

        const email =
            emailInput.value.trim();

        const phone =
            phoneInput.value.trim();

        const password =
            passwordInput.value;

        const confirmPassword =
            confirmPasswordInput.value;


        // ====================================
        // VALIDATION
        // ====================================

        if (name.length < 2) {

            alert(
                "Please enter your full name."
            );

            nameInput.focus();

            return;
        }


        if (!email) {

            alert(
                "Please enter your email address."
            );

            emailInput.focus();

            return;
        }


        if (!/^[0-9]{10}$/.test(phone)) {

            alert(
                "Please enter a valid 10-digit mobile number."
            );

            phoneInput.focus();

            return;
        }


        if (password.length < 6) {

            alert(
                "Password must contain at least 6 characters."
            );

            passwordInput.focus();

            return;
        }


        if (password !== confirmPassword) {

            alert(
                "Password and Confirm Password do not match."
            );

            confirmPasswordInput.focus();

            return;
        }


        if (!termsInput.checked) {

            alert(
                "Please agree to the Terms & Conditions and Privacy Policy."
            );

            return;
        }


        // ====================================
        // SHOW LOADING
        // ====================================

        if (loading) {

            loading.classList.add("show");

        }


        signupButton.disabled = true;

        signupButton.innerHTML =
            "Creating Account...";


        try {

            // =================================
            // CREATE FIREBASE ACCOUNT
            // =================================

            const userCredential =
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );


            const user =
                userCredential.user;


            console.log(
                "Firebase user created:",
                user.uid
            );


            // =================================
            // SAVE NAME IN FIREBASE AUTH
            // =================================

            await updateProfile(
                user,
                {
                    displayName: name
                }
            );


            // =================================
            // SAVE CUSTOMER IN FIRESTORE
            // =================================

            await setDoc(
                doc(
                    db,
                    "customers",
                    user.uid
                ),
                {

                    uid: user.uid,

                    name: name,

                    email: email,

                    phone: phone,

                    role: "customer",

                    createdAt:
                        serverTimestamp()

                }
            );


            // =================================
            // SAVE LOCAL DATA
            // =================================

            localStorage.setItem(
                "customerLoggedIn",
                "true"
            );

            localStorage.setItem(
                "customerName",
                name
            );

            localStorage.setItem(
                "customerEmail",
                email
            );

            localStorage.setItem(
                "customerPhone",
                phone
            );


            // =================================
            // SUCCESS
            // =================================

            alert(
                "Account created successfully! 🎉"
            );


            // =================================
            // GO TO CUSTOMER DASHBOARD
            // =================================

            window.location.href =
                "customer-dashboard.html";


        } catch (error) {

            console.error(
                "Firebase Signup Error:",
                error
            );


            let message =
                "Account creation failed.";


            // =================================
            // FIREBASE ERROR MESSAGES
            // =================================

            if (
                error.code ===
                "auth/email-already-in-use"
            ) {

                message =
                    "This email is already registered. Please login instead.";

            }

            else if (
                error.code ===
                "auth/invalid-email"
            ) {

                message =
                    "Please enter a valid email address.";

            }

            else if (
                error.code ===
                "auth/weak-password"
            ) {

                message =
                    "Password is too weak. Please use at least 6 characters.";

            }

            else if (
                error.code ===
                "auth/network-request-failed"
            ) {

                message =
                    "Internet connection problem. Please check your internet.";

            }

            else if (
                error.code ===
                "permission-denied"
            ) {

                message =
                    "Firestore permission denied. Please check Firestore Rules.";

            }

            else {

                message =
                    error.message;

            }


            alert(message);


        } finally {

            // =================================
            // HIDE LOADING
            // =================================

            if (loading) {

                loading.classList.remove(
                    "show"
                );

            }


            signupButton.disabled = false;

            signupButton.innerHTML =
                'Create Account <span>→</span>';

        }

    }
);


// ============================================
// GOOGLE SIGNUP
// ============================================

googleSignup.addEventListener(
    "click",
    function () {

        alert(
            "Google Sign Up ko next step me Firebase Google Authentication ke saath connect karenge."
        );

    }
);
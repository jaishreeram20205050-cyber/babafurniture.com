import { initializeApp } from
"https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    sendPasswordResetEmail
} from
"https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCkW1v3ZArKw9hX2ZXl2SBbn8lEiuH2jTM",
    authDomain: "homeworkz-f287c.firebaseapp.com",
    projectId: "homeworkz-f287c",
    storageBucket: "homeworkz-f287c.firebasestorage.app",
    messagingSenderId: "1069436038560",
    appId: "1:1069436038560:web:9cfed8bc9229ebbdbdc8c5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const ADMIN_UID =
    "DnFQ6tSfRjhYAvHy2FX1rZsi7PB2";

const form =
    document.getElementById("adminLoginForm");

const email =
    document.getElementById("adminEmail");

const password =
    document.getElementById("adminPassword");

const togglePassword =
    document.getElementById("togglePassword");

const forgotPassword =
    document.getElementById("forgotPassword");

const loading =
    document.getElementById("loading");


// PASSWORD SHOW / HIDE

togglePassword.addEventListener("click", () => {

    if (password.type === "password") {

        password.type = "text";
        togglePassword.textContent = "🙈";

    } else {

        password.type = "password";
        togglePassword.textContent = "👁️";

    }

});


// ADMIN LOGIN

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const adminEmail =
        email.value.trim();

    const adminPassword =
        password.value;

    if (loading) {
        loading.classList.add("show");
    }

    try {

        const result =
            await signInWithEmailAndPassword(
                auth,
                adminEmail,
                adminPassword
            );

        const user = result.user;

        console.log("Logged in UID:", user.uid);


        // CHECK ADMIN UID

        if (user.uid !== ADMIN_UID) {

            alert(
                "Access denied. This account is not an administrator."
            );

            await auth.signOut();

            return;
        }


        // ADMIN LOGIN SUCCESS

        localStorage.setItem(
            "adminLoggedIn",
            "true"
        );

        localStorage.setItem(
            "adminUID",
            user.uid
        );

        localStorage.setItem(
            "adminEmail",
            user.email || ""
        );


        // GO TO ADMIN DASHBOARD

        window.location.href =
            "admin-dashboard.html";


    } catch (error) {

        console.error(
            "Admin Login Error:",
            error
        );

        let message =
            "Admin login failed.";

        if (
            error.code ===
            "auth/invalid-credential"
        ) {

            message =
                "Email or password is incorrect.";

        } else if (
            error.code ===
            "auth/invalid-email"
        ) {

            message =
                "Please enter a valid admin email.";

        } else if (
            error.code ===
            "auth/too-many-requests"
        ) {

            message =
                "Too many attempts. Please try again later.";

        } else if (
            error.code ===
            "auth/network-request-failed"
        ) {

            message =
                "Internet connection problem.";

        }

        alert(message);

    } finally {

        if (loading) {
            loading.classList.remove("show");
        }

    }

});


// FORGOT PASSWORD

forgotPassword.addEventListener("click", async (e) => {

    e.preventDefault();

    const adminEmail =
        email.value.trim();

    if (!adminEmail) {

        alert(
            "Please enter your admin email first."
        );

        email.focus();

        return;
    }

    try {

        await sendPasswordResetEmail(
            auth,
            adminEmail
        );

        alert(
            "Password reset email has been sent."
        );

    } catch (error) {

        console.error(error);

        alert(
            "Unable to send password reset email."
        );

    }

});
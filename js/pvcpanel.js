// ======================================================
// HOMEWORKZ - PVC PANEL BOOKING
// Firebase + Firestore
// ======================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";


// ======================================================
// FIREBASE CONFIG
// ======================================================

const firebaseConfig = {
    apiKey: "AIzaSyCkW1v3ZArKw9hX2ZXl2SBbn8lEiuH2jTM",
    authDomain: "homeworkz-f287c.firebaseapp.com",
    projectId: "homeworkz-f287c",
    storageBucket: "homeworkz-f287c.firebasestorage.app",
    messagingSenderId: "1069436038560",
    appId: "1:1069436038560:web:9cfed8bc9229ebbdbdc8c5"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


// ======================================================
// PVC PANEL WORK TYPES
// ======================================================

const pvcOptions = {

    "PVC Wall Panel": [
        "Plain PVC Wall Panel",
        "Designer PVC Wall Panel",
        "3D PVC Wall Panel",
        "Marble Finish PVC Panel",
        "Wood Finish PVC Panel",
        "Fluted PVC Panel",
        "Glossy PVC Panel",
        "Matte Finish PVC Panel"
    ],

    "PVC Ceiling Panel": [
        "Plain PVC Ceiling",
        "Designer PVC Ceiling",
        "Wood Finish Ceiling",
        "Printed PVC Ceiling",
        "Glossy Ceiling Panel",
        "Decorative Ceiling Panel",
        "PVC Strip Ceiling"
    ],

    "PVC Fluted Panel": [
        "Vertical Fluted Panel",
        "Horizontal Fluted Panel",
        "Decorative Fluted Panel",
        "Wood-Look Fluted Panel",
        "Half-Wall Fluted Panel",
        "Full-Wall Fluted Panel"
    ],

    "PVC Marble Panel": [
        "White Marble Finish",
        "Black Marble Finish",
        "Grey Marble Finish",
        "Vein Marble Design",
        "High-Gloss Marble Panel",
        "Decorative Marble Panel"
    ],

    "PVC 3D Panel": [
        "3D Geometric Design",
        "3D Wave Design",
        "3D Brick Design",
        "3D Diamond Design",
        "Custom 3D Design"
    ],

    "PVC Wood Finish Panel": [
        "Oak Finish",
        "Walnut Finish",
        "Teak Finish",
        "Dark Wood Finish",
        "Light Wood Finish",
        "Wooden Slat Panel"
    ],

    "PVC Partition": [
        "Full Height Partition",
        "Half Height Partition",
        "Decorative Partition",
        "Room Divider",
        "Office Partition",
        "PVC Panel + Glass Partition"
    ],

    "PVC Door Panel": [
        "PVC Door Panel",
        "Decorative Door Panel",
        "Wood Finish Door Panel",
        "Bathroom PVC Door",
        "PVC Door Cladding"
    ],

    "PVC Decorative Panel": [
        "TV Unit Back Panel",
        "Bed Back Panel",
        "Sofa Back Panel",
        "Wall Feature Panel",
        "Reception Back Panel",
        "Counter / Shop Panel"
    ],

    "PVC Repair & Replacement": [
        "Damaged Panel Replacement",
        "Broken Panel Replacement",
        "Water-Damage Replacement",
        "Loose Panel Fixing",
        "Panel Joint Repair",
        "Old Panel Removal & Replacement"
    ]

};


// ======================================================
// OPEN BOOKING POPUP
// ======================================================

function bookService(serviceName) {

    const popup = document.getElementById("bookingPopup");

    const selectedService =
        document.getElementById("selectedService");

    const workType =
        document.getElementById("pvcWorkType");


    if (!popup || !selectedService || !workType) {

        alert("Booking popup me koi element missing hai.");

        return;
    }


    // Show popup

    popup.style.display = "flex";


    // Selected main service

    selectedService.innerText =
        "Selected Service: " + serviceName;


    // Save selected service temporarily

    popup.dataset.service = serviceName;


    // Clear old options

    workType.innerHTML =
        '<option value="">Select Work Type</option>';


    // Get work types

    const options =
        pvcOptions[serviceName] || [];


    // Add work types

    options.forEach(function(work) {

        const option =
            document.createElement("option");

        option.value = work;

        option.textContent = work;

        workType.appendChild(option);

    });

}


// ======================================================
// CLOSE POPUP
// ======================================================

function closePopup() {

    const popup =
        document.getElementById("bookingPopup");

    if (popup) {

        popup.style.display = "none";

    }

}


// ======================================================
// SUBMIT BOOKING
// ======================================================

async function submitBooking() {

    const name =
        document.getElementById("customerName").value.trim();


    const phone =
        document.getElementById("customerPhone").value.trim();


    const workType =
        document.getElementById("pvcWorkType").value;


    const address =
        document.getElementById("customerAddress").value.trim();


    const popup =
        document.getElementById("bookingPopup");


    const service =
        popup.dataset.service || "";


    const button =
        document.querySelector(".submit-btn");


    // ==================================================
    // VALIDATION
    // ==================================================

    if (!name) {

        alert("Please enter your name.");

        return;
    }


    if (!/^[6-9][0-9]{9}$/.test(phone)) {

        alert("Please enter a valid 10 digit mobile number.");

        return;
    }


    if (!workType) {

        alert("Please select work type.");

        return;
    }


    if (!address) {

        alert("Please enter your address.");

        return;
    }


    if (!service) {

        alert("Please select a service.");

        return;
    }


    // ==================================================
    // BUTTON LOADING
    // ==================================================

    if (button) {

        button.disabled = true;

        button.innerText = "Booking...";

    }


    try {

        // ==================================================
        // SAVE TO FIRESTORE
        // ==================================================

        await addDoc(

            collection(db, "bookings"),

            {

                customerName: name,

                customerPhone: phone,

                service: service,

                workType: workType,

                customerAddress: address,

                status: "Pending",

                source: "PVC Panel Services",

                createdAt: serverTimestamp()

            }

        );


        // ==================================================
        // SUCCESS
        // ==================================================

        alert(
            "✅ BOOKING CONFIRMED!\n\n" +

            "Thank you " + name + "!\n\n" +

            "Service: " + service + "\n" +

            "Work Type: " + workType + "\n\n" +

            "Our team will contact you shortly."
        );


        // ==================================================
        // CLEAR FORM
        // ==================================================

        document.getElementById("customerName").value = "";

        document.getElementById("customerPhone").value = "";

        document.getElementById("pvcWorkType").value = "";

        document.getElementById("customerAddress").value = "";


        // Close popup

        closePopup();


    }

    catch (error) {

        console.error(
            "PVC Booking Error:",
            error
        );


        alert(
            "❌ Booking save nahi ho payi.\n\n" +

            "Please try again.\n\n" +

            error.message
        );

    }

    finally {

        // Restore button

        if (button) {

            button.disabled = false;

            button.innerText = "Confirm Booking";

        }

    }

}


// ======================================================
// MAKE FUNCTIONS AVAILABLE TO HTML onclick
// ======================================================

window.bookService = bookService;

window.closePopup = closePopup;

window.submitBooking = submitBooking;


// ======================================================
// CLOSE POPUP WHEN CLICKING OUTSIDE
// ======================================================

window.addEventListener("click", function(event) {

    const popup =
        document.getElementById("bookingPopup");


    if (
        popup &&
        event.target === popup
    ) {

        closePopup();

    }

});
// =====================================================
// HOMEWORKZ - FALSE CEILING BOOKING
// FIREBASE FIRESTORE
// =====================================================


// ================= FIREBASE IMPORTS =================

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";


// ================= FIREBASE CONFIG =================

const firebaseConfig = {

    apiKey: "AIzaSyCkW1v3ZArKw9hX2ZXl2SBbn8lEiuH2jTM",

    authDomain: "homeworkz-f287c.firebaseapp.com",

    projectId: "homeworkz-f287c",

    storageBucket: "homeworkz-f287c.firebasestorage.app",

    messagingSenderId: "1069436038560",

    appId: "1:1069436038560:web:9cfed8bc9229ebbdbdc8c5"

};


// ================= INITIALIZE FIREBASE =================

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);



// =====================================================
// FALSE CEILING WORK TYPES
// =====================================================

const falseCeilingOptions = {

    "Gypsum False Ceiling": [

        "Single Level Ceiling",
        "Double Level Ceiling",
        "Multi-Level Ceiling",
        "Cove Ceiling",
        "Tray Ceiling",
        "Floating Ceiling",
        "Designer Ceiling"

    ],


    "POP Ceiling": [

        "Plain POP Ceiling",
        "Designer POP Ceiling",
        "Cornice Work",
        "Cove Work",
        "Border Design",
        "Multi-Level POP",
        "Decorative Moulding"

    ],


    "PVC False Ceiling": [

        "Plain PVC Ceiling",
        "Printed PVC Ceiling",
        "Wood Finish PVC",
        "Panel Ceiling",
        "Designer PVC Ceiling"

    ],


    "Grid Ceiling": [

        "T-Grid Ceiling",
        "Exposed Grid",
        "Concealed Grid",
        "Mineral Fiber Tile",
        "Metal Grid Ceiling"

    ],


    "Metal Ceiling": [

        "Aluminium Ceiling",
        "GI Metal Ceiling",
        "Clip-in Ceiling",
        "Lay-in Ceiling",
        "Linear Metal Ceiling",
        "Baffle Ceiling"

    ],


    "Wooden Ceiling": [

        "Wooden Panel Ceiling",
        "Wooden Slat Ceiling",
        "Veneer Ceiling",
        "Laminate Finish Ceiling",
        "Wooden Grid Design"

    ],


    "Acoustic Ceiling": [

        "Acoustic Panel",
        "Acoustic Tile",
        "Baffle Acoustic Ceiling",
        "Soundproof Ceiling"

    ],


    "Lighting Ceiling Work": [

        "Cove Lighting",
        "LED Strip Lighting",
        "Spot Light",
        "Downlight",
        "Profile Light",
        "Pendant Light Provision",
        "Decorative Lighting"

    ],


    "Ceiling Decoration": [

        "3D Ceiling",
        "Geometric Design",
        "Circular Design",
        "Floral Design",
        "Custom Designer Ceiling",
        "Wall-Ceiling Combination"

    ],


    "Ceiling Repair": [

        "Crack Repair",
        "Water Damage Repair",
        "Sagging Ceiling Repair",
        "Repainting",
        "Old Ceiling Replacement",
        "Ceiling Modification"

    ]

};



// =====================================================
// OPEN BOOKING POPUP
// =====================================================

function openFalseBooking(serviceName) {

    const popup =
        document.getElementById("falseBookingPopup");

    const selectedService =
        document.getElementById("falseSelectedService");

    const dropdown =
        document.getElementById("falseWorkType");


    if (!popup || !selectedService || !dropdown) {

        console.error("Booking popup elements not found.");

        return;
    }


    // Show popup

    popup.style.display = "flex";


    // Selected service

    selectedService.innerText =
        "Selected Service: " + serviceName;


    // Save selected service

    popup.dataset.service = serviceName;


    // Clear old dropdown

    dropdown.innerHTML =
        '<option value="">Select Work Type</option>';


    // Get work types

    const options =
        falseCeilingOptions[serviceName] || [];


    // Add work types

    options.forEach(function(work) {

        const option =
            document.createElement("option");

        option.value = work;

        option.textContent = work;

        dropdown.appendChild(option);

    });


    // Clear previous form

    document.getElementById("falseCustomerName").value = "";

    document.getElementById("falseCustomerPhone").value = "";

    document.getElementById("falseCustomerAddress").value = "";

    dropdown.value = "";


    // Focus name field

    setTimeout(function() {

        document
            .getElementById("falseCustomerName")
            .focus();

    }, 100);

}



// =====================================================
// CLOSE BOOKING POPUP
// =====================================================

function closeFalseBooking() {

    const popup =
        document.getElementById("falseBookingPopup");

    if (popup) {

        popup.style.display = "none";

    }

}



// =====================================================
// CONFIRM BOOKING
// =====================================================

async function confirmFalseBooking() {


    const name =
        document
            .getElementById("falseCustomerName")
            .value
            .trim();


    const phone =
        document
            .getElementById("falseCustomerPhone")
            .value
            .trim();


    const workType =
        document
            .getElementById("falseWorkType")
            .value
            .trim();


    const address =
        document
            .getElementById("falseCustomerAddress")
            .value
            .trim();


    const popup =
        document.getElementById("falseBookingPopup");


    const service =
        popup?.dataset.service || "False Ceiling Work";


    const button =
        document.querySelector(".false-confirm-btn");



    // ================= VALIDATION =================


    if (name === "") {

        alert("Please enter your name.");

        return;

    }


    if (!/^[6-9][0-9]{9}$/.test(phone)) {

        alert(
            "Please enter a valid 10-digit mobile number."
        );

        return;

    }


    if (workType === "") {

        alert("Please select a work type.");

        return;

    }


    if (address === "") {

        alert("Please enter your address.");

        return;

    }



    // ================= BUTTON LOADING =================


    if (button) {

        button.disabled = true;

        button.innerText = "Booking...";

    }



    try {


        // =================================================
        // SAVE BOOKING TO FIRESTORE
        // =================================================

        await addDoc(

            collection(db, "bookings"),

            {

                customerName: name,

                customerPhone: phone,

                service: service,

                workType: workType,

                customerAddress: address,

                status: "Pending",

                source: "False Ceiling Services",

                createdAt: serverTimestamp()

            }

        );


        // ================= SUCCESS =================


        alert(
            "BOOKING CONFIRMED!\n\n" +
            "Service: " + service + "\n" +
            "Work Type: " + workType + "\n\n" +
            "Our team will contact you soon."
        );


        // Clear form

        document
            .getElementById("falseCustomerName")
            .value = "";


        document
            .getElementById("falseCustomerPhone")
            .value = "";


        document
            .getElementById("falseWorkType")
            .value = "";


        document
            .getElementById("falseCustomerAddress")
            .value = "";


        // Close popup

        closeFalseBooking();


    }

    catch (error) {

        console.error(
            "Booking Error:",
            error
        );


        alert(
            "Booking failed.\n\n" +
            "Please try again."
        );

    }

    finally {

        if (button) {

            button.disabled = false;

            button.innerText =
                "Confirm Booking";

        }

    }

}



// =====================================================
// CLOSE POPUP WHEN CLICKING OUTSIDE
// =====================================================

window.addEventListener(
    "click",
    function(event) {

        const popup =
            document.getElementById(
                "falseBookingPopup"
            );


        if (
            event.target === popup
        ) {

            closeFalseBooking();

        }

    }
);



// =====================================================
// ESC KEY TO CLOSE POPUP
// =====================================================

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeFalseBooking();

        }

    }
);



// =====================================================
// MAKE FUNCTIONS AVAILABLE TO HTML ONCLICK
// =====================================================

window.openFalseBooking =
    openFalseBooking;


window.closeFalseBooking =
    closeFalseBooking;


window.confirmFalseBooking =
    confirmFalseBooking;



console.log(
    "HomeWorkz False Ceiling Booking System Loaded"
);
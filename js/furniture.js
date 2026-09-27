// ==========================================
// HOMEWORKZ FURNITURE BOOKING SYSTEM
// FIREBASE FIRESTORE
// ==========================================


// ==========================================
// FIREBASE IMPORT
// ==========================================

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";


// ==========================================
// FIREBASE CONFIG
// ==========================================

const firebaseConfig = {

    apiKey: "AIzaSyCkW1v3ZArKw9hX2ZXl2SBbn8lEiuH2jTM",

    authDomain: "homeworkz-f287c.firebaseapp.com",

    projectId: "homeworkz-f287c",

    storageBucket: "homeworkz-f287c.firebasestorage.app",

    messagingSenderId: "1069436038560",

    appId: "1:1069436038560:web:9cfed8bc9229ebbdbdc8c5"

};


// ==========================================
// INITIALIZE FIREBASE
// ==========================================

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


// ==========================================
// FURNITURE KE ANDAR KE WORK
// ==========================================

const furnitureOptions = {

    "Bed Making": [
        "Single Size Bed",
        "Double Size Bed",
        "Queen Size Bed",
        "King Size Bed"
    ],

    "Wardrobe": [
        "Sliding Wardrobe",
        "Hinged Wardrobe",
        "Modular Wardrobe",
        "Walk-in Wardrobe"
    ],

    "Modular Kitchen": [
        "L-Shape Kitchen",
        "U-Shape Kitchen",
        "Straight Kitchen",
        "Island Kitchen",
        "Parallel Kitchen"
    ],

    "TV Unit": [
        "Wall Mounted TV Unit",
        "Floor TV Unit",
        "TV Cabinet",
        "TV Unit with Storage"
    ],

    "Sofa Work": [
        "New Sofa Making",
        "Sofa Repair",
        "Sofa Foam Change",
        "Sofa Fabric Change",
        "Sofa Cover Change"
    ],

    "Dining Table": [
        "4 Seater Dining Table",
        "6 Seater Dining Table",
        "8 Seater Dining Table",
        "Custom Dining Table"
    ],

    "Study Table": [
        "Simple Study Table",
        "Study Table with Storage",
        "Wall Mounted Study Table",
        "Custom Study Table"
    ],

    "Shoe Rack": [
        "Open Shoe Rack",
        "Closed Shoe Rack",
        "Wall Mounted Shoe Rack",
        "Seating Shoe Rack"
    ],

    "Dressing Table": [
        "Simple Dressing Table",
        "Dressing Table with Mirror",
        "Dressing Table with Storage"
    ],

    "Wooden Door": [
        "Main Door",
        "Room Door",
        "Bathroom Door",
        "Designer Wooden Door"
    ],

    "Wooden Partition": [
        "Simple Wooden Partition",
        "Decorative Partition",
        "TV Partition",
        "Room Divider"
    ],

    "Pooja Unit": [
        "Base Storage",
        "Backdrop",
        "Layout Planning"
    ],

    "Wall Shelf": [
        "Glass Shelf",
        "Wooden Shelf",
        "Custom Shelf"
    ],

    "Storage & Cabinet": [
        "Wall Cabinet",
        "Bookshelf",
        "Display Cabinet"
    ],

    "Office Furniture": [
        "Office Table",
        "Workstation",
        "Reception Table",
        "Office Storage"
    ],

    "Custom Furniture": [
        "Custom Bed",
        "Custom Wardrobe",
        "Custom Table",
        "Custom Cabinet",
        "Other Custom Furniture"
    ]

};


// ==========================================
// BOOK NOW
// ==========================================

function openFurnitureBooking(serviceName) {

    const popup =
        document.getElementById("bookingPopup");

    const selectedService =
        document.getElementById("selectedService");

    const dropdown =
        document.getElementById("furnitureType");


    if (!popup) {

        console.error(
            "bookingPopup not found"
        );

        return;
    }


    if (!selectedService) {

        console.error(
            "selectedService not found"
        );

        return;
    }


    if (!dropdown) {

        console.error(
            "furnitureType not found"
        );

        return;
    }


    // ======================================
    // OPEN POPUP
    // ======================================

    popup.style.display = "flex";


    // ======================================
    // SELECTED SERVICE
    // ======================================

    selectedService.innerText =
        "Selected Service: " + serviceName;


    // ======================================
    // RESET DROPDOWN
    // ======================================

    dropdown.innerHTML =
        '<option value="">Select Work Type</option>';


    // ======================================
    // GET WORK TYPES
    // ======================================

    const options =
        furnitureOptions[serviceName] || [];


    // ======================================
    // ADD OPTIONS
    // ======================================

    options.forEach(function(work) {

        const option =
            document.createElement("option");

        option.value = work;

        option.textContent = work;

        dropdown.appendChild(option);

    });

}


// ==========================================
// CLOSE BOOKING POPUP
// ==========================================

function closeBooking() {

    const popup =
        document.getElementById(
            "bookingPopup"
        );


    if (popup) {

        popup.style.display = "none";

    }

}


// ==========================================
// CONFIRM BOOKING
// ==========================================

async function confirmBooking() {

    // ======================================
    // GET CUSTOMER NAME
    // ======================================

    const name =
        document
        .getElementById("customerName")
        .value
        .trim();


    // ======================================
    // GET MOBILE
    // ======================================

    const mobile =
        document
        .getElementById("customerMobile")
        .value
        .trim();


    // ======================================
    // GET WORK TYPE
    // ======================================

    const workType =
        document
        .getElementById("furnitureType")
        .value;


    // ======================================
    // GET ADDRESS
    // ======================================

    const address =
        document
        .getElementById("customerAddress")
        .value
        .trim();


    // ======================================
    // GET SERVICE
    // ======================================

    const selectedText =
        document
        .getElementById("selectedService")
        .innerText;


    const service =
        selectedText
        .replace(
            "Selected Service:",
            ""
        )
        .trim();


    // ======================================
    // VALIDATION
    // ======================================

    if (name === "") {

        alert(
            "Please enter your name."
        );

        return;

    }


    if (mobile === "") {

        alert(
            "Please enter your mobile number."
        );

        return;

    }


    if (!/^[6-9][0-9]{9}$/.test(mobile)) {

        alert(
            "Please enter a valid 10 digit mobile number."
        );

        return;

    }


    if (workType === "") {

        alert(
            "Please select work type."
        );

        return;

    }


    if (address === "") {

        alert(
            "Please enter your address."
        );

        return;

    }


    // ======================================
    // CONFIRM BUTTON
    // ======================================

    const button =
        document.querySelector(
            ".confirm-btn"
        );


    if (button) {

        button.disabled = true;

        button.innerText =
            "Booking...";

    }


    // ======================================
    // SAVE TO FIRESTORE
    // ======================================

    try {

        const bookingData = {

            customerName: name,

            customerPhone: mobile,

            service: service,

            workType: workType,

            customerAddress: address,

            status: "Pending",

            source: "Furniture Services",

            createdAt: serverTimestamp()

        };


        const bookingRef =
            await addDoc(

                collection(
                    db,
                    "bookings"
                ),

                bookingData

            );


        console.log(
            "Booking successfully saved:",
            bookingRef.id
        );


        // ==================================
        // CLOSE FORM
        // ==================================

        closeBooking();


        // ==================================
        // CLEAR FORM
        // ==================================

        document
        .getElementById(
            "customerName"
        )
        .value = "";


        document
        .getElementById(
            "customerMobile"
        )
        .value = "";


        document
        .getElementById(
            "furnitureType"
        )
        .value = "";


        document
        .getElementById(
            "customerAddress"
        )
        .value = "";


        // ==================================
        // SUCCESS MESSAGE
        // ==================================

        alert(

            "✅ BOOKING CONFIRMED!\n\n" +

            "Thank you " +
            name +
            "!\n\n" +

            "Service: " +
            service +
            "\n" +

            "Work Type: " +
            workType +
            "\n\n" +

            "Our team will contact you shortly."

        );


    } catch (error) {

        console.error(
            "Booking Error:",
            error
        );


        alert(

            "❌ Booking save nahi ho paayi.\n\n" +

            "Please try again.\n\n" +

            error.message

        );

    }


    // ======================================
    // RESET BUTTON
    // ======================================

    if (button) {

        button.disabled = false;

        button.innerText =
            "Confirm Booking";

    }

}


// ==========================================
// CLOSE POPUP WHEN CLICK OUTSIDE
// ==========================================

const bookingPopup =
    document.getElementById(
        "bookingPopup"
    );


if (bookingPopup) {

    bookingPopup.addEventListener(
        "click",
        function(event) {

            if (
                event.target ===
                bookingPopup
            ) {

                closeBooking();

            }

        }
    );

}


// ==========================================
// MAKE FUNCTIONS AVAILABLE TO HTML
// ==========================================

window.openFurnitureBooking =
    openFurnitureBooking;


window.closeBooking =
    closeBooking;


window.confirmBooking =
    confirmBooking;
    
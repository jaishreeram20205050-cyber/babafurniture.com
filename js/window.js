/* ================= MOBILE MENU ================= */

function toggleMenu() {

    const menu = document.querySelector(".nav-menu");

    menu.classList.toggle("show");

}


/* ================= CLOSE MOBILE MENU ================= */

document.querySelectorAll(".nav-menu a").forEach(function(link) {

    link.addEventListener("click", function() {

        document.querySelector(".nav-menu").classList.remove("show");

    });

});


/* ================= BOOKING POPUP ================= */

function openBooking(serviceName) {

    const popup = document.getElementById("bookingOverlay");

    const serviceText = document.getElementById("selectedService");

    serviceText.innerText = serviceName;

    popup.classList.add("show");

    document.body.style.overflow = "hidden";

}


/* ================= CLOSE POPUP ================= */

function closeBooking() {

    const popup = document.getElementById("bookingOverlay");

    popup.classList.remove("show");

    document.body.style.overflow = "auto";

}


/* ================= CLICK OUTSIDE POPUP ================= */

document.getElementById("bookingOverlay").addEventListener("click", function(event) {

    if (event.target === this) {

        closeBooking();

    }

});


/* ================= ESC KEY ================= */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closeBooking();

    }

});


/* ================= BOOKING FORM ================= */

document.getElementById("bookingForm").addEventListener("submit", function(event) {

    event.preventDefault();


    const name = document.getElementById("customerName").value;

    const phone = document.getElementById("customerPhone").value;

    const address = document.getElementById("customerAddress").value;

    const date = document.getElementById("bookingDate").value;

    const message = document.getElementById("customerMessage").value;

    const service = document.getElementById("selectedService").innerText;


    /*
       Abhi demo booking hai.

       Baad mein isi jagah:
       - WhatsApp
       - Email
       - Database
       - Admin Dashboard

       connect kiya ja sakta hai.
    */


    const bookingData = {

        service: service,

        customerName: name,

        phone: phone,

        address: address,

        date: date,

        message: message

    };


    console.log("NEW BOOKING:", bookingData);


    alert(
        "Booking Request Submitted Successfully!\n\n" +
        "Service: " + service + "\n" +
        "Name: " + name + "\n" +
        "Mobile: " + phone
    );


    document.getElementById("bookingForm").reset();

    closeBooking();

});
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

import {
    getFirestore,
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";


/* ==============================
   FIREBASE CONFIG
============================== */

const firebaseConfig = {
    apiKey: "AIzaSyCkW1v3ZArKw9hX2ZXl2SBbn8lEiuH2jTM",
    authDomain: "homeworkz-f287c.firebaseapp.com",
    projectId: "homeworkz-f287c",
    storageBucket: "homeworkz-f287c.firebasestorage.app",
    messagingSenderId: "1069436038560",
    appId: "1:1069436038560:web:9cfed8bc9229ebbdbdc8c5"
};


/* ==============================
   FIREBASE INIT
============================== */

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);


/* ==============================
   ADMIN UID
============================== */

const ADMIN_UID =
    "DnFQ6tSfRjhYAvHy2FX1rZsi7PB2";


/* ==============================
   CHECK ADMIN LOGIN
============================== */

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        alert("Please login as Admin.");

        window.location.href = "admin-login.html";

        return;
    }


    console.log("Logged in UID:", user.uid);


    if (user.uid !== ADMIN_UID) {

        alert("Access Denied. Admin account required.");

        await signOut(auth);

        window.location.href = "admin-login.html";

        return;
    }


    console.log("Admin verified successfully.");

    // Load dashboard data
    await loadBookings();

    await loadCustomers();

});


/* ==============================
   LOAD BOOKINGS
============================== */

async function loadBookings() {

    const table =
        document.getElementById("bookingTable");


    if (!table) {

        console.error(
            "bookingTable element nahi mila."
        );

        return;
    }


    // Loading message
    table.innerHTML = `
        <tr>
            <td colspan="6"
                style="text-align:center; padding:30px;">
                Loading bookings...
            </td>
        </tr>
    `;


    try {

        const snapshot =
            await getDocs(
                collection(db, "bookings")
            );


        console.log(
            "Total bookings:",
            snapshot.size
        );


        let bookings = [];


        snapshot.forEach((doc) => {

            bookings.push({
                id: doc.id,
                ...doc.data()
            });

        });


        /* ==============================
           SORT NEWEST FIRST
        ============================== */

        bookings.sort((a, b) => {

            const dateA =
                a.createdAt?.toMillis
                    ? a.createdAt.toMillis()
                    : 0;

            const dateB =
                b.createdAt?.toMillis
                    ? b.createdAt.toMillis()
                    : 0;

            return dateB - dateA;

        });


        /* ==============================
           UPDATE STATS
        ============================== */

        const totalBookings =
            document.getElementById(
                "totalBookings"
            );

        if (totalBookings) {

            totalBookings.textContent =
                bookings.length;
        }


        const bookingCount =
            document.getElementById(
                "bookingCount"
            );

        if (bookingCount) {

            bookingCount.textContent =
                bookings.length;
        }


        const pendingBookings =
            document.getElementById(
                "pendingBookings"
            );

        if (pendingBookings) {

            const pending =
                bookings.filter(
                    booking =>
                        (booking.status || "")
                        .toLowerCase()
                        === "pending"
                ).length;

            pendingBookings.textContent =
                pending;
        }


        const completedWork =
            document.getElementById(
                "completedWork"
            );

        if (completedWork) {

            const completed =
                bookings.filter(
                    booking =>
                        (booking.status || "")
                        .toLowerCase()
                        === "completed"
                ).length;

            completedWork.textContent =
                completed;
        }


        /* ==============================
           NO BOOKINGS
        ============================== */

        if (bookings.length === 0) {

            table.innerHTML = `
                <tr>
                    <td colspan="6"
                        style="text-align:center; padding:30px;">
                        No bookings found.
                    </td>
                </tr>
            `;

            return;
        }


        /* ==============================
           SHOW LATEST 10 BOOKINGS
        ============================== */

        const latestBookings =
            bookings.slice(0, 10);


        table.innerHTML = "";


        latestBookings.forEach((booking) => {

            const row =
                document.createElement("tr");


            const customer =
                booking.customerName || "N/A";

            const phone =
                booking.customerPhone || "N/A";

            const service =
                booking.service || "N/A";

            const workType =
                booking.workType || "N/A";

            const status =
                booking.status || "Pending";

            const date =
                formatDate(booking.createdAt);


            row.innerHTML = `

                <td>
                    <strong>${escapeHTML(customer)}</strong>
                    <br>
                    <small>
                        ${escapeHTML(phone)}
                    </small>
                </td>

                <td>
                    ${escapeHTML(service)}
                </td>

                <td>
                    ${escapeHTML(workType)}
                </td>

                <td>
                    ${date}
                </td>

                <td>
                    <span class="status ${getStatusClass(status)}">
                        ${escapeHTML(status)}
                    </span>
                </td>

                <td>
                    <button
                        class="view-booking-btn"
                        type="button">
                        View
                    </button>
                </td>

            `;


            /* ==============================
               VIEW BUTTON
            ============================== */

            const viewButton =
                row.querySelector(
                    ".view-booking-btn"
                );


            if (viewButton) {

                viewButton.addEventListener(
                    "click",
                    () => {

                        showBookingDetails(
                            booking
                        );

                    }
                );

            }


            table.appendChild(row);

        });


    } catch (error) {

        console.error(
            "BOOKING LOAD ERROR:",
            error
        );


        table.innerHTML = `
            <tr>
                <td colspan="6"
                    style="text-align:center; padding:30px; color:red;">
                    Unable to load bookings.
                    <br><br>
                    ${escapeHTML(error.message)}
                </td>
            </tr>
        `;

    }

}


/* ==============================
   LOAD CUSTOMERS
============================== */

async function loadCustomers() {

    try {

        const snapshot =
            await getDocs(
                collection(db, "customers")
            );


        const totalCustomers =
            document.getElementById(
                "totalCustomers"
            );


        if (totalCustomers) {

            totalCustomers.textContent =
                snapshot.size;

        }


    } catch (error) {

        console.error(
            "Customer load error:",
            error
        );

    }

}


/* ==============================
   FORMAT DATE
============================== */

function formatDate(timestamp) {

    if (!timestamp) {

        return "N/A";

    }


    try {

        const date =
            timestamp.toDate
                ? timestamp.toDate()
                : new Date(timestamp);


        return date.toLocaleString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
            }
        );

    } catch (error) {

        return "N/A";

    }

}


/* ==============================
   STATUS CLASS
============================== */

function getStatusClass(status) {

    const value =
        String(status)
        .toLowerCase();


    if (value === "completed") {

        return "completed";

    }


    if (value === "cancelled") {

        return "cancelled";

    }


    if (value === "pending") {

        return "pending";

    }


    return "pending";

}


/* ==============================
   BOOKING DETAILS
============================== */

function showBookingDetails(booking) {

    alert(
        "BOOKING DETAILS\n\n" +

        "Customer Name: " +
        (booking.customerName || "N/A") +

        "\nMobile: " +
        (booking.customerPhone || "N/A") +

        "\nService: " +
        (booking.service || "N/A") +

        "\nWork Type: " +
        (booking.workType || "N/A") +

        "\nAddress: " +
        (booking.customerAddress || "N/A") +

        "\nStatus: " +
        (booking.status || "Pending") +

        "\nBooking Date: " +
        formatDate(booking.createdAt)
    );

}


/* ==============================
   ESCAPE HTML
============================== */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* ==============================
   LOGOUT
============================== */

const logoutButton =
    document.getElementById(
        "logoutButton"
    );


if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        async () => {

            try {

                await signOut(auth);

                window.location.href =
                    "admin-login.html";

            } catch (error) {

                console.error(
                    "Logout error:",
                    error
                );

            }

        }
    );

}
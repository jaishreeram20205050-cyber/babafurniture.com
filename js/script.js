const reviews=document.querySelectorAll(".review-card");

let index=0;

setInterval(()=>{

reviews[index].classList.remove("active");

index=(index+1)%reviews.length;

reviews[index].classList.add("active");

},3000);
function openFurniturePopup(){
    document.getElementById("furniturePopup").style.display="block";
}

function closeFurniturePopup(){
    document.getElementById("furniturePopup").style.display="none";
}

window.onclick=function(e){
    let popup=document.getElementById("furniturePopup");

    if(e.target==popup){
        popup.style.display="none";
    }
}
// ==========================================
// GET STARTED POPUP
// ==========================================

function openGetStarted() {

    document.getElementById("getStartedPopup").style.display = "flex";

}


function closeGetStarted() {

    document.getElementById("getStartedPopup").style.display = "none";

}


// ==========================================
// OUTSIDE CLICK = CLOSE
// ==========================================

document.addEventListener("click", function(event) {

    const popup =
        document.getElementById("getStartedPopup");

    if (event.target === popup) {

        closeGetStarted();

    }

});


// ==========================================
// GET INSTANT ESTIMATE
// ==========================================

function getInstantEstimate() {

    const service =
        document.getElementById("startService").value;

    const room =
        document.getElementById("startRoom").value;

    const size =
        document.getElementById("startSize").value;

    const location =
        document.getElementById("startLocation").value;

    const date =
        document.getElementById("startDate").value;


    if (!service) {

        alert("Please select a service.");

        return;

    }


    if (!room) {

        alert("Please select a room / area.");

        return;

    }


    if (!size) {

        alert("Please enter room size.");

        return;

    }


    if (!location) {

        alert("Please enter your location.");

        return;

    }


    alert(
        "Request Submitted Successfully! 🎉\n\n" +
        "Service: " + service + "\n" +
        "Room: " + room + "\n" +
        "Size: " + size + "\n" +
        "Location: " + location
    );

}
function openHowItWorks(){
    window.open(
        "https://youtube.com/shorts/b1FLM8r4ygg?si=qw7LOWaQB6SlfXR-"
    );
}
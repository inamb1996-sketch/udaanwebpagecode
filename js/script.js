// 🔥 Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔥 Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDQ7qIEfv7Z-7WiBsVe0ZyrQlV1xuIffeQ",
  authDomain: "udaan-digital-center.firebaseapp.com",
  projectId: "udaan-digital-center",
  storageBucket: "udaan-digital-center.firebasestorage.app",
  messagingSenderId: "689897741513",
  appId: "1:689897741513:web:e978a845bc9ff7d79d8118"
};

// 🔥 Init
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("🔥 Firebase initialized", db);

// 🔥 TEST FUNCTION
window.sendToFirebase = async function (event) {
  event.preventDefault(); // ⛔ browser ka default submit roko

  console.log("🔥 sendToFirebase CALLED"); // DEBUG

  const form = event.target;

  const name = document.getElementById("name").value;
  const mobile = document.getElementById("mobile").value;
  const email = document.getElementById("email").value;
  const course = document.getElementById("course").value;
  const message = document.getElementById("message").value;

  try {
    // 1️⃣ Firebase FIRST
    await addDoc(collection(db, "contactLeads"), {
      studentName: name,
      mobileNumber: mobile,
      email: email,
      course: course,
      message: message,
      createdAt: serverTimestamp()
    });

    console.log("🔥 Firebase updated");

    // 2️⃣ Google Sheet submit (hidden iframe)
    form.submit();

    // 3️⃣ Reset form
    form.reset();

    // 4️⃣ Popup show
    setTimeout(() => {
      showThankYouPopup();
    }, 200);

  } catch (error) {
    console.error("Firebase error:", error);
    alert("Something went wrong. Please try again.");
  }
};

// 🔔 THANK YOU POPUP FUNCTION (GLOBAL)
window.showThankYouPopup = function () {
  document.getElementById("thankYouPopup").style.display = "flex";
};

// ❌ CLOSE POPUP + GO HOME
window.closeThankYou = function () {
  document.getElementById("thankYouPopup").style.display = "none";
  document.getElementById("home").scrollIntoView({ behavior: "smooth" });
};

// ================= STATS COUNTER =================
const counters = document.querySelectorAll(".count");

const runCounter = (counter) => {
  const target = +counter.getAttribute("data-target");
  let current = 0;
  const increment = target / 100;

  const update = () => {
    current += increment;
    if (current < target) {
      counter.innerText = Math.ceil(current);
      requestAnimationFrame(update);
    } else {
      counter.innerText = target;
    }
  };

  update();
};

const statsSection = document.querySelector(".stats");

const statsObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    counters.forEach(counter => runCounter(counter));
    statsObserver.disconnect();
  }
}, { threshold: 0.4 });

statsObserver.observe(statsSection);


window.checkResult = function () {
  const roll = document.getElementById("rollInput").value.trim();
  const name = document.getElementById("nameInput").value.trim();

  document.getElementById("resultError").innerText = "";
  document.getElementById("marksheet").style.display = "none";

  const scriptURL = "https://script.google.com/macros/s/AKfycbxXMPjofxqZa2G4RQc-rPsRckTwvgB409XiEY1aY2-Ax3L3mEX9R_A4Ff6ZzB9Hb8Iq/exec";

  const url =
    scriptURL +
    "?roll=" +
    encodeURIComponent(roll) +
    "&name=" +
    encodeURIComponent(name);

  console.log("🔎 Fetching:", url); // DEBUG

  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log("📄 Result data:", data); // DEBUG

      if (data.error) {
        document.getElementById("resultError").innerText =
          "Result not found. Please check details.";
        return;
      }

      document.getElementById("ms-name").innerText = data.name;
      document.getElementById("ms-roll").innerText = data.roll;
      document.getElementById("ms-course").innerText = data.course;
      document.getElementById("ms-practical").innerText = data.practical;
      document.getElementById("ms-theory").innerText = data.theory;
      document.getElementById("ms-total").innerText = data.total;
      document.getElementById("ms-result").innerText = data.result;
      document.getElementById("ms-total").innerText = data.total;
// ================= GRADE LOGIC =================
const totalMarks = Number(data.total);
const gradeEl = document.getElementById("ms-grade");

// safety check
if (!gradeEl) {
  console.error("❌ ms-grade span not found in HTML");
} else {
  gradeEl.className = ""; // reset

  let grade = "";

  if (totalMarks >= 80) {
    grade = "A";
    gradeEl.classList.add("grade-a");
  } else if (totalMarks >= 70) {
    grade = "B";
    gradeEl.classList.add("grade-b");
  } else if (totalMarks >= 60) {
    grade = "C";
    gradeEl.classList.add("grade-c");
  } else {
    grade = "D";
    gradeEl.classList.add("grade-d");
  }

  gradeEl.innerText = grade;
}


      // ================= SHOW MARKSHEET =================
const marksheetEl = document.getElementById("marksheet");

if (!marksheetEl) {
  console.error("❌ marksheet div not found in HTML");
  return;
}

marksheetEl.style.display = "block";   // 👈 MOST IMPORTANT LINE
marksheetEl.style.visibility = "visible";
marksheetEl.style.opacity = "1";

// user ko dikhe isliye scroll
marksheetEl.scrollIntoView({ behavior: "smooth" });


      const resultEl = document.getElementById("ms-result");
resultEl.innerText = data.result;

const today = new Date();
const formattedDate = today.toLocaleDateString("en-IN");

document.getElementById("ms-date").innerText = formattedDate;


resultEl.classList.remove("result-pass", "result-fail");

if (data.result.toLowerCase() === "pass") {
  resultEl.classList.add("result-pass");
} else {
  resultEl.classList.add("result-fail");
}

    })
    .catch(err => {
      console.error("❌ Fetch error:", err);
      document.getElementById("resultError").innerText =
        "Something went wrong. Please try again.";
    });
};

window.closeMarksheet = function () {
  const marksheetEl = document.getElementById("marksheet");

  if (marksheetEl) {
    marksheetEl.style.display = "none";
  }

  // optional: error message bhi clear ho
  const errorEl = document.getElementById("resultError");
  if (errorEl) errorEl.innerText = "";
};

// ================= HERO BACKGROUND SLIDER =================

const heroImages = [
  "images/hero1.jpg",
  "images/hero2.jpg",
  "images/hero3.jpg"
];

let heroIndex = 0;
const heroSection = document.querySelector(".hero");

setInterval(() => {
  heroIndex = (heroIndex + 1) % heroImages.length;
  heroSection.style.backgroundImage =
    `url('${heroImages[heroIndex]}')`;
}, 2000); // 2 seconds

// ================= TESTIMONIAL SLIDER =================

const testimonials = document.querySelectorAll(".testimonial");
let testimonialIndex = 0;

setInterval(() => {
  testimonials[testimonialIndex].classList.remove("active");
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  testimonials[testimonialIndex].classList.add("active");
}, 3000); // 3 seconds

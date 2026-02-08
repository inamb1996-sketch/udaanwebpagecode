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

// ================= FULL COURSE DETAILS (UDAAN) =================

const courseDetails = {

  "basic-computer": {
    title: "Basic Computer Course",
    duration: "3 Months",
    fees: "₹2500 – ₹3500",
    syllabus: [
      "Computer ka basic knowledge (Hardware & Software)",
      "Windows operating system",
      "File & Folder management",
      "Typing practice (Hindi + English)",
      "Internet, Email, Online forms",
      "Printer, Scanner usage"
    ],
    note: "Ye course beginners, school students, housewives aur elders ke liye perfect hai. Computer ka strong base banata hai."
  },

  "ms-office": {
    title: "MS Office Course",
    duration: "3–4 Months",
    fees: "₹3000 – ₹4500",
    syllabus: [
      "MS Word – documents, letters, formatting",
      "MS Excel – formulas, tables, reports",
      "MS PowerPoint – presentations",
      "Office practical work",
      "Real-life office tasks"
    ],
    note: "Private job, office work, school projects aur competitive exams ke liye bahut useful course."
  },

  "excel": {
    title: "Excel Course",
    duration: "2 Months",
    fees: "₹2000 – ₹3000",
    syllabus: [
      "Excel basics",
      "Formulas & functions",
      "Charts & graphs",
      "Data entry & analysis",
      "Practical exercises"
    ],
    note: "Accounting, office jobs aur data handling ke liye Excel ek must-have skill hai."
  },

  "advanced-excel": {
    title: "Advanced Excel Course",
    duration: "2–3 Months",
    fees: "₹3500 – ₹5000",
    syllabus: [
      "Advanced formulas",
      "Pivot tables",
      "Data validation",
      "Dashboard creation",
      "MIS reports"
    ],
    note: "Job-oriented course hai. Banking, accounts, corporate jobs ke liye kaafi demand me."
  },

  "tally": {
    title: "Tally ERP 9 with GST",
    duration: "4–6 Months",
    fees: "₹6000 – ₹9000",
    syllabus: [
      "Accounting fundamentals",
      "Tally ERP 9 software",
      "GST (CGST, SGST, IGST)",
      "Invoices & returns",
      "Real-world accounting practice"
    ],
    note: "Accounts, billing, CA office, shop accounting ke liye best professional course."
  },

  "digital-marketing": {
    title: "Digital Marketing Course",
    duration: "3–4 Months",
    fees: "₹5000 – ₹8000",
    syllabus: [
      "Digital marketing basics",
      "Social media marketing",
      "Facebook & Instagram ads",
      "SEO basics",
      "Online business promotion"
    ],
    note: "Online earning, freelancing aur business growth ke liye modern skill."
  },

  "coding": {
    title: "Coding Fundamentals",
    duration: "3 Months",
    fees: "₹4000 – ₹6000",
    syllabus: [
      "Programming logic",
      "HTML, CSS basics",
      "JavaScript introduction",
      "Problem solving skills",
      "Mini projects"
    ],
    note: "School students aur beginners ke liye coding ka strong foundation."
  },

  "sql": {
    title: "SQL Database Course",
    duration: "2 Months",
    fees: "₹3000 – ₹4500",
    syllabus: [
      "Database basics",
      "SQL queries",
      "Data retrieval & management",
      "Practical database tasks"
    ],
    note: "IT, data, software jobs ke liye database knowledge zaruri hai."
  },

  "typing": {
    title: "Typing Course (Hindi & English)",
    duration: "2–3 Months",
    fees: "₹1500 – ₹2500",
    syllabus: [
      "Hindi typing",
      "English typing",
      "Speed & accuracy practice",
      "Govt exam pattern typing"
    ],
    note: "Government exams, clerical jobs aur office work ke liye essential."
  },

  "o-level": {
    title: "O-Level (NIELIT)",
    duration: "1 Year",
    fees: "As per Govt norms",
    syllabus: [
      "IT tools",
      "Programming",
      "Web technology",
      "Practical & theory"
    ],
    note: "Government recognized computer course, job ke liye powerful certificate."
  },

  "dbms": {
    title: "DBMS Course",
    duration: "2 Months",
    fees: "₹3000 – ₹4000",
    syllabus: [
      "Database concepts",
      "DBMS models",
      "Normalization",
      "Practical examples"
    ],
    note: "BCA, MCA, IT students ke liye important academic & job skill."
  },

  "python": {
    title: "Python Programming",
    duration: "3–4 Months",
    fees: "₹5000 – ₹7000",
    syllabus: [
      "Python basics",
      "Logic building",
      "Functions & modules",
      "Mini projects"
    ],
    note: "Programming, automation aur future technologies ke liye popular language."
  },

  "python-ai": {
    title: "Python with AI",
    duration: "4–5 Months",
    fees: "₹7000 – ₹10000",
    syllabus: [
      "Python advanced",
      "AI basics",
      "Machine learning intro",
      "AI practical projects"
    ],
    note: "Future-ready course. AI field me career banane ke liye best choice."
  },

  "python-ds": {
    title: "Python with Data Science",
    duration: "4–5 Months",
    fees: "₹8000 – ₹12000",
    syllabus: [
      "Python for data",
      "Data analysis",
      "Visualization",
      "Real datasets"
    ],
    note: "Data analyst aur analytics jobs ke liye high-demand skill."
  },

  "chatgpt-ai": {
    title: "AI with ChatGPT",
    duration: "1–2 Months",
    fees: "₹2500 – ₹4000",
    syllabus: [
      "AI tools usage",
      "ChatGPT practical work",
      "Prompt engineering",
      "Productivity automation"
    ],
    note: "Students, teachers, business owners ke liye productivity booster course."
  },

  "ai": {
    title: "Artificial Intelligence",
    duration: "4 Months",
    fees: "₹7000 – ₹10000",
    syllabus: [
      "AI fundamentals",
      "AI applications",
      "Real-world use cases"
    ],
    note: "Future technology me interest rakhne walon ke liye strong base."
  },

  "data-analysis": {
    title: "Data Analysis Course",
    duration: "3–4 Months",
    fees: "₹6000 – ₹9000",
    syllabus: [
      "Data basics",
      "Analysis techniques",
      "Reports & insights"
    ],
    note: "Corporate, IT aur analytics roles ke liye important skill."
  },

  "chatbot": {
    title: "Chatbot Development",
    duration: "2–3 Months",
    fees: "₹4000 – ₹6000",
    syllabus: [
      "Chatbot basics",
      "Logic design",
      "Practical chatbot creation"
    ],
    note: "Automation aur AI tools me interest rakhne walon ke liye useful."
  }

};

document.querySelectorAll(".course-card").forEach(card => {
  card.addEventListener("click", () => {
    const key = card.getAttribute("data-course");
    const data = courseDetails[key];
    if (!data) return;

    document.getElementById("courseTitle").innerText = data.title;
    document.getElementById("courseDuration").innerText = data.duration;
    document.getElementById("courseFees").innerText = data.fees;

    const list = document.getElementById("courseSyllabus");
    list.innerHTML = "";
    data.syllabus.forEach(item => {
      const li = document.createElement("li");
      li.innerText = item;
      list.appendChild(li);
    });

    document.getElementById("courseNote").innerText = data.note;
    document.getElementById("courseModal").style.display = "flex";
  });
});

window.closeCourseModal = function () {
  document.getElementById("courseModal").style.display = "none";
};

  
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


// ================= HAMBURGER MENU =================
// ================= HAMBURGER MENU (GLOBAL) =================
window.toggleMenu = function () {
  const nav = document.getElementById("navMenu");
  if (!nav) {
    console.error("navMenu not found");
    return;
  }
  nav.classList.toggle("active");
};

// ================= AUTO CLOSE MENU ON CLICK =================
document.querySelectorAll("#navMenu a").forEach(link => {
  link.addEventListener("click", () => {
    const nav = document.getElementById("navMenu");
    if (nav.classList.contains("active")) {
      nav.classList.remove("active");
    }
  });
});

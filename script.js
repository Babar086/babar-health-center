// ================================
// ADVANCED HOSPITAL MANAGEMENT JS
// ================================

// ---------- PAGE NAVIGATION ----------
function showPage(pageId) {
    let pages = document.querySelectorAll(".page");

    pages.forEach(page => {
        page.style.display = "none";
    });

    document.getElementById(pageId).style.display = "block";
}

// default page
window.onload = function () {
    showPage("home");
    renderPatients();
    renderDoctors();
    renderAppointments();
};

// ---------- TOAST NOTIFICATION ----------
function showToast(message) {
    let toast = document.createElement("div");
    toast.innerText = message;

    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.right = "20px";
    toast.style.background = "#222";
    toast.style.color = "#fff";
    toast.style.padding = "12px 20px";
    toast.style.borderRadius = "8px";
    toast.style.zIndex = "9999";
    toast.style.fontSize = "14px";

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 2500);
}

// ================================
// PATIENT SYSTEM (CRUD)
// ================================
let patients = JSON.parse(localStorage.getItem("patients")) || [];

function addPatient() {
    let name = document.getElementById("patientName").value;
    let age = document.getElementById("patientAge").value;
    let disease = document.getElementById("patientDisease").value;

    if (!name || !age || !disease) {
        showToast("⚠ Please fill all fields");
        return;
    }

    let patient = {
        id: Date.now(),
        name,
        age,
        disease
    };

    patients.push(patient);
    localStorage.setItem("patients", JSON.stringify(patients));

    clearPatientForm();
    renderPatients();

    showToast("✅ Patient Added");
}

function deletePatient(id) {
    patients = patients.filter(p => p.id !== id);
    localStorage.setItem("patients", JSON.stringify(patients));
    renderPatients();

    showToast("🗑 Patient Deleted");
}

function renderPatients() {
    let list = document.getElementById("patientList");
    list.innerHTML = "";

    patients.forEach(p => {
        list.innerHTML += `
            <li>
                <b>${p.name}</b> | Age: ${p.age} | Disease: ${p.disease}
                <button onclick="deletePatient(${p.id})">Delete</button>
            </li>
        `;
    });
}

function clearPatientForm() {
    document.getElementById("patientName").value = "";
    document.getElementById("patientAge").value = "";
    document.getElementById("patientDisease").value = "";
}

// ================================
// SEARCH PATIENT
// ================================
function searchPatient() {
    let keyword = document.getElementById("searchBox").value.toLowerCase();
    let list = document.getElementById("patientList");

    let filtered = patients.filter(p =>
        p.name.toLowerCase().includes(keyword)
    );

    list.innerHTML = "";

    filtered.forEach(p => {
        list.innerHTML += `
            <li>
                <b>${p.name}</b> | Age: ${p.age} | Disease: ${p.disease}
            </li>
        `;
    });
}

// ================================
// DOCTOR SYSTEM
// ================================
let doctors = [
    { name: "Dr. Ahmed", specialization: "Cardiologist" },
    { name: "Dr. Sara", specialization: "Dermatologist" },
    { name: "Dr. Ali", specialization: "Neurologist" },
    { name: "Dr. Usman", specialization: "Orthopedic" }
];

function renderDoctors() {
    let list = document.getElementById("doctorList");
    list.innerHTML = "";

    doctors.forEach(d => {
        list.innerHTML += `
            <li>
                👨‍⚕️ ${d.name} - ${d.specialization}
            </li>
        `;
    });
}

// ================================
// APPOINTMENT SYSTEM
// ================================
let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

function bookAppointment() {
    let patient = document.getElementById("appPatient").value;
    let doctor = document.getElementById("appDoctor").value;
    let date = document.getElementById("appDate").value;

    if (!patient || !doctor || !date) {
        showToast("⚠ Fill all appointment fields");
        return;
    }

    let appointment = {
        id: Date.now(),
        patient,
        doctor,
        date
    };

    appointments.push(appointment);
    localStorage.setItem("appointments", JSON.stringify(appointments));

    renderAppointments();

    showToast("📅 Appointment Booked");
}

function renderAppointments() {
    let list = document.getElementById("appointmentList");
    list.innerHTML = "";

    appointments.forEach(a => {
        list.innerHTML += `
            <li>
                ${a.patient} → ${a.doctor} on ${a.date}
            </li>
        `;
    });
}

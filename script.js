function calculateCalories() {
    let age = parseFloat(document.getElementById("age").value);
    let weight = parseFloat(document.getElementById("weight").value);
    let height = parseFloat(document.getElementById("height").value);
    let gender = document.getElementById("gender").value;
    let activity = parseFloat(document.getElementById("activity").value);
    let goal = document.getElementById("goal").value;

    if (!age || !weight || !height) {
        alert("Harap isi semua data!");
        return;
    }

    // Rumus Mifflin-St Jeor (lebih akurat)
    let BMR;
    let formula;
    
    if (gender === "male") {
        BMR = (10 * weight) + (6.25 * height) - (5 * age) + 5;
        formula = `BMR (Laki-laki) = (10 × ${weight}) + (6.25 × ${height}) - (5 × ${age}) + 5`;
    } else {
        BMR = (10 * weight) + (6.25 * height) - (5 * age) - 161;
        formula = `BMR (Perempuan) = (10 × ${weight}) + (6.25 × ${height}) - (5 × ${age}) - 161`;
    }

    // Hitung TDEE
    let dailyCalories = BMR * activity;
    let activityDesc = `TDEE: ${BMR.toFixed(2)} × ${activity} = ${dailyCalories.toFixed(2)} kalori`;

    // Sesuaikan kalori berdasarkan tujuan
    let goalDesc;
    let adjustedCalories;
    switch(goal) {
        case 'cutting':
            adjustedCalories = dailyCalories - 500;
            goalDesc = `Defisit 500 kalori untuk Cutting: ${adjustedCalories.toFixed(2)} kalori`;
            break;
        case 'bulking':
            adjustedCalories = dailyCalories + 500;
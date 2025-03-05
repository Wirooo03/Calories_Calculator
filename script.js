function calculateCalories() {
    let age = parseFloat(document.getElementById("age").value);
    let weight = parseFloat(document.getElementById("weight").value);
    let height = parseFloat(document.getElementById("height").value);
    let gender = document.getElementById("gender").value;
    let activity = parseFloat(document.getElementById("activity").value);
    let goal = document.getElementById("goal").value;

    // Validasi input
    if (isNaN(age) || isNaN(weight) || isNaN(height) || age <= 0 || weight <= 0 || height <= 0) {
        alert("Harap isi semua data dengan angka yang valid!");
        return;
    }

    // Hitung BMR dengan rumus Mifflin-St Jeor
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
            goalDesc = `Surplus 500 kalori untuk Bulking: ${adjustedCalories.toFixed(2)} kalori`;
            break;
        case 'maintain':
        default:
            adjustedCalories = dailyCalories;
            goalDesc = `Kalori tetap untuk Maintain: ${adjustedCalories.toFixed(2)} kalori`;
            break;
    }

    // Tentukan persentase makronutrien berdasarkan tujuan
    let proteinPercent, fatPercent, carbPercent;

    if (goal === 'cutting') {
        proteinPercent = 40;
        fatPercent = 30;
        carbPercent = 30;
    } else if (goal === 'bulking') {
        proteinPercent = 30;
        fatPercent = 25;
        carbPercent = 45;
    } else {
        proteinPercent = 30;
        fatPercent = 30;
        carbPercent = 40;
    }

    // Hitung makronutrien dalam gram
    let proteinCalories = (proteinPercent / 100) * adjustedCalories;
    let fatCalories = (fatPercent / 100) * adjustedCalories;
    let carbCalories = (carbPercent / 100) * adjustedCalories;

    let proteinGrams = proteinCalories / 4;
    let fatGrams = fatCalories / 9;
    let carbGrams = carbCalories / 4;

    // Tampilkan hasil ke pengguna
    document.getElementById("result").innerHTML = `
        <p><strong>Formula:</strong> ${formula}</p>
        <p><strong>${activityDesc}</strong></p>
        <p><strong>${goalDesc}</strong></p>
        <h3>Makronutrien Harian:</h3>
        <p>Protein: ${proteinGrams.toFixed(2)}g (${proteinPercent}% dari total kalori)</p>
        <p>Lemak: ${fatGrams.toFixed(2)}g (${fatPercent}% dari total kalori)</p>
        <p>Karbohidrat: ${carbGrams.toFixed(2)}g (${carbPercent}% dari total kalori)</p>
    `;
}

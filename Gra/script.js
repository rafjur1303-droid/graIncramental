//=====(ZMIENNE)=====
let money = 0;
let multiplier = 0;
let rebirth = 0;
//=====(ADMIN)=====
let superRebirth = 0;
let adminX = 1;
//=====(UBGRADE 1)=====
let up1Count = 0;
let up1Cost = 5000;
let up1Boost = 1;
//=====(UBGRADE 2)=====
let up2Count = 0;
let up2Cost = 100000;
let up2Active = false;
let up2Boost = 1;
//=====(UBGRADE 3)=====
let up3Count = 0;
let up3Cost = 250;
let up3Boost = 1;
//=====(UBGRADE 4)=====
let up4Count = 0;
let up4Cost = 1000;
let up4Active = false;
let up4Boost = 1;
let playTime = 0;
//=====(ZAPIS)=====
function saveGame() {
    let save = {
        //=====(ZMIENNE DO ZAPISU)=====
        money: money,
        multiplier: multiplier,
        rebirth: rebirth,
        superRebirth: superRebirth,
        up1Count: up1Count,
        up1Cost: up1Cost,
        up1Boost: up1Boost,
        up2Count: up2Count,
        up2Cost: up2Cost,
        up2Boost: up2Boost,
        up2Active: up2Active,
        up3Count: up3Count,
        up3Cost: up3Cost,
        up3Boost: up3Boost,
        up4Count: up4Count,
        up4Cost: up4Cost,
        up4Boost: up4Boost,
        up4Active: up4Active,
        playTime: playTime,
    };
    localStorage.setItem("mojaGraSave", JSON.stringify(save));
    console.log("Gra zapisana!");
}
//=====(WCZYTYWANIE)=====
function loadGame() {
    let savedData = localStorage.getItem("mojaGraSave");
    if (savedData) {
        let save = JSON.parse(savedData);
        //=====(ZMIENNE DO WCZYTYWANIA)=====
        money = save.money;
        multiplier = save.multiplier;
        rebirth = save.rebirth;
        superRebirth = save.superRebirth;
        up1Count = save.up1Count;
        up1Cost = save.up1Cost;
        up1Boost = save.up1Boost;
        up2Count = save.up2Count;
        up2Cost = save.up2Cost;
        up2Boost = save.up2Boost;
        up2Active = save.up2Active;
        up3Count = save.up3Count;
        up3Cost = save.up3Cost;
        up3Boost = save.up3Boost;
        up4Count = save.up4Count;
        up4Cost = save.up4Cost;
        up4Boost = save.up4Boost;
        up4Active = save.up4Active;
        playTime = save.playTime;
        console.log("Gra wczytana!");
    }
}
//=====(HARD RESET)=====
function resetGame() {
    localStorage.removeItem("mojaGraSave");
    location.reload();
}
//=====(FUNKCJA DO FORMATOWANIA)=====
function formatujLiczbe(n) {
    if (n < 1000) {
        // parseFloat usunie .00, ale zostawi np. .12
        return parseFloat(n.toFixed(2));
    }
    else if (n < 1000000) {
        return parseFloat((n / 1000).toFixed(2)) + "k";
    }
    else if (n < 1000000000) {
        return parseFloat((n / 1000000).toFixed(2)) + "m";
    }
    else {
        let wykladnik = Math.floor(Math.log10(n));
        let mantysa = parseFloat((n / Math.pow(10, wykladnik)).toFixed(2));

        return mantysa + "e" + wykladnik;
    }
}
//=====(MENU)=====
function switchMainTab(id) {
    const mainTabs = document.querySelectorAll('.main-tab');
    mainTabs.forEach(tab => tab.classList.remove('active'));
    const activeTab = document.getElementById(id);
    activeTab.classList.add('active');
    const firstSub = activeTab.querySelector('.sub-tab');
    if (firstSub) {
        switchSubTab(firstSub.id);
    }
}
//=====(MENU)======
function switchSubTab(id) {
    const currentMain = document.querySelector('.main-tab.active');
    const subTabs = currentMain.querySelectorAll('.sub-tab');
    subTabs.forEach(sub => sub.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}
function round(liczba) {
    return Math.round(liczba * 100) / 100;
}
//=====(PRZYCISKI)=====
function buyMultiplier() {
    if (money >= 100) {
        money -= 100;
        multiplier += 1 * (rebirth + 1) * up2Boost * up3Boost;
        updateUI();
    }
}
//=====
function buyRebirth() {
    if (multiplier >= 100) {
        money = 0;
        rebirth += round(((Math.log10(multiplier + 1.01) - 1) ** 2) * (superRebirth + 1) * up4Boost);
        multiplier = 0;
        updateUI();
    }
}
//=====
function buySuperRebirth() {
    if (rebirth >= 100) {
        money = 0;
        multiplier = 0;
        superRebirth += round(((Math.log10(rebirth + 1.01) - 1) ** 2.2));
        rebirth = 0;
        updateUI();
    }
}
//=====(UPGRADE)=====
function Upgrade1() {
     if(money >= up1Cost && up1Count < 10) {
         money -= up1Cost;
         up1Cost *= 1.3;
         up1Boost *= 1.10;
         up1Count++;
         updateUI();
     }
}
function Upgrade2() {
    if(money >= up2Cost && up2Count < 1) {
        money -= up2Cost;
        up2Active = true;
        up2Count++;
    }
}
function Upgrade3() {
    if(multiplier >= up3Cost && up3Count < 10) {
        multiplier -= up3Cost;
        up3Cost *= 1.3;
        up3Boost *= 1.15;
        up3Count++;
        updateUI();
    }
}
function Upgrade4() {
    if(multiplier >= up4Cost && up4Count < 1) {
        multiplier -= up4Cost;
        up4Active = true;
        up4Count++;
    }
}
//=====(PRZYCISKI ADMIN)=====
function AdminM(){
    multiplier += adminX;
}
//=====
function AdminR(){
    rebirth += adminX;
}
//=====
function AdminRS(){
    superRebirth += adminX;
}
//=====
function AdminXReset(){
    adminX = 1;
}
//=====
function AdminX10(){
    adminX *= 10;
}
//=====
function AdminX100(){
    adminX *= 100;
}
//=====(AUTO KASA)=====
setInterval(() => {
    money += (multiplier + 1) * up1Boost;
    updateUI();
}, 100);
//=====(CZAS GRY)=====
setInterval(() => {
    playTime += 0.1
    updateUI();
}, 100);
//=====(AUTO ZAPIS)=====
setInterval(() => {
    saveGame();
}, 5000);
//=====(WCZYTYWANIE GRY)=====
window.onload = function() {
    loadGame();
};
//=====(AKTUALIZACJA EKRANU)=====
function updateUI() {
    let multiplier_gain = (rebirth + 1) * up2Boost * up3Boost;
    let test_rebirth_gain = round(((Math.log10(multiplier + 1.01) - 1) ** 2) * (superRebirth + 1) * up4Boost);
    let rebirth_gain = 0;
    if (test_rebirth_gain >= 1 && multiplier >= 100) {
        rebirth_gain = test_rebirth_gain;
    } else {
        rebirth_gain = 0;
    }
    let test_superRebirth_gain = round(((Math.log10(rebirth + 1.01) - 1) ** 2.2));
    let superRebirth_gain = 0;
    if (test_superRebirth_gain >= 1) {
        superRebirth_gain = test_superRebirth_gain.toFixed(2);
    } else {
        superRebirth_gain = 0;
    }
    document.getElementById("AdminX").innerText =
        formatujLiczbe(adminX);
    //==========
    document.getElementById("money_amount").innerText =
        "Money: " + formatujLiczbe(money) + "$";
    //==========
    document.getElementById("multiplier_amount").innerText =
        "Multiplier: " + formatujLiczbe(multiplier);
    document.getElementById("multiplier_gain").innerText =
        formatujLiczbe(multiplier_gain);
    let btnMultiplier = document.getElementById("btn-multiplier");
    if (money < 100) {
        btnMultiplier.classList.add("btn-locked");
    } else {
        btnMultiplier.classList.remove("btn-locked");
    }
    //==========
    document.getElementById("rebirth_amount").innerText =
        "Rebirth: " + formatujLiczbe(rebirth);
    let btnRebirth = document.getElementById("btn-rebirth");
    if (multiplier < 100) {
        btnRebirth.classList.add("btn-locked");
    } else {
        btnRebirth.classList.remove("btn-locked");
    }
    document.getElementById("rebirth_gain").innerText =
        formatujLiczbe(rebirth_gain);
    //==========
    document.getElementById("superRebirth_amount").innerText =
        "Super Rebirth: " + formatujLiczbe(superRebirth);
    document.getElementById("superRebirth_gain").innerText =
        superRebirth_gain;
    let btnSuperRebirth = document.getElementById("btn-superRebirth");
    if (rebirth < 100) {
        btnSuperRebirth.classList.add("btn-locked");
    } else {
        btnSuperRebirth.classList.remove("btn-locked");
    }
    //==========
    document.getElementById("up1_cost").innerText =
        formatujLiczbe(up1Cost);
    document.getElementById("up1_count").innerText =
        up1Count;
    document.getElementById("up1_boost").innerText =
        round(up1Boost);
    let btnUp1 = document.getElementById("btn-Up-1");
    if (money < up1Cost || up1Count == 10) {
        btnUp1.classList.add("btn-locked");
    } else {
        btnUp1.classList.remove("btn-locked");
    }
    //==========
    let test_up2_boost = 0.6 + 0.6 * Math.log10(Math.log10(Math.max(1, money) * 13 + 1) * 13)
    if (up2Active == true){
        up2Boost = test_up2_boost;
    }
    document.getElementById("up2_count").innerText =
        up2Count;
    document.getElementById("up2_boost").innerText =
        round(test_up2_boost);
    let btnUp2 = document.getElementById("btn-Up-2");
    if (money < 100000 || up2Count == 1) {
        btnUp2.classList.add("btn-locked");
    } else {
        btnUp2.classList.remove("btn-locked");
    }
    //==========
    document.getElementById("up3_cost").innerText =
        formatujLiczbe(up3Cost);
    document.getElementById("up3_count").innerText =
        up3Count;
    document.getElementById("up3_boost").innerText =
        round(up3Boost);
    let btnUp3 = document.getElementById("btn-Up-3");
    if (multiplier < up3Cost || up3Count == 10) {
        btnUp3.classList.add("btn-locked");
    } else {
        btnUp3.classList.remove("btn-locked");
    }
    let test_up4_boost = round(1.16 + Math.log10(Math.log10(Math.max(1, playTime)**0.6 + 1.1) + 1.2))
    if (up4Active == true) {
        up4Boost = test_up4_boost;
    }
    document.getElementById("up4_count").innerText =
        up4Count;
    document.getElementById("up4_boost").innerText =
        round(test_up4_boost);
    let btnUp4 = document.getElementById("btn-Up-4");
    if (multiplier < 1000 || up4Count == 1) {
        btnUp4.classList.add("btn-locked");
    } else {
        btnUp4.classList.remove("btn-locked");
    }
}
let perClick = 1;
let coins = 0;
let display;
let upgrades = {
    1: { cost: 1000, value: 1, img: "img/n.jpg" },
    2: { cost: 5000, value: 2, img: "img/lvl2.jpg" },
    3: { cost: 10000, value: 3, img: "img/lvl3.jpg" },
    4: { cost: 20000, value: 4, img: "img/Новий проєкт (3).png" }
};

let clickCooldown = false;

function getCoin() {
    if (clickCooldown) return;
    clickCooldown = true;
    coins += perClick;
    display.innerHTML = "Goray Coins: " + coins;
    localStorage.setItem('coins', coins);

    // Disable the button for 500 milliseconds to prevent auto-clicking
    document.getElementById("click").disabled = true;
    setTimeout(() => {
        document.getElementById("click").disabled = false;
        clickCooldown = false;
    }, 250);
}

window.onload = function () {
    display = document.getElementById("coins");
    let savedCoins = localStorage.getItem('coins');
    if (savedCoins !== null) {
        coins = parseInt(savedCoins);
    }
    let savedPerClick = localStorage.getItem('perClick');
    if (savedPerClick !== null) {
        perClick = parseInt(savedPerClick);
    }
    let savedImg = localStorage.getItem('img');
    if (savedImg !== null) {
        document.querySelector('img').src = savedImg;
    }
    display.innerHTML = "Goray Coins: " + coins;
};

function buyUpgrade(upgradeId) {
    let upgrade = upgrades[upgradeId];
    if (coins >= upgrade.cost) {
        coins -= upgrade.cost;
        perClick += upgrade.value;
        document.querySelector('img').src = upgrade.img;
        localStorage.setItem('coins', coins);
        localStorage.setItem('perClick', perClick);
        localStorage.setItem('img', upgrade.img);
        display.innerHTML = "Goray Coins: " + coins; // Update displayed coins
        alert(`You bought ${upgrade.value} coin(s) per click upgrade!`);
    } else {
        alert("Not enough coins!");
    }
}

function resetUpgrades() {
    perClick = 1;
    localStorage.removeItem('perClick');

}

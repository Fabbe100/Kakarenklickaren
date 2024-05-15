let countCookies = document.getElementById('coockies');
let btnCookie = document.getElementById('cclicker'); 
let upgradeBtn = document.getElementById('doubble');
let myuppgrade = document.getElementById('uppgrade');
let upgradeCostSpan = document.getElementById('upgradeCost');
let coursorBtn = document.getElementById('coursor');
let uccoursorSpan = document.getElementById('uccoursor');
let boosterBtn = document.getElementById('buy-booster');
let cursorInterval;
const boosterDuration = 10 * 1000;

document.getElementById('buy-booster').addEventListener('click', buyBooster);
boosterBtn.style.display = 'none'


let count = 0;
let doubleEnabled = false;
let cursorRate = 0.2;
let coockiesPerSecond = 0;
let boosterActive = false;
let originalUpgradeLevel;
let originalCursorRate;

btnCookie.addEventListener('click', cookieIncrement);
let upgradeLevel = 1;

btnCookie.addEventListener('click', cookieIncrement);
upgradeBtn.addEventListener('click', upgradeIncrement);
coursorBtn.addEventListener('click', cursorAdd)

function cookieIncrement() {
    count += upgradeLevel;
    count = parseFloat(count.toFixed(1));
    countCookies.innerHTML = "Kakor : " + count;
}

function upgradeIncrement() {
    let upgradeCost = parseInt(upgradeCostSpan.textContent);
    let newUpgradeCost = upgradeCost * 1.5;

    if (count >= upgradeCost) {
        upgradeLevel++; 
        myuppgrade.innerHTML = "Coockies per click : " + upgradeLevel;
        count -= upgradeCost; 
        countCookies.innerHTML = "Kakor : " + count;
        upgradeCostSpan.textContent = newUpgradeCost; 
        
    }
}

function cursorAdd() {
    let cursorCost = parseInt(uccoursorSpan.textContent);
    let newCursorCost = cursorCost * 1.5; 

    if (count >= cursorCost) {
        count -= cursorCost;
        countCookies.innerHTML = "Kakor: " + count.toFixed(1); 

        
        setInterval(function() {
            count += cursorRate;
            count = Math.round(count * 10) / 10; 
            countCookies.innerHTML = "Kakor: " + count.toFixed(1);
        }, 1000);
        
        uccoursorSpan.textContent = newCursorCost;
        coockiesPerSecond += cursorRate; 
        document.getElementById("coockiespsek").textContent = "Coockies per Second : " + coockiesPerSecond.toFixed(1);
    }
}

function showBoosterButton() {
    boosterBtn.style.display = 'block';
}

function randomTime(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function scheduleBoosterAppearance() {
    setTimeout(showBoosterButton, randomTime(3000, 4200)); // Random time between 5 to 7 minutes (300000 to 420000 milliseconds)
}

scheduleBoosterAppearance();

function buyBooster() {
    
    const boosterCost = 10;
    
    if (count >= boosterCost && !boosterActive) {
        count -= boosterCost;
        countCookies.innerHTML = "Kakor : " + count;
        
        
        boosterActive = true;
        activateBooster();
        
       
        boosterBtn.style.display = 'none';
        
        
        scheduleBoosterAppearance();
    }
}

function activateBooster() {
    // Store original values
    originalUpgradeLevel = upgradeLevel;
    originalCursorRate = cursorRate;
    originalCoockiesPerSecond = coockiesPerSecond;

    // Update values for booster
    upgradeLevel *= 3;
    cursorRate *= 3;
    coockiesPerSecond += cursorRate * 10; // Assuming each click is every second, multiply the rate by 10

    // Update UI to reflect booster
    countCookies.innerHTML = "Kakor : " + count;
    myuppgrade.innerHTML = "Coockies per click : " + upgradeLevel;
    document.getElementById("coockiespsek").textContent = "Coockies per Second : " + coockiesPerSecond.toFixed(1);

    // Clear previous interval
    clearInterval(cursorInterval);

    // Start new interval only if booster is not active
    if (!boosterActive) {
        cursorInterval = setInterval(function() {
            count += cursorRate;
            count = Math.round(count * 10) / 10; 
            countCookies.innerHTML = "Kakor: " + count.toFixed(1);
        }, 1000);
    }

    // Set timeout to deactivate booster after duration
    setTimeout(() => {
        // Restore original values
        upgradeLevel = originalUpgradeLevel;
        cursorRate = originalCursorRate;
        coockiesPerSecond = originalCoockiesPerSecond;

        // Update UI to reflect original values
        countCookies.innerHTML = "Kakor : " + count;
        myuppgrade.innerHTML = "Coockies per click : " + upgradeLevel;
        document.getElementById("coockiespsek").textContent = "Coockies per Second : " + coockiesPerSecond.toFixed(1);

        // Restart interval if booster is not active
        if (!boosterActive) {
            cursorInterval = setInterval(function() {
                count += cursorRate;
                count = Math.round(count * 10) / 10; 
                countCookies.innerHTML = "Kakor: " + count.toFixed(1);
            }, 1000);
        }

        // Reset booster status
        boosterActive = false;
    }, boosterDuration);
}
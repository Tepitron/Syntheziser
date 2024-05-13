/*
GLOBAL VARIABLES! NEVER EVER USE GLOBAL VARIABLES, IT IS DEATH.
*/

var moneyCounter = 0;
var moneyRequiredShovel = 10;
var moneyRequiredWorker = 100;
var shovelEfficiency = 1;
var workerEfficiency = 0;
var MONEYREQUIREDFORUPGRADEVISIBILITY = 30;
var MONEYREQUIREDFORUPGRADE = 50;
var WORKERTIMEINTERVAL = 1000;

/*
EVENTS
*/

var gather = document.getElementById("gather");
gather.addEventListener("click", gatherMoney);

var shovel = document.getElementById("shovel");
shovel.addEventListener("click", buyShovel);

var worker = document.getElementById("worker");
worker.addEventListener("click", buyWorker);

var upgrade = document.getElementById("workerupgrade");
upgrade.addEventListener("click", buyUpgrade);

var workerIntervalID = setInterval(workerMakeMoney, WORKERTIMEINTERVAL);

var upgradeCheckID = setInterval(checkMoneyForUpgrades, 1001);

/*
FUNCTIONS
*/

function gatherMoney(){
    moneyCounter += shovelEfficiency;
    updateVisibleMoneyCounter(moneyCounter);
}

function buyShovel(){
    if(moneyCounter >= moneyRequiredShovel){
        reduceMoneyCounter(moneyRequiredShovel);
        moneyRequiredShovel = Math.round(moneyRequiredShovel * 5);
        shovelEfficiency = Math.round(shovelEfficiency *= 2);
        var strMoneyRequiredShovel = " " + moneyRequiredShovel.toString();
        updateVisibleMoneyCounter(moneyCounter);
        let wholeShovelText = document.getElementById("shovel").textContent
        let numbers = document.getElementById("shovel").textContent.slice
                                    (18, document.getElementById("shovel").textContent.indexOf(" M"));
                    
        result = wholeShovelText.replace(numbers, strMoneyRequiredShovel);
        document.getElementById("shovel").textContent = result;
    }
}

function updateVisibleMoneyCounter(moneyCounter){
    document.getElementById("moneyCounter").innerHTML = moneyCounter;
}

function buyWorker(){
    if(moneyCounter >= moneyRequiredWorker){
        moneyCounter -= moneyRequiredWorker;
        updateVisibleMoneyCounter(moneyCounter);
        moneyRequiredWorker = Math.round(moneyRequiredWorker * 1.20);
        workerEfficiency += 1;
        var strMoneyRequiredWorker = " " + moneyRequiredWorker.toString();
        let wholeWorkerText = document.getElementById("worker").textContent
        let numbers = document.getElementById("worker").textContent.slice
                                    (18, document.getElementById("worker").textContent.indexOf(" M"));
                    
        result = wholeWorkerText.replace(numbers, strMoneyRequiredWorker);
        document.getElementById("worker").textContent = result;
    }
}

function reduceMoneyCounter(reducableAmount){
    moneyCounter -= reducableAmount;
    return moneyCounter;
}

function workerMakeMoney(){
    moneyCounter += workerEfficiency;
    updateVisibleMoneyCounter(moneyCounter);
}

function checkMoneyForUpgrades(){
    if (moneyCounter >= MONEYREQUIREDFORUPGRADEVISIBILITY){
        document.getElementById("workerupgrade").style.visibility = 'visible';
        document.getElementById("upgradeparagraph").style.visibility = 'visible';
        clearInterval(upgradeCheckID);
    }
}

function buyUpgrade(){
    if (moneyCounter >= MONEYREQUIREDFORUPGRADE){
        WORKERTIMEINTERVAL = Math.round(WORKERTIMEINTERVAL * 0.95);
        clearInterval(workerIntervalID);
        workerIntervalID = setInterval(workerMakeMoney, WORKERTIMEINTERVAL);
    }
}
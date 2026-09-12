// ROBO CLASH — Arena Engine

const arena = {
    running: false,
    startTime: 0,
    playerHealth: 100,
    enemyHealth: 100,
    energy: 100,
    coinsEarned: 0,

    // Current arena
    type: "space",

    // SPACE ARENA — ZERO GRAVITY
    gravity: 0,
    floating: true
};

function startArena() {
    arena.running = true;
    arena.startTime = Date.now();
    arena.playerHealth = 100;
    arena.enemyHealth = 100;
    arena.energy = 100;

    console.log("ROBO CLASH SPACE ARENA STARTED");
    console.log("ZERO GRAVITY — ROBOTS ARE FLOATING");
}

function getMatchTime() {
    if (!arena.running) return 0;

    return Math.floor(
        (Date.now() - arena.startTime) / 1000
    );
}

function calculateWinReward() {
    const seconds = getMatchTime();

    if (seconds < 60) {
        return 500;
    }

    if (seconds < 180) {
        return 350;
    }

    if (seconds < 600) {
        return 200;
    }

    if (seconds < 1200) {
        return 100;
    }

    if (seconds < 1800) {
        return 30;
    }

    return 1;
}

function awardWin() {
    const reward = calculateWinReward();

    const currentCoins = Number(
        localStorage.getItem("roboClashCoins") || 0
    );

    const newCoins = currentCoins + reward;

    localStorage.setItem(
        "roboClashCoins",
        newCoins
    );

    arena.coinsEarned = reward;
    arena.running = false;

    console.log(
        "VICTORY! +" + reward + " RC"
    );

    return reward;
}

function playerHit(damage) {
    arena.playerHealth = Math.max(
        0,
        arena.playerHealth - damage
    );

    if (arena.playerHealth <= 0) {
        loseBattle();
    }
}

function enemyHit(damage) {
    arena.enemyHealth = Math.max(
        0,
        arena.enemyHealth - damage
    );

    if (arena.enemyHealth <= 0) {
        winBattle();
    }
}

function winBattle() {
    const reward = awardWin();

    console.log(
        "YOU WIN! Reward: " + reward + " RC"
    );
}

function loseBattle() {
    arena.running = false;

    console.log("YOU LOSE!");
}

startArena();

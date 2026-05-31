const output = document.getElementById("output");
const choices = document.getElementById("choices");

/* =========================
   ANIMATION HELPERS
========================= */

function animateOutput() {
    output.classList.remove("fade");
    void output.offsetWidth;
    output.classList.add("fade");
}

function shakeOutput() {
    output.classList.add("shake");
    setTimeout(() => output.classList.remove("shake"), 300);
}

function flashDamage() {
    output.classList.add("flash");
    setTimeout(() => output.classList.remove("flash"), 200);
}

/* =========================
   TEXT + BUTTON SYSTEM
========================= */

function say(text) {
    output.innerText = text;
    animateOutput();
}

function buttons(list) {
    choices.innerHTML = "";
    list.forEach(item => {
        const btn = document.createElement("button");
        btn.innerText = item.label;
        btn.onclick = item.action;
        choices.appendChild(btn);
    });
}

/* =========================
   GAME DATA
========================= */

let player = {
    name: "",
    health: 100,
    weapon: "Wooden Stick",
    gold: 20
};

let enemies = {
    "Shadow Beast": { hp: 40, atk: [5, 10] },
    "Ember Wolf": { hp: 55, atk: [7, 12] }
};

/* =========================
   BATTLE SYSTEM
========================= */

function battle(enemyName, next) {
    let enemy = { ...enemies[enemyName] };

    function turn() {
        say(`${enemyName}\nHP: ${enemy.hp}\n\nYour HP: ${player.health}`);

        buttons([
            { label: "Attack", action: attack },
            { label: "Defend", action: defend }
        ]);
    }

    function attack() {
        let dmg = Math.floor(Math.random() * 10) + 5;
        enemy.hp -= dmg;

        shakeOutput();

        if (enemy.hp <= 0) {
            say(`You defeated the ${enemyName}!`);
            buttons([{ label: "Continue", action: next }]);
            return;
        }

        enemyAttack();
    }

    function defend() {
        say("You defend and take reduced damage.");
        enemyAttack(true);
    }

    function enemyAttack(reduced = false) {
        let [min, max] = enemies[enemyName].atk;
        let dmg = Math.floor(Math.random() * (max - min)) + min;
        if (reduced) dmg = Math.floor(dmg / 2);

        player.health -= dmg;

        flashDamage();
        shakeOutput();

        if (player.health <= 0) {
            say("You have fallen...");
            buttons([{ label: "Restart", action: startGame }]);
            return;
        }

        turn();
    }

    turn();
}

/* =========================
   REALMS
========================= */

function forest() {
    say("You enter the Whispering Forest.\nA Shadow Beast appears!");
    battle("Shadow Beast", () => {
        say("You find the Gem of Dawn!");
        buttons([{ label: "Return to Map", action: map }]);
    });
}

function emberRealm() {
    say("You step into the Ember Realm.\nAn Ember Wolf attacks!");
    battle("Ember Wolf", () => {
        say("You find the Ember Gem!");
        buttons([{ label: "Return to Map", action: map }]);
    });
}

/* =========================
   MAP
========================= */

function map() {
    say("Where do you want to go?");
    buttons([
        { label: "Whispering Forest", action: forest },
        { label: "Ember Realm", action: emberRealm },
        { label: "Stats", action: stats },
        { label: "Quit", action: startGame }
    ]);
}

/* =========================
   STATS
========================= */

function stats() {
    say(`Name: ${player.name}\nHP: ${player.health}\nWeapon: ${player.weapon}\nGold: ${player.gold}`);
    buttons([{ label: "Back", action: map }]);
}

/* =========================
   START GAME
========================= */

function startGame() {
    say("Welcome to The Universal Quest!\n\nEnter your name:");
    choices.innerHTML = "";

    const input = document.createElement("input");
    input.style.padding = "10px";
    input.style.width = "90%";
    choices.appendChild(input);

    const btn = document.createElement("button");
    btn.innerText = "Start";
    btn.onclick = () => {
        player.name = input.value || "Hero";
        map();
    };
    choices.appendChild(btn);
}

startGame();

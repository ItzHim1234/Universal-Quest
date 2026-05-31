let playerHP = 100;
let enemyHP = 40;

function updateOutput(text) {
    document.getElementById("output").innerText = text + 
        `\n\nEnemy HP: ${enemyHP}\nYour HP: ${playerHP}`;
}

function startGame() {
    playerHP = 100;
    enemyHP = 40;
    updateOutput("A Shadow Beast emerges from the darkness!");
}

function attack() {
    if (enemyHP <= 0 || playerHP <= 0) return;

    let dmg = Math.floor(Math.random() * 15) + 5;
    enemyHP -= dmg;

    if (enemyHP <= 0) {
        updateOutput(`You strike for ${dmg} damage!\nThe Shadow Beast is defeated!`);
        return;
    }

    enemyAttack(`You strike for ${dmg} damage!`);
}

function defend() {
    if (enemyHP <= 0 || playerHP <= 0) return;

    let reduced = Math.floor(Math.random() * 5) + 2;
    enemyAttack(`You brace yourself and reduce incoming damage by ${reduced}.`, reduced);
}

function enemyAttack(playerText, reduction = 0) {
    let dmg = Math.floor(Math.random() * 12) + 3;
    dmg -= reduction;
    if (dmg < 0) dmg = 0;

    playerHP -= dmg;

    if (playerHP <= 0) {
        updateOutput(`${playerText}\nThe beast hits you for ${dmg}.\nYou have fallen...`);
        return;
    }

    updateOutput(`${playerText}\nThe beast hits you for ${dmg}.`);
}

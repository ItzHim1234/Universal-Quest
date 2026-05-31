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

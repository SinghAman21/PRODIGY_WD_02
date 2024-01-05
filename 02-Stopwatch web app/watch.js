var startTime, endTime, running, duration = {
    h: 0,
    m: 0,
    s: 0,
    ms: 0
};

function pad(num, size) {
    var s = "0000" + num;
    return s.substr(s.length - size);
}

function updateDisplay() {
    var currentTime = new Date();
    duration.ms = currentTime - startTime;
    duration.s = Math.floor(duration.ms / 1000);
    duration.m = Math.floor(duration.s / 60);
    duration.h = Math.floor(duration.m / 60);
    duration.ms %= 1000;
    duration.s %= 60;
    duration.m %= 60;
    duration.h %= 60;

    $("#hours").text(pad(duration.h, 2));
    $("#minutes").text(pad(duration.m, 2));
    $("#seconds").text(pad(duration.s, 2));
    $("#milliseconds").text(pad(duration.ms, 2));
}

function playFunc() {
    if (running) return;
    running = true;
    startTime = new Date();
    updateDisplay();
    animateCircle();
}

function stopFunc() {
    if (!running) return;
    running = false;
    endTime = new Date();
    clearInterval(animateCircle);
}

function resetFunc() {
    if (running) return;
    startTime = new Date();
    duration.h = 0;
    duration.m = 0;
    duration.s = 0;
    duration.ms = 0;
    updateDisplay();
}

function animateCircle() {
    var c = document.querySelector(".animateCircle");
    var animate = setInterval(function() {
        var percentage = 100 - ((endTime - startTime) / 1000);
        if (percentage >= 100) {
            clearInterval(animate);
            return;
        }
        c.setAttribute("stroke-dasharray", 520 * percentage + " 520");
    }, 10);
}
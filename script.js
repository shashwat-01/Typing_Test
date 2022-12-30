const typingText = document.querySelector(".typing-text p"),
    inpField = document.querySelector(".wrapper .input-field"),
    mistakeTag = document.querySelector(".mistake span"),
    timeTag = document.querySelector(".time span b"),
    wpmTag = document.querySelector(".wpm span"),
    cpmTag = document.querySelector(".cpm span"),
    tryAgainBtn = document.querySelector("button"),
    timerBtn = document.querySelector(".timer"),
    timerBtn2 = document.querySelector(".timer2");

let charIndex = mistakes = isTyping = 0;

//const timerValue = prompt("Enter the timer value for the test");
let timerValue = timerBtn.value;

timerBtn2.addEventListener("click", () => {
    console.log(timerBtn2.value);
    maxTime = timerBtn2.value;
    resetGame();
});
timerBtn.addEventListener("click", () => {
    console.log(timerBtn.value);
    maxTime = timerBtn.value;
    resetGame();
});
let timer, maxTime = timerValue, timeleft = maxTime;
timeTag.innerText = timerValue;


function randomparagraph() {

    let randIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    //getting rand items from arr, splitting the letters and adding each char to span and adding span to <p>
    paragraphs[randIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    });

    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => {
        inpField.focus()
    });
    document.addEventListener("click", () => {
        inpField.focus()
    });
}

function initTyping() {
    const characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];

    if (charIndex < characters.length - 1 && timeleft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        //if backspace
        if (typedChar == null) {
            charIndex--;
            //erase mistakes if user presses backspace
            if (characters[charIndex].classList.contains("incorrect")) {
                mistakes--;
            }
            characters[charIndex].classList.remove("correct", "incorrect");

        } else {
            if (characters[charIndex].innerText === typedChar) {
                //if char match add xlass correct to span else incorrect class
                characters[charIndex].classList.add("correct");
            }

            else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }

            charIndex++;
        }


        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        //assuming 5 characters is one word.subtract total typed by mistakes and divide by 5 and again dividing this by time, multiplying output with 60
        let wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeleft)) * timerValue)
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

        mistakeTag.innerText = mistakes;
        wpmTag.innerText = wpm;
        cpmTag.innerText = charIndex - mistakes;
    }
    else {
        inpField.value = "";
        clearInterval(timer);
    }
}

function initTimer() {
    if (timeleft > 0) {
        timeleft--;
        timeTag.innerText = timeleft;
    }
    else {
        clearInterval(timer);
    }
}

function resetGame() {
    randomparagraph();
    inpField.value = "";
    clearInterval(timer);
    timeleft = maxTime;
    charIndex = mistakes = isTyping = 0;
    timeTag.innerText = timeleft;
    mistakeTag.innerText = mistakes;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;

}

randomparagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);
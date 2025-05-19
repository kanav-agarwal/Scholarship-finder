function changeTheme() {
    let storedTheme = localStorage.getItem("theme")
    if (storedTheme) {
        if (storedTheme == "light") {
            localStorage.setItem("theme", "dark")
            makeDark()
        }
        else {
            localStorage.setItem("theme", "light")
            makeLight()
        }
    }
    else {
        localStorage.setItem("theme", "dark")
        makeDark()
    }
}

function makeDark() {
    document.getElementById("theme-image").src = "moon.png"
    document.body.style.backgroundColor = "black"
    document.body.style.color = "white"
    document.getElementsByClassName("scholarship-box").forEach(box => { box.style.borderColor = "white" });
}

function makeLight() {
    document.getElementById("theme-image").src = "sun.png"
    document.body.style.backgroundColor = "white"
    document.body.style.color = "black"
    document.getElementsByClassName("scholarship-box").forEach(box => { box.style.borderColor = "black" });
}

if (localStorage.getItem("theme") === "dark") {
    makeDark()
}
else {
    makeLight()
}
function scrollProjectsToMiddle() {
    const projectList = document.getElementById("project-list")
    let secondProject = projectList.querySelector(".project:nth-of-type(2)")
    secondProject.scrollIntoView({ inline: "center" })
}

function installHamburger() {
    const checkbox = document.querySelector("#navbar input[type=checkbox]")
    function uncheck(e) {
        checkbox.checked = false

        // setTimeout seems to be required to not completely break the event handler
        setTimeout(() => window.removeEventListener("click", uncheck), 0)
        setTimeout(() => window.removeEventListener("tap", uncheck), 0)
    }

    function install() {
        window.addEventListener("click", uncheck)
        window.addEventListener("tap", uncheck)
    }

    // Hot-reload shenanigans
    if (checkbox.checked) {
        install()
    }

    checkbox.addEventListener("change", function (e, x) {
        if (e.target.checked) {
            install()
        }
    })
}

window.addEventListener("load", function () {
    scrollProjectsToMiddle()
    installHamburger()
})

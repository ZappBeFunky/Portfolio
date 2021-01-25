console.log("Loaded!")

function scrollProjectsToMiddle() {
    const projectList = document.getElementById("project-list")
    if (projectList) {
        const secondProject = projectList.querySelector(
            ".project:nth-of-type(2)"
        )
        secondProject.scrollIntoView({ inline: "center" })

        const projects = projectList.querySelectorAll("article")

        const projectW = secondProject.scrollWidth
        const scrollMargin = projectList.children[0].scrollWidth
        const middle =
            (projectList.scrollWidth - scrollMargin / 2) / projects.length

        // TODO: Reset when viewport changes
        let xTarget
        projectList.addEventListener("scroll", function (evt) {
            requestAnimationFrame(() => {
                if (!xTarget) {
                    xTarget = projects[2].getBoundingClientRect().x
                }

                const scrollLeft = projectList.scrollLeft
                const sm2 = scrollMargin / 2

                let i = 0
                projects.forEach((p) => {
                    const bRect = p.getBoundingClientRect()
                    const xpos = xTarget - Math.abs(bRect.x)
                    const scale =
                        Math.min(
                            Math.abs(
                                scrollMargin / 2 - Math.abs(xpos - middle)
                            ),
                            projectW
                        ) / projectW

                    const vscale = 1 - scale * 0.2

                    p.querySelector(
                        ".img"
                    ).style.transform = `scaleY(${vscale})`

                    p.querySelectorAll(":not(.img)").forEach(
                        (x) => (x.style.opacity = 1 - scale)
                    )
                })
            })
        })
    }
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

const closableids = {
    "image-full-preview": true,
    "image-full-close": true,
    "image-full": true,
}
function onImageClick(e) {
    if (closableids[e.target.id] || e.target.nodeName.toLowerCase() === "img") {
        const preview = document.getElementById("image-full")
        if (preview.classList.contains("opened")) {
            preview.classList.remove("opened")
        } else {
            if (!preview.classList.contains("opened-once")) {
                preview.classList.add("opened-once")
            }
            preview.classList.add("opened")

            const img = preview.querySelector("img")
            img.onload = () => {
                preview.classList.add("forcescroll")
                setTimeout(() => {
                    preview.classList.remove("forcescroll")
                }, 500)
            }
            img.src = e.target.getAttribute("src")
            img.onload()
        }
    }
}

function installImagePreview() {
    window.addEventListener("click", onImageClick)
}

window.addEventListener("load", function () {
    scrollProjectsToMiddle()
    installHamburger()
    installImagePreview()
})

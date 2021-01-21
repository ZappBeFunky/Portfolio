function scrollProjectsToMiddle() {
  const projectList = document.getElementById("project-list")
  let secondProject = projectList.querySelector(".project:nth-of-type(2)")
  secondProject.scrollIntoView({ inline: "center" })
}

window.addEventListener("load", function () {
  scrollProjectsToMiddle()
})

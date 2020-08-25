window.addEventListener("DOMContentLoaded", () => {
  const jobList = document.querySelector("#job-pannel")
  ///toggle navbar-menu
  document.querySelector("#navbar-burger").addEventListener("click", () => {
    document.querySelector("#navbar-menu").classList.toggle('is-active');
  })

  ///search job
  const searchForm = document.forms["search-job"]
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const description = searchForm.description.value
    const location = searchForm.location.value
    let full_time = ""
    if(searchForm.full_time.checked){
      full_time = "on"
    }

    const url = 'https://still-spire-37210.herokuapp.com/positions.json'
    jobList.innerHTML = ''

    fetch(`${url}?description=${description}&location=${location}&full_time=${full_time}`)
    .then(response => response.json())
    .then((data) => {
      console.log(data)
      data.forEach((job) => createJob(job))
    })
  })


  ///render search result
  function createJob(job) {
    const t = document.querySelector("#search-result-item")
    const clone = document.importNode(t.content, true)
    clone.querySelector(".company").href = job.company_url
    clone.querySelector(".company").textContent = job.company
    clone.querySelector("h4 a").href = job.url
    clone.querySelector("h4 a").textContent = job.title
    clone.querySelector(".fulltime").textContent = job.type
    clone.querySelector(".location").textContent = job.location
    jobList.appendChild(clone)
  }
})
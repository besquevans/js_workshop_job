window.addEventListener("DOMContentLoaded", () => {
  const jobList = document.querySelector("#job-pannel")
  const pagination = document.querySelector(".pagination-next")
  const searchForm = document.forms["search-job"]
  var pageNumber = 1

  renderPage()
  ///toggle navbar-menu
  document.querySelector("#navbar-burger").addEventListener("click", () => {
    document.querySelector("#navbar-menu").classList.toggle('is-active');
  })

  ///search job
  
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault()
    renderPage()
  })

  pagination.addEventListener("click", (e) => {
    e.preventDefault()
    console.log("next page")
    const url = pagination.getAttribute("href")
    console.log(url)
    getJobs(url)
  })

  ///default page
  function renderPage() {
    jobList.innerHTML = ''

    const description = searchForm.description.value
    const location = searchForm.location.value
    let full_time = ""
    if(searchForm.full_time.checked){
      full_time = "on"
    }
    
    const url = 'https://still-spire-37210.herokuapp.com/positions.json'
    const requestUrl = `${url}?description=${description}&location=${location}&full_time=${full_time}`
    console.log(requestUrl)
    getJobs(requestUrl)
  }

  ///getJobs
  async function getJobs(requestUrl){
    const nextJobs = await checkNextpage(pageNumber, requestUrl)

    fetch(requestUrl)
    .then(response => response.json())
    .then((jobs) => {
      console.log(jobs)
      pageNumber += 1

      if (nextJobs.length > 0) {
        pagination.removeAttribute("disabled")
        requestUrl = requestUrl.split("&page=")[0]
        pagination.href = `${requestUrl}&page=${pageNumber}`
      } else {
        pagination.setAttribute("disabled", "")
      }
      jobs.forEach((job) => createJob(job))
    })
  }


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

  async function checkNextpage(pageNumber, requestUrl){
    requestUrl = requestUrl.split("&page=")[0]
    let response = await fetch(`${requestUrl}&page=${pageNumber + 1}`)
    let jobs = await response.json()
    // console.log(jobs)
    return jobs
  }
})
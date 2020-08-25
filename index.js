window.addEventListener("DOMContentLoaded", () => {
  const jobList = document.querySelector("#job-pannel")
  const pagination = document.querySelector(".pagination-next")
  var pageNumber = 1

  ///toggle navbar-menu
  document.querySelector("#navbar-burger").addEventListener("click", () => {
    document.querySelector("#navbar-menu").classList.toggle('is-active');
  })

  ///search job
  const searchForm = document.forms["search-job"]
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault()
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
  })

  pagination.addEventListener("click", (e) => {
    e.preventDefault()
    console.log("next page")
    const url = pagination.getAttribute("href")
    console.log(url)
    getJobs(url)
  })


  ///getJobs
  function getJobs(requestUrl){
    
    fetch(requestUrl)
    .then(response => response.json())
    .then((jobs) => {
      console.log(jobs)
      pageNumber += 1
      if (jobs.length == 50) {
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

  function checkNextpage(pageNumber, requestUrl){
    requestUrl = requestUrl.split("&page=")[0]
    fetch(`${requestUrl}&page=${pageNumber + 1}`)
    .then((response) => response.json())
    .then((jobs) => {
      if( jobs.length > 0){
        return true
      } else {
        return false
      }
    })
  }
})
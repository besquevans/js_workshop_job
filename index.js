window.addEventListener("DOMContentLoaded", () => {
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
    const full_time = searchForm.full_time.value

    const url = 'https://still-spire-37210.herokuapp.com/positions.json'
    fetch(`${url}?description=${description}&location=${location}&full_time=${full_time}`)
    .then(response => response.json())
    .then(data => console.log(data))
  })
})
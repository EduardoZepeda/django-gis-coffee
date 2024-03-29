import 'vite/modulepreload-polyfill'

function handleSearchSubmit(event) {
    event.preventDefault()
    window.location.href = '/shops/search/' + event.target.firstElementChild.value
}

function vanishMessages() {
    let messages = document.querySelectorAll(".message")
    messages.forEach(element => {
        // Add transparent class first, it will fade away, and then remove it from the DOM
        setTimeout(() => {
            element.classList.add("transparent")
            setTimeout(() => {
                element.remove()
            }, 1000)
        }, 3000)
    })
}

window.onload = function () {
    let sidebarClose = true
    const close = document.getElementById("close")
    const bars = document.getElementById("menu-bars")
    const sidebar = document.getElementById("sidebar")

    function toggleSidebar() {
        if (sidebarClose) {
            sidebar.classList.remove("hidden")
        } else {
            sidebar.classList.add("hidden")
        }
        sidebarClose = !sidebarClose
    }
    close.addEventListener("click", toggleSidebar)
    bars.addEventListener("click", toggleSidebar)
    document.getElementById("searchForm").addEventListener("submit", handleSearchSubmit)
    document.getElementById("searchFormSidebar").addEventListener("submit", handleSearchSubmit)
    vanishMessages()
}
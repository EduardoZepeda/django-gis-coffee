import 'vite/modulepreload-polyfill'

document.addEventListener("DOMContentLoaded", function(event) {
    let followButtons = document.querySelectorAll(".follow-button")
    followButtons.forEach(element=>element.onclick=handleFollow)
})

async function handleFollow(event) {
    let url = '/accounts/follow/'
    let button = event.target
    // csrf is provided by Django backend
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    let waitingResponse = false

    function getAction() {
        return button.getAttribute('action')
    }

    function getUserId() {
        let id = button.getAttribute('user-id')
        return parseInt(id)
    }

    function setActionValue(action) {
        button.setAttribute('action', action)
    }

    function toggleFollowButton(action) {
        // Toggles the solid color and the empty color heart version 
        button.textContent = action
        button.classList.toggle('followed')
    }

    function setDisabled(disabled) {
        if (disabled) {
            button.setAttribute('disabled', disabled)
        } else {
            button.removeAttribute('disabled')
        }
    }

    if (waitingResponse) {
        return
    }
    waitingResponse = true
    setDisabled(true)
    let action = getAction()
    let userId = getUserId()
    let request = new Request(
        url,
        {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrftoken,
                // Backend requires the HTTP request to be made asynchronously
                'X-Requested-With': 'XMLHttpRequest',
            },
            mode: 'same-origin',
            body: JSON.stringify({ "action": action, "id": userId })
        }
    )
    try {
        const response = await fetch(request)
        const data = await response.json()
        setActionValue(data.action)
        toggleFollowButton(data.action)
        setDisabled(false)
        waitingResponse = false
    } catch (err) {
        console.error(err)
        waitingResponse = false
    }
}
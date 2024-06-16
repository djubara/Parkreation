
const logOutButtonEl = document.querySelector('#logout')

if (logOutButtonEl) {
    logOutButtonEl.addEventListener('click', async () => {
        const res = await fetch("/api/users/logout")

        if (res.ok) {
            alert("You are now logged out!")
            window.location.href = "/"
        } else {
            alert("Oops! Something went wrong (it's not you)")
        }
    })
}
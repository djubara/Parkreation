document.querySelectorAll("#add-to-visitlist").forEach((el) => {
    el.addEventListener('click', () => {
        addToVisitlist(el.dataset.parkCode)
    })
})

async function addToVisitlist(parkId) {
    console.log('adding to park visitlist')
    const res = await fetch('/api/visitlist', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            "park_code": parkId
        })
    })
    if (res.ok) {
        location.reload()
    } else {
        console.log('error adding to visitlist')
    }
}
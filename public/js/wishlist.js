document.querySelectorAll("#add-to-wishlist").forEach((el) => {
    el.addEventListener('click', () => {
        addToWishlist(el.dataset.parkid)
    })
})

async function addToWishlist(parkId) {
    console.log('adding to park wishlist')
    const res = await fetch('/api/wishlist', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            "park_id": parkId
        })
    })
}
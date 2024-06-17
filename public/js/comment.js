document.querySelector("#comment-form").addEventListener('submit', async (event) => {
    event.preventDefault();
    const content = event.target.content.value.trim();
    if (!content) {
        return;
    }

    console.log('adding to park wishlist')
    const res = await fetch(`/api${location.pathname.replace("/park/", "/parks/")}/comments`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            content
        })
    })
    if (res.ok) {
        location.reload()
    } else {
        console.log('error adding to wishlist')
    }
});
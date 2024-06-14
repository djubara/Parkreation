
module.exports = function shortenDescription(description) {
    const maxChars = 150

    return `${description.substring(0, maxChars)}...`
}
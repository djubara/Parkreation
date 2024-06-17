
module.exports = function shortenDescription(description) {
    const maxChars = 500

    return `${description.substring(0, maxChars)}...`
}
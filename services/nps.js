
async function getParksByStateCode(stateCode) {
    let url = "http://developer.nps.gov/api/v1/parks"
    url += `?stateCode=${stateCode}&`
    url += `api_key=${process.env.NPS_API_KEY}`

    const res = await fetch(url)

    return await res.json()
}
async function getParksByParkCode(parkCode) {
    let url = "http://developer.nps.gov/api/v1/parks"
    url += `?parkCode=${parkCode}&`
    url += `api_key=${process.env.NPS_API_KEY}`
    const res = await fetch(url)
    return await res.json()
}


module.exports = {
    getParksByStateCode,
    getParksByParkCode
}
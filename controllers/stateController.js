module.exports = {
    async getStateByName(stateName) {
        const response = await fetch(`https://api.xxxxxxx/states/${stateName}/current.json`);
        return response.json();
    }
};
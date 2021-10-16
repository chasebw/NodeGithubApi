const axios = require('axios');
const baseGithubURL = `https://api.github.com`;
//const dummyJSON = require('../dummy1.json')

class User {
    constructor(username, forked = null) {
        this.username = username;
        this.forked = forked;
    }

    // Quick And Dirty (Assuming <= 100 repos)
    async fetchRepos() {
        let repos = await this.callApi(`/users/${this.username}/repos?per_page=100`);
        // let repos = dummyJSON; //-> Used for testing

        if (typeof (this.forked) === 'boolean') {
            return repos.filter(repo => repo.fork === this.forked);
        }

        return repos;
    }

    async callApi(apiString) {
        try {
            let url = `${baseGithubURL}${apiString}`;
            let response = await axios.get(url);
            let json = response.data;
            return json;
        }
        catch (error) {

            console.log(error);
            return {
                message: "A Bad Request was made to the below URL",
                url: `${baseGithubURL}${apiString}`,
                error: error
            };
        }
    }

    // (Assuming > 100 repositories) -> Cycles through pages sending multiple requests
    async fetchRepos_BIG() {
        let repos = [];
        const NUM_PER_PAGE = 100;
        let pageNumber = 1;

        do {
            let response = await this.callApi(`/users/${this.username}/repos?page=${pageNumber}?per_page=${NUM_PER_PAGE}`);
            repos = repos.concat(response);
            pageNumber++;
        } while (response.length === NUM_PER_PAGE);

        return repos;
    }
}

module.exports = User;
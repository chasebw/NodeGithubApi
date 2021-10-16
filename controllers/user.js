const User = require('../models/user')
const simpleObjectSorter = require('../utils/simpleObjectSorter');
const ensureTrueOrFalse = require('../utils/ensureTrueOrFalse');
const validateUsername = require('../utils/validateUsername');
const { validationResult } = require('express-validator/check');

exports.getRepos =  async (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(403).json({message:"Status 403: Bad Request", errors: errors.array() });
        }

        let username = req.params.username;
        let forked = req.query.forked;
        const user = new User(username, forked);

        let repos = await user.fetchRepos();
        res.status(200).json(repos);
}

exports.getRepoStats = async (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
                return res.status(403).json({message:"Status 403: Bad Request", errors: errors.array() });
        }

        let username = validateUsername(req.params.username);
        let forked = ensureTrueOrFalse(req.query.forked); // Else null

        const user = new User(username, forked);
        let repos = await user.fetchRepos();

        let repoCount = repos.length;
        let starGazerCount = getNumStargazers(repos);
        let forkCount = getNumForks(repos);
        let averageRepoSize = getAverageRepoSize(repos);
        let repoLanguages = getRepoLanguages(repos);

        res.status(200).json({
                repo_count: repoCount,
                stargazer_count: starGazerCount,
                forks_count: forkCount,
                avg_repo_size: averageRepoSize,
                languages: repoLanguages
        });
}


// Util Functions for getRepoStats Below:
function getNumStargazers(repos) {
        const STAR_GAZER_ATTRIBUTE = "stargazers_count";
        return reducer(repos, STAR_GAZER_ATTRIBUTE);
}

function getNumForks(repos) {
        const FORKS_ATTRIBUTE = "forks_count";
        return reducer(repos, FORKS_ATTRIBUTE);
}

function getAverageRepoSize(repos) {
        const REPO_SIZE_ATTRIBUTE = "size";
        let total = reducer(repos, REPO_SIZE_ATTRIBUTE);

        if (total >= 1024 * 1024) {
            total = total / (1024 * 1024);
            return (total / repos.length).toFixed(2) + " GB";
        }
        else if (total >= 1024) {
            total = total / 1024;
            return (total / repos.length).toFixed(2) + " MB";
        }
        else {
            return (total / repos.length).toFixed(2) + " KB";
        }
}

function reducer(list, attribute) {
        return list.reduce((accumulator, element) => accumulator + element[attribute], 0);
}

function getRepoLanguages(repos) {
        let languages = {};
        for (let repo of repos) {
            let language = repo.language;
            if (language) {
                if (languages[language]) {
                    languages[language]++;
                }
                else {
                    languages[language] = 1;
                }
            }
        }
        return simpleObjectSorter(languages);
}
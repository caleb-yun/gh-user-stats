import { Octokit } from "@octokit/core";
import {
    paginateRest,
  } from "@octokit/plugin-paginate-rest";

import express from 'express';

const app = express();

const OctokitPaginate = Octokit.plugin(paginateRest);
const octokit = new OctokitPaginate({
    auth: "TOKEN HERE"
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header('Access-Control-Allow-Headers',
               'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.json());

app.get('/api/v1/search', async(req, res) => {
    let result = await octokit.request('GET /search/users', {q: req.query.q});
    res.send(result.data);
});

app.get('/api/v1/user/:username', async (req, res) => {
    let result = await octokit.request('GET /users/' + req.params.username);
    let user_info = result.data;

    let iterator = octokit.paginate.iterator('GET /users/{username}/repos', {
        username: req.params.username,
        per_page: 100
    });

    // let stats = {total_count: 0, total_forks: 0, langs: {}};
    user_info.total_count = 0;
    user_info.total_forks = 0;
    user_info.langs = {};
    for await (const {data: repos} of iterator) {
        for (const repo of repos) {
            user_info.total_count++;
            user_info.total_forks += repo.forks_count;
            if (repo.language !== null) {
                if (!(repo.language in user_info.langs)) {
                    user_info.langs[repo.language] = 0;
                }
                user_info.langs[repo.language]++;
            }
        }
    }

    res.send(user_info);
});

app.get('/api/v1/user/:username/repos', async(req, res) => {
    let result = await octokit.paginate('GET /users/{username}/repos', {
        username: req.params.username,
        per_page: 100,
        sort: 'updated'
    });
    res.send(result);
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

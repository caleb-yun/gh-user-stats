"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css'

const baseURL = "http://localhost:8080/api/v1/";

export default function Repos({username}) {

    const [repos, setRepos] = useState();

    useEffect(() => {
        axios.get(`${baseURL}user/${username}/repos`).then((response) => {
            setRepos(response.data);
        });
    });

    return (
        <div className="card mt-4">
            <div className="card-header">
                <h5 className="card-title">Repositories</h5>
            </div>
            <ul className="list-group list-group-flush">
                {repos?.map((repo) => {
                    return (
                    <li className="list-group-item">
                        <a href={repo.url}>{repo.full_name}</a>
                        <p>Updated on {repo.updated_at}</p>
                    </li>
                    );
                })}
            </ul>
        </div>
    );
}
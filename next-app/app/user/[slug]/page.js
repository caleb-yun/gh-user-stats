"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import Repos from "./repos";

const baseURL = "http://localhost:8080/api/v1/";

export default function UserPage({params: {slug}}) {

    const username = slug;

    const [user, setUser] = useState();
    const [langs, setLangs] = useState();

    useEffect(() => {
        axios.get(`${baseURL}user/${username}`).then((response) => {
            setUser(response.data);
            if (user)
                setLangs(Object.keys(user.langs).sort(function(a,b){return user.langs[b]-user.langs[a]}));
        });
    });

    return(
        <div>
        <nav class="navbar bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand mb-0 h1" href="/">Home</a>
            </div>
        </nav>
        <div className="mx-auto p-4 py-md-5">
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="m-5">
                            <img className="rounded-circle img-fluid" src={user?.avatar_url} />
                        </div>
                        <p className="display-6">{user?.name}</p>
                        <p className="h5">{user?.login}</p>
                    </div>
                
                    <div className="col">
                        <div className="card mt-4">
                        <div className="card-header">
                                <h5 className="card-title">Repository Stats</h5>
                            </div>
                            <div className="card-body">
                                <p className="card-text">Total Count: {user?.total_count}</p>
                                <p className="card-text">Total Forks: {user?.total_forks}</p>
                            </div>
                        </div>

                        <div className="card mt-4">
                            <div className="card-header">
                                <h5 className="card-title">Languages</h5>
                            </div>
                            <ul className="list-group list-group-flush">
                                
                                {langs?.map((lang) => {
                                    return (
                                    <li className="list-group-item">{lang}<span className="text-secondary ms-3">{user.langs[lang]}</span></li>
                                    );
                                })}
                            </ul>
                        </div>

                        <Repos username={username} />
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

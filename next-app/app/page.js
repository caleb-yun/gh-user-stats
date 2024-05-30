"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'
import styles from "./page.module.css";
import 'bootstrap/dist/css/bootstrap.css'

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("user/" + username);
  };

  return (
    <div>
      <nav class="navbar bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand mb-0 h1" href="/">Home</a>
        </div>
      </nav>
      <div className="col-lg-8 mx-auto p-4 py-md-5">
        <form className="input-group mb-3" onSubmit={handleSubmit}>
          <input type="text" className="form-control" placeholder="Username" onChange={(e) => {setUsername(e.target.value)}} />
          <button className="btn btn-primary">Search</button>
        </form>
      </div>
    </div>
  );
}

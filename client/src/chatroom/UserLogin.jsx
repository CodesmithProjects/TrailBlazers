import React, { useState } from "react";
import _ from 'lodash'

export default function UserLogin({setUser}) {
    const [user, setAUser] = useState('');

    const handleSetUser = () => {
        localStorage.setItem('user', user);
        setUser(user);
        localStorage.setItem("avatar", `https://picsum.photos/id/${_.random(1, 1000)}/200/300`);
    }

    return(
        <div>
            <h1>Socket.io Chat demo</h1>
            <input
            style={{margin:10, height:30, width:'25%', borderRadius:10, }}
            value={user}
            onChange={(e) => setAUser(e.target.value)}
            placeholder="input name"
            >
            </input>
            <button
                onClick={() => handleSetUser()}
            >
                Login
            </button>
        </div>
    )
}
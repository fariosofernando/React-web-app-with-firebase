import { useState } from "react";
import { initializeApp } from "firebase/app";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";

import "bootstrap/dist/css/bootstrap.min.css";



const firebaseConfig = {
    apiKey: "AIzaSyBiAgoQCXvtTjoACWRyoIvHSnQR6QmW2V8",
    authDomain: "buoble-react.firebaseapp.com",
    projectId: "buoble-react",
    storageBucket: "buoble-react.appspot.com",
    messagingSenderId: "493609535067",
    appId: "1:493609535067:web:ea4cb84a199902ef1aa17e",
    measurementId: "G-B7WFRR33WN"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const colletionRef = collection(firestore, "users");


async function getUsers() {
    const data = await getDocs(colletionRef);
    console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
}

async function createUser({ email, password }) {
    await addDoc(colletionRef, { email, password });
    console.log("Usuário criado");
}




export default function FormPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await createUser({ email, password });
        // await getUsers();

    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form style={{ width: '400px', margin: '20px' }} onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group" style={{ marginTop: '20px' }}>
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <div className="form-group form-check" style={{ marginTop: '20px' }}>
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                {/* <Link to="/home"> */}

                <button type="submit" className="btn btn-primary" style={{ marginTop: '20px' }}>Submit</button>
                {/* </Link> */}
            </form>
        </div>
    );
}

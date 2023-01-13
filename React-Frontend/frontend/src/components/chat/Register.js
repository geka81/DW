import React, { useState } from 'react';
import "../../styles/chatRegister.scss";
import { auth, db, storage } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from 'firebase/firestore';
import { useHistory, Link } from "react-router-dom";
import Img from "../../static/chat/add-img.png";
//import Add from "../../static/chat/addAvatar.png";

const ChatRegister = () => {
    const [err, setErr] = useState(false);
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];
        
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)

            const storageRef = ref(storage, displayName);

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(

                (error) => {
                    setErr(true);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL
                        });
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL
                        });

                        await setDoc(doc(db, "userChats", res.user.uid), {})
                        history.push({
                            pathname: '/chat/home',
                        });


                    });
                }
            );
        } catch (err) {
            setErr(true)
        }
    };

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">FaTuber</span>
                <span className="title">Register</span>
                <form onSubmit={handleSubmit}>
                    <input required type="text" placeholder='username'/>
                    <input required type="email" placeholder='email'/>
                    <input required type="password" placeholder='password'/>
                    <input required style={{ display: "none" }} type="file" id="file" />
                    <label htmlFor="file">
                        <img src={Img} alt="" width="30"/>
                        <span>Add an Avatar</span>
                    </label>
                    <button>Sign Up</button>
                    {err && <span>Something went wrong</span>}               
                </form>
                <p>You do have an account? <Link to="/chat/login">Log In</Link></p>
            </div>
        </div>
    )
}

export default ChatRegister;
import React, { Fragment, useState } from "react";
import UserList from "../Components/UserList";

const Register = ({setAuth, setAdmin}) => {

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        name: ""
    });

    const { email, password, name } = inputs;

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name] : e.target.value});
    };

    const onSubmitForm = async e => {
        e.preventDefault();

        try {
            const body = {email, password, name};

            const response = await fetch("http://localhost:3006/auth/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body),
            });

            //const parseRes = await response.json();
            //localStorage.setItem("token", parseRes.token);
            // If registered user wants to be signed right after registering

            setAuth(true);
            setAdmin(false);
            
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <h1 className="text-center my-5">Register</h1>
            <form action="" onSubmit={onSubmitForm} className="my-5">
                <input value={email} onChange={e => onChange(e)} className="form-control my-3" type="email" name="email" placeholder="email" />
                <input value={password} onChange={e => onChange(e)} className="form-control my-3" type="password" name="password" placeholder="password" />
                <input value={name} onChange={e => onChange(e)} className="form-control my-3" type="text" name="name" placeholder="name" />
                <button className="btn btn-success btn-block">Submit</button>
            </form>

            <UserList/>
        </Fragment>
    );
}; 

export default Register;
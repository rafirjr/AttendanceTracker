import React, { Fragment, useState } from "react";
//import { useContext } from "react";
//import UserFinder from "../API/UserFinder";
//import { UsersContext } from "../Context/UsersContext";

const Register = ({setAuth}) => {
    //const {addUsers} = useContext(UsersContext);

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

            const parseRes = await response.json();

            localStorage.setItem("token", parseRes.token);

            setAuth(true);
            
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <h1 className="text-center my-5">Register</h1>
            <form action="" onSubmit={onSubmitForm}>
                <input value={email} onChange={e => onChange(e)} className="form-control my-3" type="email" name="email" placeholder="email" />
                <input value={password} onChange={e => onChange(e)} className="form-control my-3" type="password" name="password" placeholder="password" />
                <input value={name} onChange={e => onChange(e)} className="form-control my-3" type="text" name="name" placeholder="name" />
                <button className="btn btn-success btn-block">Submit</button>
            </form>
        </Fragment>
    );
}; 

export default Register;
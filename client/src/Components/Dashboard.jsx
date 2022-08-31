import React, { Navigate, Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Dashboard = ({setAuth, setAdmin}) => {

    const [name, setName] = useState("");

    async function getName() {
        try {
            const response = await fetch("http://localhost:3006/dashboard/", {
                method: "GET",
                headers: { token: localStorage.token},

            })

            const parseRes = await response.json();
            //console.log(parseRes);

            setName(parseRes.user_name);
        } catch (err) {
            console.error(err.message);
        }
    }

    const logout = (e) => {
        e.preventDefault();

        localStorage.removeItem("token");
        setAuth(false);
    }

    useEffect(() => {
        getName();
    });


    const onClickRegister = (e) => {
        //e.preventDefault();
        if(name === "Rafi Rajoyan") {
            setAdmin(true);
        }
    };

    return (
        <Fragment>
            <div className="container my-3">
                <div className="row">
                    <div className="col order-first">
                        <Link to="/register">
                             <button className="btn btn-outline-dark" onClick={e => onClickRegister(e)}>Register</button>
                        </Link>
                    </div>
                    <div className="col order-last text-right">
                        <button className="btn btn-outline-dark" onClick={e => logout(e)}>Logout</button>
                    </div>
                </div>
            </div>
            <h1 className="text-center my-5">Homenetmen Crescenta Valley Shant Scouts {name}</h1>
            <img src="" />
            <button className="btn btn-outline-primary btn-block">Khmpabeds</button>
            <button className="btn btn-outline-primary btn-block">Ari</button>
            <button className="btn btn-outline-primary btn-block">Arenoush</button>
            <button className="btn btn-outline-primary btn-block">Kylig</button>
            <button className="btn btn-outline-primary btn-block">Ardzvig</button>
            
        </Fragment>
    );
}; 

export default Dashboard;
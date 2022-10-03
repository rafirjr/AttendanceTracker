import React, { Navigate, Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import KyligList from "../Components/KyligList";

const Kyligs = () => {
    return (
        <Fragment>
            <div className="container my-3">
                <div className="row">
                    <div className="col order-first">
                        <Link to="/dashboard">
                            <button className="btn btn-outline-dark">Back</button>
                        </Link>
                    </div>
                </div>
            </div>
            <h1 className="text-center my-5">Քայլիկներ</h1>
            <KyligList/>
            <div>
                <Link to="/dashboard/kyligs/add">
                    <button className="btn btn-primary">Add New</button>
                </Link>
            </div>
        </Fragment>
    )
}

export default Kyligs;
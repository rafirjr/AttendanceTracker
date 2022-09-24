import React from "react";
import UpdateKhmpabed from "../Components/UpdateKhmpabed";
import { Link } from "react-router-dom";

const KhmpabedUpdatePage = () => {
    return (  
        <div>
            <div className="container my-3">
                <div className="row">
                    <div className="col order-first">
                        <Link to="/dashboard/khmpabeds">
                            <button className="btn btn-outline-dark">Back</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div>
                <h1 className="text-center my-5">Update Խմբապետ</h1>
                <UpdateKhmpabed/>
            </div>
        </div>
    )
}

export default KhmpabedUpdatePage;
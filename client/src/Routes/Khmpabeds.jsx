import React, { Navigate, Fragment, useState, useEffect } from "react";
import KhmpabedList from "../Components/KhmpabedList";

const Khmpabeds = () => {
    return (
        <Fragment>
            <h1 className="text-center my-5">Խմբապետներ</h1>
            <KhmpabedList/>
        </Fragment>
    );
};

export default Khmpabeds;
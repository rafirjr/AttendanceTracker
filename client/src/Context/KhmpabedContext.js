import React, {useState, createContext} from "react";

export const KhmpabedContext = createContext();

export const KhmpabedContextProvider = props => {
    const [khmpabeds, setKhmpabeds] = useState([]);

    const addKhmpabed = (khmpabed) => {
        setKhmpabeds([...khmpabeds, khmpabed]);
    };
    return (
        <KhmpabedContext.Provider value={{khmpabeds: khmpabeds, setKhmpabeds, addKhmpabed}}>
            {props.children}
        </KhmpabedContext.Provider>
    )
}
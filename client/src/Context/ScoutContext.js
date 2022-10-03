import React, {useState, createContext} from "react";

export const ScoutContext = createContext();

export const ScoutContextProvider = props => {
    const [scouts, setScouts] = useState([]);

    const addScouts = (scout) => {
        setScouts([...scouts, scout]);
    };
    return (
        <ScoutContext.Provider value={{scouts: scouts, setScouts, addScouts}}>
            {props.children}
        </ScoutContext.Provider>
    )
}
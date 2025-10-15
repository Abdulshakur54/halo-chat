import React, { createContext, useState } from "react";

export const LocationContext = createContext()
function LocationProvider({ children }) {
    const [authLastPage, setAuthLastPage] = useState('/')
    return (
        <LocationContext.Provider value={{authLastPage, setAuthLastPage}}>
            {children}
        </LocationContext.Provider>
    )
}

export default LocationProvider
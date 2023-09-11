import { createContext, useState } from "react";

export const LayoutContext = createContext();

const LayoutProvider = (props) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () =>{
        setIsMenuOpen(!isMenuOpen)
    }
    return ( 
        <LayoutContext.Provider value={{isMenuOpen:isMenuOpen, toggleMenu: toggleMenu}} > {props.children}</LayoutContext.Provider>
     );
}
 
export default LayoutProvider;
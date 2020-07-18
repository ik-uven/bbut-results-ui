import React from "react";
import BurgerIcon from "./BurgerIcon";
import Menu from "./Menu";
import Popup from "reactjs-popup";

const contentStyle = {
    background: "rgba(255,255,255,0)",
    width: "80%",
    border: "none"
};

export default function MenuView({location}) {

    return (
        location.search.toString().includes('hideMenu=true')
            ? null
            : (
                <Popup
                    modal
                    overlayStyle={{background: "#282c34"}}
                    contentStyle={contentStyle}
                    closeOnDocumentClick={false}
                    trigger={open => <BurgerIcon open={open}/>}
                >
                    {close => <Menu close={close}/>}
                </Popup>
            )
    );
}

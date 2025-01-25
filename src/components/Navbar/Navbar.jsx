import "./navbar.css"
import React from "react"
import { assets } from "../../assets/assets"
export default function Navbar({setToken}) {
    return (
        <>
            <nav id="adminNavbar">
                <div className="adminNavContext">
                    <img id="adminNavLogo" src={assets.logo} alt="no img" />
                    <p className="navText">admin pannel</p>
                </div>
                {/* Logout Button */}
                <button id="logoutBtn" onClick={()=>setToken("")}>Logout</button>
            </nav>
        </>
    )
}
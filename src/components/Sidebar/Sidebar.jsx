import "./sidebar.css"
import React from "react"
import { NavLink } from "react-router-dom"
import { assets } from "../../assets/assets"
export default function Sidebar() {
    return (
        <>
            <div className="sideBarContainer">
                <ul className="sideBarListContainer">
                    <NavLink className={"link"} to={"/add"}>
                        <li className="adminNavList">
                            <img src={assets.add_icon} alt="no img" />
                            <p>Add Items</p>
                        </li>
                    </NavLink>
                    <NavLink className={"link"} to={"/list"}>
                        <li className="adminNavList">
                            <img src={assets.order_icon} alt="no img" />
                            <p>List Items</p>
                        </li>
                    </NavLink>
                    <NavLink className={"link"} to={"/orders"}>
                        <li className="adminNavList">
                            <img src={assets.order_icon} alt="no img" />
                            <p>Orders</p>
                        </li>
                    </NavLink>
                    <NavLink className={"link"} to={"/imageList"}>
                        <li className="adminNavList">
                            <img src={assets.order_icon} alt="no img" />
                            <p>ImageList</p>
                        </li>
                    </NavLink>
                </ul>
            </div>
        </>
    )
}
import "./view.css"
import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
import { backendURL } from "../../App"

export default function View() {
    const { imgId } = useParams();
    const [singleImage, setSingleImage] = useState("");

    const gettingSingleDesign = async () => {
        try {
            const response = await axios.get(`${backendURL}/api/getSingleDesign`, {
                params: { imgId }
            });
            if (response.data.success) {
                setSingleImage(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        gettingSingleDesign();
    }, [imgId]);

    return (
        <div className="ViewDesignSection">
            {singleImage ? (
                <div className="viewImgSection">
                    {/* Image */}
                    <div className="imageSection">
                        <img src={singleImage.imageUrl} alt="Design" />
                    </div>

                    {/* Image Context */}
                    <div className="imgContextSecton">
                {/* Image Name */}
                <h2>Image Name</h2>

                {/* Single Image Status */}
                <p className="imageStatus">
                    Status : {singleImage.imgStatus}
                </p>
                {/* Image description */}
                <p className="imageDescription">This is my image description Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda itaque ipsa a.</p>

                {/* Image imgSize Section */}
                <div className={singleImage.imgStatus == "approved" ? "simgSizeContainer" : "imgSizeContainer hideContent"}>

                    <div className="imgActionBtns">
                        <button className="savedDesignBtn" id="deleteDesignBtn" onClick={() => handleDeleteDesign(imgId)}>Delete</button>
                        <button id="editDesignBtn" className="savedDesignBtn">Edit</button>
                    </div>
                </div>
            </div>
                </div>

            ) : (
                <p>Image not found</p>
            )}
        </div>


    );
}

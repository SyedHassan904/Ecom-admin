import { backendURL } from "../../App";
import axios from "axios";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./imageList.css";
import { useNavigate } from "react-router-dom";
import DownloadForOfflineOutlinedIcon from '@mui/icons-material/DownloadForOfflineOutlined';

export default function List() {
    const [imgList, setImgList] = useState([]);
    const [imgStatus, setImgStatus] = useState("pending");
    const [imgId, setImgId] = useState("");
    const navigate = useNavigate();

    const fetchImgList = async () => {
        try {
            const response = await axios.get(backendURL + "/api/get-image");

            if (response.data.success) {
                setImgList(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    // Updated image status handler
    const updateImgStatus = async (e, imgId) => {
        const selectedStatus = e.target.value;
        setImgStatus(selectedStatus);
        setImgId(imgId);

        try {
            const response = await axios.post(backendURL + "/api/updateImgStatus", {
                imgStatus: selectedStatus,  // Ensure this is being passed correctly
                imgId: imgId,  // Ensure this is the image ID you want to update
            });

            if (response.data.success) {
                toast.success(response.data.message);
                fetchImgList(); // Optionally, re-fetch image list after update
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error updating status:", error.message);
            toast.error("Failed to update status");
        }
    };


    useEffect(() => {
        fetchImgList();
    }, []);

    // Handle image download
    const handleDownload = async (imageUrl) => {
        try {
            const response = await fetch(imageUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch the image');
            }
            const imageBlob = await response.blob();
            const imageObjectURL = URL.createObjectURL(imageBlob);

            // Create an anchor tag to trigger the download
            const link = document.createElement('a');
            link.href = imageObjectURL;
            link.download = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
            link.click();

            URL.revokeObjectURL(imageObjectURL); // Clean up after download
        } catch (error) {
            toast.error('Failed to download the image: ' + error.message);
        }
    };

    // Handle the design deletion
    const handleDeleteDesign = async (id) => {
        try {
            // Use post method correctly
            const response = await axios.post(backendURL + "/api/deleteDesign", { imgId: id });
            if (response.data.success) {
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    return (
        <div className="image-list-container">
            {imgList.map((img, index) => (
                <div key={index} className="image-item">
                    <img src={img.imageUrl} alt="generated" />
                    <p className="imgIdPara"><span className="idBold">Image Id:</span>{img._id}</p>
                    <button id="imgDownloadBtn" onClick={() => handleDownload(img.imageUrl)}>Download<DownloadForOfflineOutlinedIcon /></button>

                    <div className="ImageActionBox">
                        <div className="statusBox">
                            <p className="upStPara">Update Status:</p>
                            <select value={imgStatus} onChange={(e) => updateImgStatus(e, img._id)}>
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="declined">Declined</option>
                                <option value="outOfRange">Out of Range</option>
                            </select>
                        </div>
                        <div className="imgListActionBtns">
                            <button id="deleteDesignBtn" onClick={() => handleDeleteDesign(img._id)}>Delete Design</button>
                            <button id="viewDesignBtn">
                                <Link className="link" to={`/view/${img._id}`}>View</Link>
                            </button>
                            <button id="addProductBtn" onClick={() => navigate("/add")}>Add Product</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

const AddPhoto = () => {
  const [photos, setPhotos] = useState([]);
  const [photosFile, setPhotosFile] = useState("");
  const [error, seterror] = useState(null);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!photos.length) {
      return seterror("Must upload at least one photo");
    }
    const photosFormData = new FormData();

    photosFile.map((photo) => {
      photosFormData.append("photos", photo);
    });

    try {
      await axios.post(
        "http://localhost:5000/api/photos/id/" + router.query.id,
        photosFormData
      );
      router.push("/albums/" + router.query.id);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePhotosChange = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setPhotos(urls);
    setPhotosFile(files);
  };

  return (
    <div className="text-white py-24">
      <div className="container mx-auto">
        <p className="text-red-500 text-center font-semibold">{error}</p>

        <h1 className="text-2xl font-semibold text-center py-6">
          Add New Photos
        </h1>
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="photos"
            className="flex flex-col justify-center items-center py-6 min-h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            {photos.length ? (
              <div className="flex flex-wrap mt-2 p-2">
                {photos.map((url) => (
                  <img
                    key={url}
                    src={url}
                    alt="Photo"
                    className="w-24 h-24 mr-2 mb-2"
                  />
                ))}
              </div>
            ) : (
              <>
                <FontAwesomeIcon
                  icon={faUpload}
                  className="text-9xl text-slate-500"
                />
                <p className="text-xl text-slate-400">
                  Upload photos width extentions (JPG, PNG ,JPEG)
                </p>
              </>
            )}
          </label>
          <input
            type="file"
            hidden
            id="photos"
            name="photos"
            multiple
            onChange={handlePhotosChange}
          />
          <button
            className="block w-full  bg-green-700 my-4 p-2 rounded-md text-lg "
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPhoto;

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useRouter } from "next/router";
import Loading from "@/components/layouts/Loading";

const NewAlbum = () => {
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState("");
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    setloading(true);
    e.preventDefault();
    if (!title || title.length < 3 || !thumbnail) {
      setloading(false);
      seterror("All fields are required");
      return;
    }
    const albumFormData = new FormData();
    albumFormData.append("title", title);
    albumFormData.append("thumbnail", thumbnailImage);
    try {
      await axios.post("http://localhost:5000/api/albums", albumFormData);
      await router.push("/albums");
      setloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(URL.createObjectURL(file));
    setThumbnailImage(file);
  };

  return (
    <div className="py-24">
      <div className="container flex justify-center items-center">
        <form
          className="flex flex-col gap-6 py-4 px-4 text-slate-200 min-w-[300px] sm:min-w-[450px] bg-slate-600 border rounded-md shadow-md shadow-slate-600"
          onSubmit={handleSubmit}
        >
          <p className="text-red-500 text-center font-semibold">{error}</p>
          <h1 className="text-white text-3xl text-center font-bold border-b-2 border-slate-400 pb-4">
            NewAlbum
          </h1>
          <div>
            <label className="" htmlFor="title"></label>
            <input
              className=" p-2 rounded-md placeholder:text-slate-200 caret-slate-900 bg-slate-700 w-full border border-slate-900"
              type="text"
              id="title"
              name="title"
              placeholder="Enter album title"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div className="flex items-center gap-6">
            <label
              className="border border-slate-900 p-2 rounded-md cursor-pointer w-full bg-slate-700"
              htmlFor="thumbnail"
            >
              <FontAwesomeIcon icon={faUpload} /> Upload Thumbnail
            </label>
            <input
              type="file"
              hidden
              id="thumbnail"
              name="thumbnail"
              onChange={handleThumbnailChange}
            />
          </div>
          {thumbnail && (
            <div className="flex justify-center">
              <img src={thumbnail} alt="Thumbnail" className="w-32 h-32 mt-2" />
            </div>
          )}
          <button
            className="bg-green-700 py-1 px-2 rounded-md text-lg "
            type="submit"
            disabled={loading}
          >
            {loading ? <Loading /> : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewAlbum;

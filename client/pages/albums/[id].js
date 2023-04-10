import Button from "@/components/layouts/Button";
import EmptyArray from "@/components/layouts/EmptyArray";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import Fancybox from "./Fancybox";

const Photo = ({ album }) => {
  const router = useRouter();

  const deleteAlbum = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/albums/id/${album._id}?photo=${album.publicId}`
      );
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Head>
        <title>{album.title}</title>
      </Head>
      <div className="py-24 ">
        <div className="container mx-auto ">
          <h1 className="text-3xl text-white font-bold text-center py-6">
            {album.title}
          </h1>
          <div className="flex justify-center items-center gap-6 ">
            <Button
              name={"Photos"}
              link={"/albums/photos/add-photo?id=" + album._id}
            />
            <div
              className="delete cursor-pointer text-red-700 border p-2 rounded-md"
              onClick={deleteAlbum}
            >
              <FontAwesomeIcon icon={faTrashAlt} size="xl" />
            </div>
          </div>
          {album && album.photos.length ? (
            <Fancybox>
              <div className="studio grid grid-cols-3 gap-1 mb-6">
                {album.photos.map((photo) => (
                  <div
                    key={photo.id}
                    data-fancybox="gallery"
                    data-src={photo.img}
                    className="image cursor-pointer hover:scale-110 transition-transform"
                  >
                    <img
                      className="group-hover:scale-125 w-full h-full transition-all duration-1000"
                      src={photo.img}
                      alt=""
                    />
                  </div>
                ))}
              </div>
            </Fancybox>
          ) : (
            <EmptyArray error={"photos in this album"} />
          )}
        </div>
      </div>
    </>
  );
};

// export async function getStaticPaths() {
//   const res = await axios.get("http://localhost:5000/api/albums");
//   const albums = await res.data;

//   const paths = albums.map((p) => {
//     return {
//       params: { id: `${p._id}` },
//     };
//   });
//   return {
//     paths: paths,
//     fallback: false,
//   };
// }

export async function getServerSideProps(context) {
  const res = await axios.get(
    `http://localhost:5000/api/photos/id/${context.params.id}`
  );
  const album = await res.data;

  return {
    props: {
      album,
    },
  };
}

export default Photo;

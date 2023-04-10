import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import axios from "axios";
import Button from "@/components/layouts/Button";
import EmptyArray from "@/components/layouts/EmptyArray";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ albums }) {
  return (
    <>
      <Head>
        <title>Image Gallary</title>
        <meta name="description" content="image gallary portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="py-24">
        <div className="container m-auto">
          {albums.length ? (
            <div className="albums grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-1">
              {albums.map((album) => (
                <Link
                  key={album._id}
                  href={"albums/" + album._id}
                  className="album group overflow-hidden cursor-pointer relative"
                  style={{ "--before-content": `'${album.title}'` }}
                >
                  <Image
                    width={300}
                    height={300}
                    src={album.thumbnail}
                    alt=""
                    className="w-full h-full group-hover:scale-125 transition-all duration-1000 
                "
                  />
                </Link>
              ))}
            </div>
          ) : (
            <EmptyArray error={"albums"} />
          )}
          <Button name={"album"} link={"/albums/new-album"} />
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const res = await axios.get("http://localhost:5000/api/albums");
  const albums = await res.data;

  return {
    props: {
      albums,
    },
  };
}

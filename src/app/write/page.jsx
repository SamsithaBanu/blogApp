'use client';

import React, { use, useContext, useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './write.module.css';
import { IoImagesOutline } from "react-icons/io5";
import { MdOutlineCloudDownload } from "react-icons/md";
import { IoVideocamOutline } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { ThemeContext } from '@/context/ThemeContext';
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";

const page = () => {
  const {status} = useSession();
  const router = useRouter();
  const [catSlug, setCatSlug] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState();
  const [value, setValue] = useState('');
  const [media, setMedia] = useState('');
  const {theme} = useContext(ThemeContext);

  useEffect(() => {
    const upload = async () => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset",'samsitha');
      formData.append("cloud_name", 'df7b5q9bi'); // Replace with your cloud name

      try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/df7b5q9bi/image/upload`, {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        setMedia(data.secure_url); // or data.url
      } catch (err) {
        console.log('err',err);
        console.error("Cloudinary upload failed", err);
      }
    };

    if (file) upload();
  }, [file]);

  if (status === "loading") return <div className={styles.loading}>Loading...</div>;
  if (status === "unauthenticated") router.push("/");

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

      const handleSubmit = async () => {
        const res = await fetch("/api/posts", {
          method: "POST",
          body: JSON.stringify({
            title,
            desc: description,
            img: media,
            slug: slugify(title),
            catSlug: catSlug || "style", //If not selected, choose the general category
          }),
        });
    
        if (res.status === 200) {
          const data = await res.json();
          router.push(`/posts/${data.slug}`);
        }
      };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Title"
        className={styles.input}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select className={styles.select} onChange={(e) => setCatSlug(e.target.value)}>
        <option value="style">style</option>
        <option value="fashion">fashion</option>
        <option value="food">food</option>
        <option value="culture">culture</option>
        <option value="travel">travel</option>
        <option value="coding">coding</option>
      </select>
      <input
        type="text"
        placeholder="description"
        className={styles.description}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className={styles.editor}>
        <button className={styles.button} onClick={() => setOpen(!open)}>
          <GoPlus alt="" width={20} height={20} fontSize={25} color={theme === 'light' ? 'black' :'white'} />
        </button>
        {open && (
          <div className={styles.add}>
            <input
              type="file"
              id="image"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />
            <button className={styles.addButton}>
              <label htmlFor="image">
                <IoImagesOutline alt="" width={20} height={20} fontSize={25} color={theme === 'light' ? 'black' :'white'} />
              </label>
            </button>
            <button className={styles.addButton}>
              <MdOutlineCloudDownload width={20} height={20} fontSize={25} color={theme === 'light' ? 'black' :'white'} />
            </button>
            <button className={styles.addButton}>
              <IoVideocamOutline width={20} height={20} fontSize={25} color={theme === 'light' ? 'black' :'white'} />
            </button>
          </div>
        )}
      </div>
      <button className={styles.publish} onClick={handleSubmit}>
        Publish
      </button>
    </div>
  );
};

export default page;

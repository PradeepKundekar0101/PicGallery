import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CreatePost: React.FC = () => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image) return;
    const formData = new FormData();
    formData.append("content", content);
    formData.append("image", image);
    const res = await axios.post("http://localhost:8080/api/v1/post",formData);

    console.log(res)
  };
  return (
    <div>
      <h1 className="heading">CreatePost</h1>
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="flex flex-col"
      >
        <input type="text" placeholder="title" onChange={(e)=>{setContent(e.target.value)}} />
        <input type="file" name="image" onChange={handleImageChange}/>
        <button type="submit">Submit</button>
      </form>
      <Link to="/">Home</Link>
    </div>
  );
};

export default CreatePost;

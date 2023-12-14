import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import {config} from "../config/server"

const CreatePost: React.FC = () => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };
  
  const {mutate,status,error} = useMutation({
    mutationFn:async(formData:FormData)=>{
        return axios.post(config.api_url+"/api/v1/post",formData);
    }
  })
    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        if(!image) return;
        const formData= new FormData();
        formData.append("content",content);
        formData.append("image",image);
        mutate(formData)
    }

  return (
    <div>
      <h1 className="heading text-3xl mx-10">CreatePost</h1>
      
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="flex flex-col  mx-10"
      >
        <input type="text" placeholder="title" className="w-full outline-none px-2 py-3 bg-slate-100 my-2" onChange={(e)=>{setContent(e.target.value)}} />
        <input type="file" className="my-5" name="image" onChange={handleImageChange}/>
        <button className="bg-blue-500 py-1 px-10 w-full text-xl text-white" type="submit">{status==='pending'?"Adding...":"Add"}</button>
        <h1>{status==="error" && error.message}</h1>
      </form>
      <Link to="/" className="underline mx-10">Home</Link>
    </div>
  );
};

export default CreatePost;

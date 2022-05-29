import React, {  useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './singlepost.css'
import axios from 'axios'
import { Context } from '../../context/Context'

const SinglePost = () => {
    const location = useLocation()
    const path = location.pathname.split("/")[2]
    console.log(path)
    const [post, setPost] = useState({})
    const PF = "https://blog-app-ht.herokuapp.com/images/"
    const {user} = useContext(Context)
    const [title,setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [updateMode, setUpdateMode] = useState(false)
    const [image, setImage] = useState("")


    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get("/posts/" + path)
            setPost(res.data)
            setTitle(res.data.title)
            setDesc(res.data.desc)
        }
        const getImage = async () => {
            const image = await axios.get("/posts/photo/" + path);
            console.log(image)
            setImage(image.data)
            
        }
        getPost()
        getImage()
    },[path])
    const handleUpdate = async () => {
        try {
            await axios.put('/posts/' + path, {
                username: user.username,
                title,
                desc
            })
            setUpdateMode(false)
        } catch (err) {

        }
    }
    const handleDelete = async () => {
        try{
            await axios.delete("/posts/" + path, {
                data: {username: user.username}
            });
            window.location.replace("/")

        } catch(e){

        }
    }
  return (
    <div className="singlePost">
        <div className="singlePostWrapper">
            {post.photo && (
                <img src={image} alt="" className="singlePostImg" />

            )}{
                updateMode ? <input type="text" value={title} className="singlePostTitleInput" autoFocus onChange={(e) => setTitle(e.target.value)}/> : (
                    <h1 className="singlePostTitle">
                        {title}
                        {post.username === user?.username && (
                            <div className="singlePostEdit">
                                <i className="singlePostIcon far fa-edit" onClick={() => setUpdateMode(true)}></i>
                                <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
                            </div>

                        )}
                    </h1>

                )
            }
            <div className="singlePostInfo">
                <span className="singlePostAuthor">Author: 
                <Link to={`/?user=${post.username}`} className="link">
                    <b> {post.username}</b>
                </Link></span>
                <span className="singlePostDate"><b>{new Date(post.createdAt).toDateString()}</b></span>
            </div>
            {updateMode ? (<textarea className="singlePostDescInput" value={desc} onChange={(e) => setDesc(e.target.value)}/> ) : (
                <p className="singlePostDesc">
                    {desc}
                    
                </p>

            )}
            {updateMode && (
                <button className="singlePostButton" onClick={handleUpdate}>
                    Update
                </button>
            )}
        </div>
    </div>
  )
}

export default SinglePost
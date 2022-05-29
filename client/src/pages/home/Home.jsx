import React, { useState, useEffect } from 'react'
// import { useLocation } from 'react-router-dom'
import Header from '../../components/header/Header'
import Posts from '../../components/posts/Posts'
import SideBar from '../../components/sidebar/SideBar'

import "./home.css"
import axios from 'axios'
import { useLocation } from 'react-router-dom'

const Home = () => {
  const [posts, setPosts] = useState([])
  const { search } = useLocation();
  console.log(search + "hihi")
  useEffect(() => {//lấy tất cả post của 1 user truyền qua query
    const fetchPosts = async () => {
      const res = await axios.get("/posts" + search)
      setPosts(res.data)
    }
    fetchPosts();
  },[setPosts, search])

  return (
    <>
        <Header />
        <div className="home">
            <Posts posts={posts} />
            <SideBar />
        </div>

    </>
  )
}

export default Home
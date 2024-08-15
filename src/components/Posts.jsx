import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BiSolidLike } from 'react-icons/bi';
import Fire from './Fire';

const Posts = ({ user }) => {
    const [posts, setPosts] = useState([]);
    const hideScrollbarStyle = {
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
    };
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.post(
                    'http://localhost:5000/api/post/getAllPosts',
                    { withCredentials: true, email: user.email }
                );
                setPosts(response.data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchPosts();
    }, [user?.email]);

    return (
        <div
            className="z-1 h-screen flex flex-col px-8 relative top-8"
            style={hideScrollbarStyle}
        >
            {posts.map((post) => {
                return (
                    <div
                        key={post._id}
                        className="bg-black text-white px-4 flex flex-col items-start rounded-md"
                    >
                        <div className="flex gap-4 m-4 items-center">
                            {post.user.profilePicture ? (
                                <img
                                    src={post.user.profilePicture}
                                    className="w-8 h-8 rounded-full"
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-[#E7B1A6]"></div>
                            )}
                            <div>{post.user.userName}</div>
                            <div></div>
                        </div>
                        <div className="mx-4 my-2">{post.description}</div>
                        <div className="mx-4">#{post.missionName}</div>
                        <div className="flex gap-4 m-4">
                            <button className="flex items-center gap-2 cursor-default">
                                <div className="cursor-pointer">
                                    <BiSolidLike
                                        size={20}
                                        className="hover:text-blue-300"
                                    />
                                </div>
                                <div>{post.upvotes}</div>
                            </button>
                            <button className="flex items-center gap-2">
                                <div>
                                    <Fire
                                        size={20}
                                        streakCount={post.streakCount}
                                        targetDays={post.targetDays}
                                    />
                                </div>
                                <div>{post.streakCount}</div>
                            </button>
                        </div>
                        <hr className=" text-white w-full" />
                    </div>
                );
            })}
        </div>
    );
};

export default Posts;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BiSolidLike } from 'react-icons/bi';
import { FaFire } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useSelector((state) => state.auth);
    const hideScrollbarStyle = {
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
    };
    const getGradientId = (percentage) => {
        if (percentage <= 25) {
            return 'gradientYellowOrange';
        } else if (percentage <= 50) {
            return 'gradientOrangeRed';
        } else if (percentage <= 75) {
            return 'gradientGreenRed';
        } else if (percentage <= 100) {
            return 'gradientPurpleIndigo';
        } else {
            return 'gradientRed';
        }
    };
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.post(
                    'http://localhost:5000/api/post/getAllPosts',
                    { withCredentials: true, email: user.email }
                );
                setPosts(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchPosts();
    }, [user]);
    const bounce = keyframes`
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-3px);
        }
    `;
    const AnimatedFaFire = styled(FaFire)`
        fill: ${({ gradientId }) => `url(#${gradientId})`};
        &:hover {
            animation: ${bounce} 1s infinite;
        }
    `;

    return (
        <div
            className="z-1 h-screen flex flex-col px-8 relative top-8"
            style={hideScrollbarStyle}
        >
            <svg width="0" height="0">
                <defs>
                    <linearGradient
                        id="gradientYellowOrange"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                    >
                        <stop
                            offset="0%"
                            style={{ stopColor: '#FFD700', stopOpacity: 1 }}
                        />
                        <stop
                            offset="100%"
                            style={{ stopColor: '#FFA500', stopOpacity: 1 }}
                        />
                    </linearGradient>
                    <linearGradient
                        id="gradientOrangeRed"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                    >
                        <stop
                            offset="0%"
                            style={{ stopColor: '#FFA500', stopOpacity: 1 }}
                        />
                        <stop
                            offset="100%"
                            style={{ stopColor: '#FF0000', stopOpacity: 1 }}
                        />
                    </linearGradient>
                    <linearGradient
                        id="gradientGreenRed"
                        x1="45%"
                        y1="50%"
                        x2="100%"
                        y2="100%"
                    >
                        <stop
                            offset="0%"
                            style={{ stopColor: '#00FF00', stopOpacity: 1 }}
                        />
                        <stop
                            offset="100%"
                            style={{ stopColor: '#FF0000', stopOpacity: 0.8 }}
                        />
                    </linearGradient>
                    <linearGradient
                        id="gradientPurpleIndigo"
                        x1="40%"
                        y1="20%"
                        x2="100%"
                        y2="100%"
                    >
                        <stop
                            offset="0%"
                            style={{ stopColor: '#000982', stopOpacity: 0.7 }}
                        />
                        <stop
                            offset="100%"
                            style={{ stopColor: '#4B0082', stopOpacity: 1 }}
                        />
                    </linearGradient>
                    <linearGradient
                        id="gradientRed"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                    >
                        <stop
                            offset="0%"
                            style={{ stopColor: '#FF0000', stopOpacity: 1 }}
                        />
                        <stop
                            offset="100%"
                            style={{ stopColor: '#FF0000', stopOpacity: 1 }}
                        />
                    </linearGradient>
                </defs>
            </svg>
            {posts.map((post) => {
                const percentage = (post.streakCount / post.targetDays) * 100;
                const gradientId = getGradientId(percentage);
                return (
                    <div
                        key={post._id}
                        className="bg-black text-white px-4 flex flex-col items-start rounded-md"
                    >
                        <hr className=" text-white w-full" />
                        <div className="flex gap-4 m-4 items-center">
                            <div className="w-8 h-8 rounded-full bg-[#E7B1A6]"></div>
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
                                    <AnimatedFaFire
                                        size={20}
                                        gradientId={gradientId}
                                    />
                                </div>
                                <div>{post.streakCount}</div>
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Posts;

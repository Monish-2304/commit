import React from 'react';
import { BiSolidLike } from 'react-icons/bi';
import { FaFire } from 'react-icons/fa';

const Posts = () => {
    const hideScrollbarStyle = {
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
    };
    return (
        <div className="overflow-y-auto h-screen flex flex-col gap-8 mt-28 p-8" style={hideScrollbarStyle}>
            <div className="bg-[#E2BFB3] w-[75%] h-fit mx-auto p-4">
                <div className="flex gap-8 m-4 items-center">
                    <div className="w-8 h-8 rounded-full bg-[#E7B1A6]"></div>
                    <div>Name</div>
                </div>
                <div>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    It has survived not only five centuries, but also the leap into electronic typesetting,
                    remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
                    sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum
                </div>
                <div className="flex flex-col gap-4 m-4">
                    <button className="flex items-center gap-4">
                        <div>
                            <BiSolidLike size={20} />
                        </div>
                        <div>
                            count
                        </div>
                    </button>
                    <button className="flex items-center gap-4">
                        <div>
                            <FaFire size={20} />
                        </div>
                        <div>
                            count
                        </div>
                    </button>
                </div>
            </div>
            <div className="bg-[#E2BFB3] w-[75%] h-fit mx-auto p-4">
                <div className="flex gap-8 m-4 items-center">
                    <div className="w-8 h-8 rounded-full bg-[#E7B1A6]"></div>
                    <div>Name</div>
                </div>
                <div>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    It has survived not only five centuries, but also the leap into electronic typesetting,
                    remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
                    sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum
                </div>
                <div className="flex flex-col gap-4 m-4">
                    <button className="flex items-center gap-4">
                        <div>
                            <BiSolidLike size={20} />
                        </div>
                        <div>
                            count
                        </div>
                    </button>
                    <button className="flex items-center gap-4">
                        <div>
                            <FaFire size={20} />
                        </div>
                        <div>
                            count
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Posts;

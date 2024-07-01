import { FaHome, FaTasks, FaFire } from "react-icons/fa";
import { BiSolidLike } from "react-icons/bi";

const Home = () => {
    return (
        <div className="text-xl text-center text-[#7C6D76] flex h-screen">
            <div className="bg-[#D3DADC] w-1/5 h-screen flex flex-col fixed">
                <div className="flex m-4 gap-4 items-center">
                    <div className="w-8 h-8 rounded-full bg-[#E7B1A6]"></div>
                    <div>Name</div>
                </div>
                {/* divs belong to avatar and name  */}
                <div className="flex flex-col m-6 gap-4 overflow-y-auto">
                    <div>
                        <button className="flex gap-3 justify-items-center items-center hover:bg-[#BACAE8] w-full">
                            <div><FaHome size={20} /></div>
                            <div> Home</div>
                        </button>
                    </div>
                    <div>
                        <button className="flex gap-3 justify-items-center items-center hover:bg-[#BACAE8] w-full">
                            <div><FaTasks size={20} /></div>
                            <div>Tasks</div>
                        </button>
                    </div>
                    <div>
                        <button className="flex gap-3 justify-items-center items-center hover:bg-[#BACAE8] w-full">
                            <div><FaFire size={20} /></div>
                            <div>Streaks</div>
                        </button>
                    </div>
                </div>
                {/* divs that has side bar navigation */}
            </div>
            <div className="ml-[20%] flex flex-col gap-8 w-[80%] h-screen overflow-hidden">
                <div className="bg-[#E2BFB3] w-full h-28 flex gap-4 items-center">
                    <div>
                        <FaFire size={20} />
                    </div>
                    <div>
                        Highest Streak
                    </div>
                </div>
                <div className="overflow-y-auto h-full flex flex-col gap-8">
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
            </div>
        </div>
    );
};

export default Home;

import { FaHome, FaTasks, FaFire } from "react-icons/fa";
import { BiSolidLike } from "react-icons/bi";
import Sidebar from "../components/Sidebar";
import StreakBar from "../components/StreakBar";
import Posts from "../components/Posts";

const Home = () => {
    return (
        <div className="text-xl text-center text-[#7C6D76] flex h-screen">
            <Sidebar />
            <div className="ml-[20%] flex flex-col gap-8 w-[80%] h-screen overflow-hidden">
                <StreakBar />
                <Posts />
            </div>
        </div>
    );
};

export default Home;

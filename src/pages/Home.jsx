import { FaCirclePlus } from 'react-icons/fa6';
import { FaWindowClose } from 'react-icons/fa';
import { BiSolidLike } from 'react-icons/bi';
import Sidebar from '../components/Sidebar';
import StreakBar from '../components/StreakBar';
import Posts from '../components/Posts';
import AddPost from '../components/AddPost';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const [userDetails, setUserDetails] = useState([]);
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/user/${user.email}`,
                    { withCredentials: true }
                );
                console.log('got user details', response.data);
                setUserDetails(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUserDetails();
    }, []);
    return (
        <div className="text-xl text-center text-[#7C6D76] flex h-screen w-screen bg-[#000000] overflow-x-hidden">
            <div className="w-[18%] z-20">
                <Sidebar />
            </div>

            <div className="relative flex flex-col gap-8 w-[82%] h-screen ">
                <StreakBar />
                <Posts />
                <div className="fixed bottom-8 right-8 cursor-pointer">
                    <FaCirclePlus
                        size={36}
                        color="white"
                        onClick={toggleModal}
                    />
                </div>
                {isModalOpen && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className=" relative">
                            <AddPost
                                missions={userDetails.missions}
                                userId={userDetails.userId}
                            />
                            <button
                                onClick={toggleModal}
                                className="absolute top-3 right-2 text-gray-700"
                            >
                                <FaWindowClose size={20} color="white" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;

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
import Modal from '../components/Modal';

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
                setUserDetails(response?.data);
            } catch (error) {
                console.log(error);
            }
        };
        if (user) fetchUserDetails();
    }, [user]);
    return (
        <div className="w-[82%]text-xl text-center text-[#7C6D76] flex w-screen h-screen bg-[#000000] overflow-x-hidden overflow-y-scroll">
            <div className="w-full ">
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
                            <Modal
                                showModal={isModalOpen}
                                handleClose={toggleModal}
                                content={
                                    <AddPost
                                        missions={userDetails?.missions}
                                        userId={userDetails?.userId}
                                    />
                                }
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;

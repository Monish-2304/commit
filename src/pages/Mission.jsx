import React, { useEffect, useState } from 'react';
import GridLayout from 'react-grid-layout';
import StreakBar from '../components/StreakBar';
import MissionCard from '../components/MissionCard';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import AddMission from '../components/AddMission';
import Modal from '../components/Modal';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Toggle from '../components/Toggle';
import { FaCircleInfo } from 'react-icons/fa6';
const Mission = () => {
    const [missions, setMissions] = useState([]);
    const [layout, setLayout] = useState([]);
    const [currentLayout, setCurrentLayout] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [isTilesView, setIsTilesView] = useState(
        JSON.parse(localStorage.getItem('isTilesView')) || false
    );
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    const toggleInfoModal = () => {
        setIsInfoModalOpen(!isInfoModalOpen);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [missionsResponse, layoutResponse] = await Promise.all([
                    axios.get(
                        `http://localhost:5000/api/mission/getAllMissions?userId=${user._id}`,
                        { withCredentials: true }
                    ),
                    axios.post(
                        `http://localhost:5000/api/mission/getLayout`,
                        { userId: user._id },
                        { withCredentials: true }
                    ),
                ]);
                const fetchedMissions = missionsResponse.data;
                setMissions(fetchedMissions);

                if (
                    layoutResponse.data.layout &&
                    layoutResponse.data.layout.length > 0 &&
                    isTilesView
                ) {
                    const savedLayout = layoutResponse.data.layout;
                    if (savedLayout.length < fetchedMissions.length) {
                        const updatedLayout = calculateLayout(
                            fetchedMissions,
                            savedLayout
                        );
                        setLayout(updatedLayout);
                        setCurrentLayout(updatedLayout);
                        await saveLayoutToServer(updatedLayout);
                    } else {
                        setLayout(savedLayout);
                        setCurrentLayout(savedLayout);
                    }
                } else {
                    const generatedLayout = calculateLayout(fetchedMissions);
                    setLayout(generatedLayout);
                    setCurrentLayout(generatedLayout);
                    if (isTilesView) {
                        await saveLayoutToServer(generatedLayout);
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [user, isTilesView]);
    useEffect(() => {
        localStorage.setItem('isTilesView', JSON.stringify(isTilesView));
    }, [isTilesView]);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const calculateLayout = (missions, existingLayout = []) => {
        let layout = [...existingLayout];
        let x = 0;
        let y = 0;

        if (layout.length > 0) {
            const lastItem = layout[layout.length - 1];
            x = lastItem.x + lastItem.w;
            y = lastItem.y;
            if (x >= 4) {
                x = 0;
                y += lastItem.h;
            }
        }

        missions.slice(layout.length).forEach((mission) => {
            let w = 1;
            let h = 1;
            if (isTilesView) {
                switch (mission.priority) {
                    case 1:
                        w = 2;
                        h = 2;
                        break;
                    case 2:
                        w = 1;
                        h = 2;
                        break;
                    case 3:
                        w = 2;
                        h = 1;
                        break;
                    case 4:
                        w = 1;
                        h = 1;
                        break;
                    default:
                        break;
                }
            }
            if (x + w > 4) {
                x = 0;
                y += h;
            }

            layout.push({
                i: mission._id,
                x: Number(x),
                y: Number(y),
                w: Number(w),
                h: Number(h),
            });
            x += w;
        });
        return layout;
    };

    const saveLayoutToServer = async (newLayout) => {
        try {
            const response = await axios.post(
                `http://localhost:5000/api/mission/saveLayout`,
                {
                    userId: user._id,
                    layout: newLayout,
                },
                { withCredentials: true }
            );
        } catch (error) {
            console.error('Error saving layout:', error);
        }
    };
    const handleLayoutChange = (newLayout) => {
        setCurrentLayout(newLayout);
    };
    const handleEditModeToggle = async () => {
        if (editMode) {
            setLayout(currentLayout);
            await saveLayoutToServer(currentLayout);
        }
        setEditMode(!editMode);
    };
    const handleToggle = (state) => {
        setIsTilesView(state);
        if (!state) {
            setEditMode(false);
        }
    };
    const handleAddMission = async (newMission) => {
        try {
            const response = await axios.post(
                'http://localhost:5000/api/mission/createMission',
                newMission,
                { withCredentials: true }
            );
            const updatedMissions = [...missions, response.data];
            setMissions(updatedMissions);

            if (isTilesView) {
                let newLayout;
                if (layout.length > 0) {
                    newLayout = calculateLayout(updatedMissions, layout);
                } else {
                    newLayout = calculateLayout(updatedMissions);
                }
                setLayout(newLayout);
                setCurrentLayout(newLayout);
                await saveLayoutToServer(newLayout);
            }
        } catch (error) {
            console.error('Error creating mission:', error);
        }
    };
    return (
        <div className="h-screen bg-black w-screen overflow-x-hidden">
            <StreakBar title="Mission Wall" />
            <div className="flex justify-between items-center p-4">
                {' '}
                <div className="flex space-x-4">
                    {' '}
                    {isTilesView && (
                        <div>
                            <button
                                onClick={handleEditModeToggle}
                                className="bg-blue-500 text-white p-2 rounded"
                            >
                                {editMode ? 'Save Changes' : 'Edit Layout'}
                            </button>
                        </div>
                    )}
                    <div>
                        <button
                            onClick={toggleModal}
                            className="bg-blue-500 text-white p-2 rounded"
                        >
                            Add Mission
                        </button>
                    </div>
                </div>
                <div className="flex space-x-4 items-center ">
                    {' '}
                    <div>
                        <FaCircleInfo
                            className=" text-white bg-white rounded-full cursor-pointer hover:scale-105"
                            size={28}
                            color="#3B82F1"
                            onClick={toggleInfoModal}
                        />
                    </div>
                    <div
                        onClick={() => {
                            setIsTilesView(!isTilesView);
                        }}
                    >
                        <Toggle
                            onToggleChange={handleToggle}
                            label={'Tiles View'}
                            defaultToggled={isTilesView}
                        />
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className=" relative">
                        <Modal
                            showModal={isModalOpen}
                            handleClose={toggleModal}
                            content={
                                <AddMission
                                    userId={user._id}
                                    closeModal={toggleModal}
                                    onAddMission={handleAddMission}
                                />
                            }
                        />
                    </div>
                </div>
            )}
            {isInfoModalOpen && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className=" relative">
                        <Modal
                            showModal={isInfoModalOpen}
                            handleClose={toggleInfoModal}
                            content={
                                <div className="flex-col w-[50rem] p-3 text-white space-y-4 overflow-x-hidden whitespace-normal">
                                    <h3 className=" text-xl font-semibold">
                                        What Is Missions Wall ?
                                    </h3>
                                    <p className=" ">
                                        Missions are your goals or objectives
                                        that are to be completed within desired
                                        target by posting daily about them.
                                        Streak count is maintained every day for
                                        the post made with respect to selected
                                        mission. If a post is not made on any
                                        given day streak count of that mission
                                        is reduced to 0. Missions Wall consists
                                        of all your missions. The wall has 2
                                        views Default view and Tiles view. In
                                        Default view missions are listed in
                                        order you created them , all mission
                                        cards are similar in size. In Tiles View
                                        each mission card is displayed according
                                        to priorities as below:
                                    </p>
                                    <div>
                                        <ul>
                                            <li>
                                                Priortity 1: Red in color , is
                                                wide and tall
                                            </li>
                                            <li>
                                                Priortity 2: Blue in color , is
                                                tall
                                            </li>
                                            <li>
                                                Priortity 3: Yellow in color, is
                                                wide
                                            </li>
                                            <li>
                                                Priortity 4: Green in color, is
                                                normal
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            }
                        />
                    </div>
                </div>
            )}
            <div className="w-screen">
                <GridLayout
                    className="layout"
                    layout={layout}
                    cols={4}
                    rowHeight={100}
                    width={screenWidth * 0.81}
                    margin={[24, 24]}
                    isDraggable={editMode}
                    isResizable={editMode}
                    onLayoutChange={handleLayoutChange}
                >
                    {missions.map((mission) => (
                        <div key={mission._id}>
                            <MissionCard
                                title={mission.missionName}
                                description={mission.description}
                                priority={mission.priority}
                                editMode={editMode}
                                targetDays={mission.targetDays}
                                streakCount={mission.streakCount}
                            />
                        </div>
                    ))}
                </GridLayout>
            </div>
        </div>
    );
};

export default Mission;

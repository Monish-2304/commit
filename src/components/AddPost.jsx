import axios from 'axios';
import React, { useState } from 'react';

const AddPost = ({ missions, userId }) => {
    console.log('missions and userId', missions, userId);
    const [selectedMission, setSelectedMission] = useState('');
    const [description, setDescription] = useState('');

    const handleSelectChange = (event) => {
        setSelectedMission(event.target.value);
    };
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (selectedMission == '' || selectedMission == null) {
            console.log('you did not select any mission');
            return;
        }
        const postData = {
            description,
            missionId: selectedMission,
            userId,
        };

        try {
            const response = await axios.post(
                'http://localhost:5000/api/post/createPost',
                postData
            );
            console.log('Post created successfully', response.data);
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };
    return (
        <div className="w-[40rem] bg-slate-900 text-white rounded-md">
            <h3 className="text-left px-4 py-2">Add New Post</h3>
            <form
                className="flex flex-col gap-4 justify-start p-4"
                method="post"
                onSubmit={handleSubmit}
            >
                <textarea
                    rows={4}
                    cols={20}
                    className=" bg-slate-900 p-2 border-[1px] rounded-md border-white text-sm resize-none"
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={handleDescriptionChange}
                />
                <select
                    className="text-black text-base p-1 rounded-md w-full box-border"
                    value={selectedMission}
                    onChange={handleSelectChange}
                >
                    <option value="" disabled selected hidden>
                        Choose Mission
                    </option>
                    {missions?.map((mission) => (
                        <option
                            key={mission.missionId}
                            value={mission.missionId}
                        >
                            {mission.missionName}
                        </option>
                    ))}
                </select>
                <input
                    type="submit"
                    className=" self-end bg-blue-500 rounded-md w-fit text-base px-3 py-1"
                />
            </form>
        </div>
    );
};

export default AddPost;

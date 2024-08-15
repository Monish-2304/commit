import { useState } from 'react';

const AddMission = ({ userId, closeModal, onAddMission }) => {
    const [description, setDescription] = useState('');
    const [missionName, setMissionName] = useState('');
    const [targetDays, setTargetDays] = useState(30);
    const [priority, setPriority] = useState('');
    const handleMissionChange = (event) => {
        setMissionName(event.target.value);
    };
    const handlePriorityChange = (event) => {
        setPriority(event.target.value);
    };
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };
    const handleTargetDays = (event) => {
        setTargetDays(event.target.value);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        closeModal();
        const missionData = {
            missionName,
            description,
            priority,
            userId,
            targetDays,
        };
        await onAddMission(missionData);
    };
    return (
        <div className="w-[40rem] bg-slate-900 text-white rounded-md">
            <h3 className="text-left px-4 py-2">Add New Post</h3>
            <form
                className="flex flex-col gap-4 justify-start p-4"
                method="post"
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    placeholder="Mission Name"
                    onChange={handleMissionChange}
                    value={missionName}
                    className=" bg-slate-900 w-full p-2 border-[1px] rounded-md border-white text-sm "
                />
                <div className="flex gap-2 justify-between">
                    <select
                        className="bg-slate-900 text-slate-400  text-sm p-1 rounded-md w-full border-[1px] border-white"
                        value={priority}
                        onChange={handlePriorityChange}
                    >
                        <option disabled hidden value="">
                            Set Priority
                        </option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                    </select>
                    <input
                        type="number"
                        placeholder="Target Days"
                        onChange={handleTargetDays}
                        value={targetDays}
                        className=" bg-slate-900 text-slate-400 p-2 border-[1px] rounded-md border-white text-sm "
                    />
                </div>

                <textarea
                    rows={4}
                    cols={20}
                    className=" bg-slate-900 p-2 border-[1px] rounded-md border-white text-sm resize-none"
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={handleDescriptionChange}
                />

                <input
                    type="submit"
                    className=" self-end bg-blue-500 rounded-md w-fit text-base px-3 py-1"
                />
            </form>
        </div>
    );
};

export default AddMission;

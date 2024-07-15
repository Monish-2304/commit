import React from 'react';

const AddPost = ({ missions, userId }) => {
    return (
        <div className="w-[40rem] bg-slate-900 text-white rounded-md">
            <h3 className="text-left px-4 py-2">Add New Post</h3>
            <form
                className="flex flex-col gap-4 justify-start p-4"
                method="post"
            >
                <textarea
                    rows={4}
                    cols={20}
                    className=" bg-slate-900 p-2 border-[1px] rounded-md border-white text-sm resize-none"
                    type="text"
                    placeholder="Description"
                />
                <select
                    className="text-black text-base p-1 rounded-md"
                    placeholder="Choose Mission"
                >
                    <option value="" disabled selected hidden>
                        Choose Mission
                    </option>
                    <option value="opt1" label="option 1" className="" />
                    <option value="opt2" label="option 2" className="" />
                    <option value="opt3" label="option 3" className="" />
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

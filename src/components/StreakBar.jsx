const StreakBar = ({ title }) => {
    return (
        <div className="bg-blue-300 text-lg w-full overflow-hidden  h-16 px-4 flex gap-4 items-center rounded-sm">
            <div className="text-white">{title}</div>
        </div>
    );
};

export default StreakBar;

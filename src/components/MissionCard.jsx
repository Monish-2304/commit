import Fire from './Fire';
const MissionCard = ({
    title,
    description,
    priority,
    editMode,
    targetDays,
    streakCount,
}) => {
    let sizeClass;
    switch (priority) {
        case 1:
            sizeClass =
                'col-span-2 row-span-2 border-red-400 hover:shadow-red-700'; // Tall and wide
            break;
        case 2:
            sizeClass =
                'col-span-1 row-span-2 border-blue-300 hover:shadow-blue-700'; // Tall
            break;
        case 3:
            sizeClass = 'col-span-2 border-yellow-300 hover:shadow-yellow-700'; // Wide
            break;
        case 4:
            sizeClass =
                'col-span-1 row-span-1 border-green-400 hover:shadow-green-700'; // Small square tile
            break;
    }
    return (
        <div
            className={`h-full w-full ${sizeClass} text-white flex-col p-3 pb-5 rounded-lg hover:scale-105 transition-all border-solid border-2  shadow-md ${editMode ? 'select-none' : ''} overflow-hidden text-ellipsis`}
        >
            <div className="flex items-center justify-between">
                <h4>{title}</h4>
                <h4>priority:{priority}</h4>
                <Fire
                    streakCount={streakCount}
                    targetDays={targetDays}
                    size={20}
                />
            </div>

            <p className={`my-4`}>{description}</p>
        </div>
    );
};

export default MissionCard;

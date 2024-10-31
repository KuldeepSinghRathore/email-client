const FilterBySkelton = () => {
    return (
        <div className="flex gap-4 ">
            <ul className="flex gap-5 text-[#636363] font-normal whitespace-nowrap  items-center">
                <span className="text-2xl font-bold w-32 h-5 bg-gray-300 animate-pulse rounded-full"></span>
                {["unread", "read", "favorite"].map((label) => {
                    return (
                        <li
                            key={label}
                            className={`cursor-pointer px-3 capitalize py-px text-center flex mr-4 bg-gray-300 h-5 w-24 animate-pulse rounded-full`}
                        ></li>
                    );
                })}
            </ul>
        </div>
    );
};

export default FilterBySkelton;

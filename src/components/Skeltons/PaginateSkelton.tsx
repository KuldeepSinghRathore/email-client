export const PaginateSkelton = () => {
    return (
        <>
            {["prev", "1", "next"].map((label) => {
                return (
                    <li
                        key={label}
                        className={`cursor-pointer px-3 capitalize py-px text-center flex mr-4 bg-gray-300 h-5 w-24 animate-pulse rounded-full`}
                    ></li>
                );
            })}
        </>
    );
};

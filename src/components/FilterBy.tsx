import { FilterType } from "../App";
type Props = {
    filter: FilterType;
    handleFilter: (val: FilterType) => void;
};
const labelArr: FilterType[] = ["unread", "read", "favorite"];

export const FilterBy = ({ filter, handleFilter }: Props) => {
    return (
        <div className="flex gap-4 ">
            <ul className="flex gap-5 text-[#636363] font-normal whitespace-nowrap  items-center">
                <span>Filter By:</span>
                {labelArr.map((label) => {
                    return (
                        <li
                            key={label}
                            className={`cursor-pointer px-3 capitalize py-px text-center flex mr-4"
                                                       ${
                                                           label === filter &&
                                                           "bg-[#e1e4ea] rounded-2xl "
                                                       } `}
                            onClick={() => handleFilter(label)}
                        >
                            {label}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

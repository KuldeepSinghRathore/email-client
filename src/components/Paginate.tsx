type Props = {
    handlePrevious: () => void;
    handleNext: () => void;
    pageNumber: number;
    total: number;
};
export const Paginate = ({
    handleNext,
    handlePrevious,
    pageNumber,
    total,
}: Props) => {
    return (
        <div className="w-full">
            <div className="flex  mx-auto  gap-4 ">
                <button
                    className="bg-[#e54065]   text-white px-4 py-1 rounded-full "
                    onClick={handlePrevious}
                    disabled={pageNumber === 1}
                >
                    Prev
                </button>
                <span className="">{pageNumber}</span>
                <button
                    className="bg-[#e54065]   text-white px-4 py-1 rounded-full "
                    onClick={handleNext}
                    disabled={pageNumber > Math.floor(total / 10)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

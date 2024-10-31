const EmailListSkelton = () => {
    return (
        <div className={`flex w-full h-[86vh]`}>
            <div className=" overflow-y-scroll  w-full scrollbar-hide">
                {[1, 2, 3, 4, 5]?.map((card) => {
                    return (
                        <div
                            key={card.toString()}
                            className={`
                   
                 my-4 relative text-[#636363] border-2 border-[#cfd2dc] rounded-xl`}
                        >
                            <div className={`flex  py-3`}>
                                <div
                                    className={`flex   items-start justify-center min-w-[10%] pt-1`}
                                >
                                    <div
                                        className={`aspect-square bg-gray-300 text-white   rounded-full  flex capitalize items-center w-2/5 justify-center font-semibold  `}
                                    ></div>
                                </div>

                                <div className="flex-[0.9]">
                                    <div
                                        className={`font-medium bg-gray-300 animate-pulse h-4 rounded-md max-w-xs mb-4`}
                                    ></div>
                                    <div
                                        className={`font-medium bg-gray-300 animate-pulse h-4 rounded-md max-w-xs mb-4`}
                                    ></div>
                                    <div
                                        className={`font-medium bg-gray-300 animate-pulse h-4 rounded-md max-w-xs mb-4`}
                                    ></div>
                                    <div className="flex gap-10">
                                        <div
                                            className={`font-medium bg-gray-300 animate-pulse h-4 rounded-md w-32 mb-4`}
                                        ></div>
                                        <div
                                            className={`font-medium bg-gray-300 animate-pulse h-4 rounded-md w-32 mb-4`}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default EmailListSkelton;

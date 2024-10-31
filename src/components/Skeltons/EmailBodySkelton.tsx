const EmailBodySkelton = () => {
    return (
        <div className="flex w-[62%] py-5 bg-white animate-pulse rounded-xl my-4 border-2 border-[#cfd2dc]">
            <div className=" w-full ">
                <div className="flex">
                    <div
                        className={`flex   items-start justify-center min-w-[20%] pt-1`}
                    >
                        <div
                            className={`aspect-square bg-gray-300 text-white   rounded-full  flex capitalize items-center w-2/5 justify-center font-semibold  `}
                        ></div>
                    </div>
                    <div className="w-full mr-10 ">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold w-32 h-4 rounded-full dark:bg-gray-300"></h2>
                            <button className="bg-gray-300   mr-10  text-white px-4 py-1 rounded-full w-32 h-6"></button>
                        </div>
                        <div className="mb-8">
                            <p className="text-sm bg-gray-300 rounded-full w-32 h-3"></p>
                        </div>
                        <div className="overflow-y-scroll h-[70vh] scrollbar-hide">
                            {[1, 2, 3, 4].map((i) => {
                                return (
                                    <div className="" key={i}>
                                        <div className="h-2 bg-gray-300 rounded-full mb-2.5" />
                                        <div className="h-2 bg-gray-300 rounded-full mr-5 mb-4 " />
                                        <div className="h-2 bg-gray-300 rounded-full mb-2.5" />
                                        <div className="h-2 bg-gray-300 rounded-full mb-2.5" />
                                        <div className="h-2 bg-gray-300 rounded-full mr-5 mb-4 " />
                                        <div className="h-2 bg-gray-300 rounded-full mb-2.5" />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailBodySkelton;

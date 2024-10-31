import EmailListSkelton from "./EmailListSkelton";
import FilterBySkelton from "./FilterBySkelton";
import { PaginateSkelton } from "./PaginateSkelton";

const AppSkelton = () => {
    return (
        <div className=" min-h-screen  z-0 flex flex-col bg-[#f4f5f9] w-screen ">
            <header className="w-[92%]    mx-auto flex-[.2] py-4 max-w-screen-xl flex flex-col justify-center ">
                <FilterBySkelton />
            </header>
            <main className="w-[92%] mx-auto  flex-[.6]   max-w-screen-xl flex">
                <div className={`flex   w-full  justify-between`}>
                    <EmailListSkelton />
                </div>
            </main>
            <footer className="pb  mx-auto  h-[0.2] flex ">
                <PaginateSkelton />
            </footer>
        </div>
    );
};

export default AppSkelton;

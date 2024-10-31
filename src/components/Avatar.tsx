type Props = {
    text: string;
    twStyle: string;
};
const Avatar = ({ text, twStyle }: Props) => {
    return (
        <div className={`flex   items-start justify-center  ${twStyle}`}>
            <div
                className={`aspect-square bg-[#e54065] text-white   rounded-full  flex capitalize items-center w-10 justify-center font-semibold  `}
            >
                {text}
            </div>
        </div>
    );
};

export default Avatar;

type Props = {
 handlePrevious:()=>void,
 handleNext:()=>void,
 pageNumber:number,
 total:number
}
export const Paginate = ({handleNext,handlePrevious,pageNumber,total}: Props) => {
    return ( 
        <div className="flex gap-4 ">
                    <button
                        onClick={handlePrevious}
                        disabled={pageNumber === 1}
                    >
                        Prev
                    </button>
                    <button>{pageNumber}</button>
                    <button
                        onClick={handleNext}
                        disabled={pageNumber > Math.floor(total / 10)}
                    >
                        Next
                    </button>
                </div>
    );
}
import React from "react";

const Pagination = props => {

    const {
        hasPreviousPage,
        hasNextPage,
        paginatePrev,
        paginateNext
    } = props;


    return (
        <div>
            {hasPreviousPage && <button  onClick={paginatePrev} className="bg-green-700 text-white p-2" type="button">Back</button>}
            {`  `}
            {hasNextPage && <button onClick={paginateNext} className="bg-green-700 text-white p-2" type="button">Next</button>}
        </div>
    );
};




export default Pagination;
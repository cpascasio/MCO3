import { useState } from "react";

// const Rating = ({ backgroundColor, handleRatingChange }) => {
    
//     return (
//         <>


//             <div className={`rating bg-[${backgroundColor}]`}>
//                 <input
//                     type="radio"
//                     name="rating-2"
//                     className="mask mask-star-2 bg-orange-400"
//                     value="1"
//                     onChange={handleRatingChange}
//                 />
//                 <input
//                     type="radio"
//                     name="rating-2"
//                     className="mask mask-star-2 bg-orange-400"
//                     value="2"
//                     onChange={handleRatingChange}
//                 />
//                 <input
//                     type="radio"
//                     name="rating-2"
//                     className="mask mask-star-2 bg-orange-400"
//                     value="3"
//                     onChange={handleRatingChange}
//                 />
//                 <input
//                     type="radio"
//                     name="rating-2"
//                     className="mask mask-star-2 bg-orange-400"
//                     value="4"
//                     onChange={handleRatingChange}
//                 />
//                 <input
//                     type="radio"
//                     name="rating-2"
//                     className="mask mask-star-2 bg-orange-400"
//                     value="5"
//                     onChange={handleRatingChange}
//                 />

                
//             </div>                
            
//         </>
//     );
// };

// export default Rating;

const Rating = ({ backgroundColor, handleRatingChange }) => {
    return (
        <div className={`rating bg-[${backgroundColor}]`}>
            {[1, 2, 3, 4, 5].map((value) => (
                <input
                    key={value}
                    type="radio"
                    name="rating"
                    className={`mask mask-star-2 bg-orange-400`}
                    value={value}
                    onChange={handleRatingChange}
                />
            ))}
        </div>
    );
};

export default Rating;
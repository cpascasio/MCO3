import { useEffect } from "react";

const Stars = ({review}) => {

    

    useEffect(() => {
        console.log("THIS IS REVIEW IN STARS");
        console.log(review);

    }, []);

        function generateStars(rating) {
            const starElements = [];
        
            for (let k = 0; k < rating; k++) {
                starElements.push(
                    <input
          key={index}
          type="radio"
          name="rating-5"
          className="mask mask-star-2 bg-orange-400"
          checked
          disabled
        />
                );
            }
            for (let k = 0; k < 5 - rating; k++) {
                starElements.push(
                    <input
          key={index}
          type="radio"
          name="rating-5"
          className="mask mask-star-2 bg-orange-400"
          disabled
        />
                );
            }
        
            return starElements;
        }

    return (
        <>
           <div className="rating rating-xs bg-white px-2" >



</div>
        </>
    );
};

export default Stars;

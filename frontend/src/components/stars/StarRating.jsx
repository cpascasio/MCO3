import React, { useState } from "react";

const STARS = [1, 2, 3, 4, 5];

function StarRating({ defaultValue, bgcolor }) {
    const [rating, setRating] = useState(defaultValue);

    const handleRatingChange = (event) => {
        setRating(event.target.value);
    };

    return (
        <div className={`rating ${bgcolor}`}>
            {STARS.map((star) => (
                <input
                    key={star}
                    type="radio"
                    name="rating"
                    className="mask mask-star-2 bg-[#FFC700]"
                    value={star}
                    checked={star <= rating}
                    disabled
                    onChange={handleRatingChange}
                />
            ))}
        </div>
    );
}

export default StarRating;

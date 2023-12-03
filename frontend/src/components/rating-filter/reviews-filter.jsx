import React from 'react';
import Select from 'react-select';

function displayRatings(rating) {
    const starElements = [];
    if (rating === 0) {
        return 'All Reviews';
    }

    for (let k = 0; k < rating; k++) {
        starElements.push(
            <img
                key={k}
                alt="Star"
                src="/assets/yellow-star.svg"
                style={{ width: '20px', height: '20px', marginRight: '5px' }}
            />
        );
    }
    return starElements;
}

const options = [
    { value: '0', label: displayRatings(0) }, // Unique value for "All Reviews"
    { value: '1', label: displayRatings(1), image: displayRatings(1) },
    { value: '2', label: displayRatings(2), image: displayRatings(2) },
    { value: '3', label: displayRatings(3), image: displayRatings(3) },
    { value: '4', label: displayRatings(4), image: displayRatings(4) },
    { value: '5', label: displayRatings(5), image: displayRatings(5) },
];

const defaultValue = options[0]; // Set the default value to "All Reviews"


const ReviewFilter = ({ selectedFilter, onFilterChange }, data) => {
    return (
        <>
            <Select
                options={options}
                value={selectedFilter}
                onChange={(selectedOption) => onFilterChange(selectedOption.value)}
                placeholder='Filter by Rating'
                defaultValue={defaultValue} // Set a default value if needed
                styles={{
                    control: (provided) => ({ // changes whole filter rating box
                        ...provided,
                        backgroundColor: '#f4f0ec',
                        borderColor: 'none',
                        display: 'flex',
                        width: '12rem',
                        marginLeft: '7rem', // Set the desired width here
                        marginTop: '2rem',
                        marginRight: '7rem'
                    }),
                    menu: (provided) => ({ // changes menu itself
                        ...provided,
                        width: '9.75rem', // Adjust the width as needed
                        marginLeft: '7rem',
                        padding: '3px',
                        paddingLeft: '15px',
                        cursor: 'pointer', // Add pointer cursor
                    }),
                    option: (provided) => ({ // changes options in menu
                        ...provided,
                        display: 'flex',
                        alignItems: 'center',
                        // marginLeft: '7rem',
                        
                    }),
                    singleValue: (provided) => ({
                        ...provided,
                        display: 'flex', // Add this to align the stars horizontally
                        alignItems: 'center', // Add this to center the content vertically
                        // marginLeft: '7rem',
                    }),
                }}
                components={{
                    Option: CustomOption, // Define your custom option component
                }}
                
            />
            
        </>
    );
};

const CustomOption = ({ innerProps, label, data }) => (
    <div {...innerProps}>
        <div className='filter-button' style={{ display: 'flex', alignItems: 'center'}}>
            {data.value === '0' ? data.label : data.image}
        </div>
    </div>
);

export default ReviewFilter;

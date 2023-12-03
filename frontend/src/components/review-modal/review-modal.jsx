import React, { useState } from 'react';
import Rating from "../rating";

const ReviewModal = () => {
    const [title, setTitle] = useState('');
    const [review, setReview] = useState('');
    const [error, setError] = useState('');

    const handlePostReview = () => {
        // Check if both title and review are provided
        if (title.trim() === '' || review.trim() === '') {
            setError('Please provide a title and a review.');
        } else {
            // Perform the post review action or submit the form
            setError(''); // Clear any previous error messages
            document.getElementById('my_modal_1').close(); // Close the modal or take appropriate action
        }
    };

    const handleMediaUpload = (e) => {
        const file = e.target.files[0];

        // Handle the file as needed, for example, you can upload it to a server or display it in your UI.
        console.log('Selected file:', file);
    };

    return (
        <>
            <button
                className="btn btn-secondar"
                style={{
                    marginRight: "7rem",
                    backgroundColor: '#D62300',
                    color: 'white',
                    borderColor: '#D62300'
                }}
                onClick={() => document.getElementById('my_modal_1').showModal()}
            >
                Write a Review
            </button>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box" style={{ backgroundColor: '#f0e6d7', maxWidth: '45rem' }}>
                    <h3 className="font-bold text-lg" style={{ color: 'black', marginBottom: '10px' }}>Create review</h3>
                    <Rating />
                    <input
                        type="text"
                        className="input w-full"
                        placeholder="Add title..."
                        style={{
                            backgroundColor: '#f4f0ec',
                            color: 'black',
                            marginBottom: '10px'
                        }}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        className="textarea w-full"
                        placeholder="Write your review..."
                        style={{
                            backgroundColor: '#f4f0ec',
                            overflow: 'auto',
                            height: '200px',
                            color: 'black',
                            resize: 'none'
                        }}
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required
          
                    />
                    <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>
                    <button
                        style={{
                            width: '2rem',
                            height: '2rem',
                            backgroundColor: 'white',
                            borderRadius: '50%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                    <label htmlFor="mediaInput" style={{ cursor: 'pointer' }}>
                        <img src="../../../public/assets/add-media.svg" style={{ width: '1rem' }} alt="Add Media" />
                    </label>
                    <input
                        type="file"
                        id="mediaInput"
                        style={{ display: 'none' }}
                        onChange={handleMediaUpload}
                    />
                    </button>
                    <div className="modal-action">
                        <form method="dialog">
                            <button
                                className="btn"
                                style={{ backgroundColor: '#885133', color: 'white', borderColor: '#885133' }}
                                onClick={handlePostReview}
                            >
                                Post
                            </button>
                            
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
}

export default ReviewModal;

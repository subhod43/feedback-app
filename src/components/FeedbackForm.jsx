import React, { useContext, useEffect, useState } from 'react'
import FeedbackContext from '../context/FeedbackContext';
import RatingSelector from './RatingSelector';
import Button from './sharedComponents/Button';
import Card from './sharedComponents/Card';

function FeedbackForm() {
    const [text, setReview] = useState('');
    const [rating, setRating] = useState(10);
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [message, setMessage] = useState('');
    const {addFeedback, feedbackEdit, updateFeedback} = useContext(FeedbackContext);

    useEffect(() => {
        if(feedbackEdit.edit === true) {
            console.log(feedbackEdit.item);
            setBtnDisabled(false);
            setReview(feedbackEdit.item.text);
            setRating(feedbackEdit.item.rating);
        }
    }, [feedbackEdit])

    const handleReview = (e) => {
        if(text === '') {
            setBtnDisabled(true);
            setMessage(null);
        } else if( text !== '' && text.trim().length < 10) {
            setBtnDisabled(true);
            setMessage('Review must be of at least 10 characters!')
        } else {
            setBtnDisabled(false);
            setMessage(null);
        }

        setReview(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(text.trim().length >= 10) {
            const newFeedback = {
                rating,
                text
            }
            if(feedbackEdit.edit === true) {
                updateFeedback(feedbackEdit.item.id, newFeedback);
                setBtnDisabled(true);
            } else {
                addFeedback(newFeedback);
            }
            setReview('');
        }

    }
    return (
    <Card>
        <form onSubmit={handleSubmit}>
            <h2>How would you rate our service?</h2>
            <RatingSelector selectedRating={(rating) => setRating(rating)}/>
            <div className="input-group">
                <input type="text"
                onChange={handleReview}
                placeholder='Write a review'
                value={text}
                />
                <Button type="submit" isDisabled={btnDisabled}>Click</Button>
            </div>
            {message && <div className='message'>{message}</div>}
        </form>
    </Card>
  )
}

export default FeedbackForm
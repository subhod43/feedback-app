import { createContext, useState } from "react";
import { v4 as uuid4 } from 'uuid';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
    const [feedback, setFeedback] = useState([
        {
            id: 1,
            text: 'this is feedback item 1',
            rating: 10
        },
        {
            id: 2,
            text: 'this is feedback item 2',
            rating: 9
        },
        {
            id: 3,
            text: 'this is feedback item 3',
            rating: 7
        }
    ])

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    const addFeedback = (newFeedback) => {
        newFeedback.id = uuid4();
        console.log(newFeedback);
        setFeedback([newFeedback, ...feedback]);
      }

      const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true
        })
      }

      const updateFeedback = (id, updatedItem) => {
        setFeedback(
            feedback.map((item) => (item.id === id ? { ...item, ...updatedItem} : item))
        )
      }

    const deleteFeedback = (id) => {
        if(window.confirm('Delete Feedback?')) {
          setFeedback(feedback.filter((item) => item.id !== id));
        }
      }

    return <FeedbackContext.Provider value={{
        feedback,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback
        }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext;
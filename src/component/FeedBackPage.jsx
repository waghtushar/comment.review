import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

function FeedbackForm() {
  const [rating, setRating] = useState(0); 
  const [hover, setHover] = useState(null); 
  const [description, setDescription] = useState(""); 
  const [feedbackList, setFeedbackList] = useState([]); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating || !description) {
      alert("Please provide a rating and feedback description.");
      return;
    }

    const newFeedback = { rating, description };
    setFeedbackList([...feedbackList, newFeedback]); 

    setRating(0);
    setDescription("");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow-sm">
            <h2 className="text-center">Feedback Form</h2>
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="form-group">
                <label>Rating</label>
                <div className="d-flex justify-content-center">
                  {[...Array(5)].map((_, index) => {
                    const starValue = index + 1;
                    return (
                      <FaStar
                        key={index}
                        size={30}
                        className={`cursor-pointer ${
                          starValue <= (hover || rating) ? "text-warning" : "text-muted"
                        }`}
                        onClick={() => setRating(starValue)} 
                        onMouseEnter={() => setHover(starValue)} 
                        onMouseLeave={() => setHover(null)} 
                      />
                    );
                  })}
                </div>
              </div>

              <div className="form-group mt-3">
                <label>Description</label>
                <textarea
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="4"
                  placeholder="Please provide your feedback"
                  required
                />
              </div>

              <button type="submit" className="btn btn-dark mt-3 w-100">
                Submit Feedback
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Display Feedback */}
      {feedbackList.length > 0 && (
        <div className="row justify-content-center mt-5">
          <div className="col-md-6">
            <h3 className="text-center">Submitted Feedback</h3>
            {feedbackList.map((feedback, index) => (
              <div key={index} className="card mt-3 p-3 shadow-sm">
                <div className="d-flex align-items-center">
                  <span className="font-weight-bold mr-2">Rating:</span>
                  {[...Array(feedback.rating)].map((_, i) => (
                    <FaStar key={i} className="text-warning" />
                  ))}
                </div>
                <p className="mt-2 mb-0"><strong>Description:</strong> {feedback.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default FeedbackForm;

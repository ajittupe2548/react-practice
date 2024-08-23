import React, { useState } from 'react';

/*
4. Keep the Local State Isolated
  - Local vs. Global State: Not all state in a React component should be local. Deciding whether state should be local depends on how the component's interactions should behave when rendered multiple times.

  - Determining Local State: To decide if a piece of state should be local, ask: "If this component was rendered twice, should this interaction reflect in the other copy?"

    - If the answer is "no", then it’s local state.
    - If "yes", then it should be managed globally (e.g., using a state management library).
*/

/* In this example, all the state is stored locally, leading to issues with synchronization when multiple instances are rendered: */
function Post() {
  const [content, setContent] = useState('This is a post');
  const [comments, setComments] = useState(['Great post!', 'Thanks for sharing']);
  const [expandedComments, setExpandedComments] = useState({});
  const [newComment, setNewComment] = useState('');

  const toggleComment = (index) => {
    setExpandedComments(prevState => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleNewComment = (e) => {
    setNewComment(e.target.value);
  };

  const addComment = () => {
    setComments([...comments, newComment]);
    setNewComment('');
  };

  return (
    <div>
      <h2>{content}</h2>
      <div>
        {comments.map((comment, index) => (
          <div key={index}>
            <p>{comment}</p>
            <button onClick={() => toggleComment(index)}>
              {expandedComments[index] ? 'Collapse' : 'Expand'}
            </button>
            {expandedComments[index] && <p>Expanded content</p>}
          </div>
        ))}
      </div>
      <input value={newComment} onChange={handleNewComment} />
      <button onClick={addComment}>Add Comment</button>
    </div>
  );
}

/* In this example, global state is handled outside the component (e.g., using a Redux store or a context provider), while truly local state (like which comments are expanded or the input value) is managed within the component: */
// Example of global state managed by a Redux store or context
const postContent = 'This is a post';
const comments = ['Great post!', 'Thanks for sharing'];

function PostV2() {
  const [expandedComments, setExpandedComments] = useState({});
  const [newComment, setNewComment] = useState('');

  const toggleComment = (index) => {
    setExpandedComments(prevState => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleNewComment = (e) => {
    setNewComment(e.target.value);
  };

  const addComment = () => {
    // Assuming we have a global function to add a comment to the global state
    console.log('Adding new comment to global state:', newComment);
    setNewComment('');
  };

  return (
    <div>
      <h2>{postContent}</h2>
      <div>
        {comments.map((comment, index) => (
          <div key={index}>
            <p>{comment}</p>
            <button onClick={() => toggleComment(index)}>
              {expandedComments[index] ? 'Collapse' : 'Expand'}
            </button>
            {expandedComments[index] && <p>Expanded content</p>}
          </div>
        ))}
      </div>
      <input value={newComment} onChange={handleNewComment} />
      <button onClick={addComment}>Add Comment</button>
    </div>
  );
}

function LocalState() {
  return (
    <div>
      <Post />
      <PostV2 />
    </div>
  )
}

export default LocalState
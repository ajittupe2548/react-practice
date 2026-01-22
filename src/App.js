import { useEffect, useState } from 'react';
import './App.css';

const INITIAL_STATE = [];
/*
Display nested comments (replies) => Done
Add new comments and replies => Done
Voting (upvote/downvote) or likes
Edit comments (Good to have)
Threading visualization (indentation, lines) (good to have)
Timestamp display (relative time) (good to have)
*/

const Comment = ({ data, onReply, onLike, onEdit }) => {
  const [showInput, setShowInput] = useState(false);
  const [showEditInput, setShowEditInput] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleKeyDown = (e) => {
    if (e.target.value !== '' && e.key === 'Enter') {
      const newComment = {
        id: Date.now(),
        title: e.target.value,
        likes: 0,
        timeStamp: new Date(Date.now()).toLocaleDateString(),
        replies: [],
      };
      onReply(data.id, newComment);
      setShowInput(false)
      e.target.value = '';
    }
  };

  const handleEditKeyDown = (e) => {
    if (e.target.value !== '' && e.key === 'Enter') {
      onEdit(data.id, e.target.value);
      e.target.value = '';
      setShowEditInput(false);
    }
  };

  const handleReplyClick = () => {
    setShowInput(true);
  };

  const handleLikeClick = () => {
    setIsLiked((prev) => !prev);
    onLike(data.id, !isLiked);
  };

  const handleEditClick = () => {
    setShowEditInput(true);
  };

  return (
    <div>
      <div className='comment'>
        <p className='heading'>
          {showEditInput ? (
            <input type='text' onKeyDown={handleEditKeyDown} />
          ) : (
            <span>{data.title}</span>
          )}
          <div className='button-container'>
            <button onClick={handleEditClick}>Edit</button>
            <button onClick={handleReplyClick}>Reply</button>
          </div>
        </p>
        <div className='additional-info'>
          <div>{data.timeStamp}</div>
          <div>
            {data.likes}{' '}
            <button onClick={handleLikeClick}>{isLiked ? 'UnLike' : 'Like'}</button>
          </div>
        </div>
      </div>

      <div className='child-container'>
        {showInput && <input type='text' onKeyDown={handleKeyDown} />}
        {data.replies.length > 0 &&
          data.replies.map((item) => {
            return (
              <Comment
                key={item.id}
                data={item}
                onReply={onReply}
                onLike={onLike}
                onEdit={onEdit}
              />
            );
          })}
      </div>
    </div>
  );
};

const handleAddComment = (comments, parentId, newComment) => {
  return comments.map((item) => {
    let newItem = { ...item };
    if (newItem.id === parentId) {
      newItem.replies.push(newComment);
    }

    newItem.replies = handleAddComment(item.replies, parentId, newComment);

    return {
      ...newItem,
    };
  });
};

const handleLikeComment = (comments, id, isLiked) => {
  return comments.map((item) => {
    let newItem = { ...item };
    if (newItem.id === id) {
      if (isLiked) {
        newItem.likes = newItem.likes + 1;
      } else {
        newItem.likes = newItem.likes - 1;
      }
    }

    newItem.replies = handleLikeComment(item.replies, id, isLiked);

    return {
      ...newItem,
    };
  });
};

const handleEditComment = (comments, id, title) => {
  return comments.map((item) => {
    let newItem = { ...item };
    if (newItem.id === id) {
      newItem.title = title;
    }

    newItem.replies = handleEditComment(item.replies, id, title);

    return {
      ...newItem,
    };
  });
};

function App() {
  const [showInput, setShowInput] = useState(false);
  const [comments, setComments] = useState([]);

  const handleNewCommentClick = () => {
    setShowInput(true);
  };

  const handleKeyDown = (e) => {
    if (e.target.value !== '' && e.key === 'Enter') {
      const newComment = {
        id: Date.now(),
        title: e.target.value,
        likes: 0,
        timeStamp: new Date(Date.now()).toLocaleDateString(),
        replies: [],
      };
      setComments((prev) => [...prev, newComment]);
      e.target.value = '';
    }
  };

  const handleReply = (parentId, newComment) => {
    const newComments = handleAddComment(comments, parentId, newComment);
    setComments(newComments);
  };

  const handleLike = (id, isLiked) => {
    const newComments = handleLikeComment(comments, id, isLiked);
    setComments(newComments);
  };

  const handleEdit = (id, title) => {
    const newComments = handleEditComment(comments, id, title);
    setComments(newComments);
  };

  return (
    <div className='app'>
      {comments.map((item) => {
        return (
          <div key={item.id}>
            <Comment
              data={item}
              onReply={handleReply}
              onLike={handleLike}
              onEdit={handleEdit}
            />
          </div>
        );
      })}
      {showInput && <input type='text' onKeyDown={handleKeyDown} />}
      <button onClick={handleNewCommentClick}>Add New Comment</button>
    </div>
  );
}

export default App;

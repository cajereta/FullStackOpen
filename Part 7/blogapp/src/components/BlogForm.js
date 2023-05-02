import { useState } from 'react';
import { useDispatch } from 'react-redux';
import "./LoginForm.css";
import { createBlog } from '../reducers/blogReducer';
import { notificationSetter } from '../reducers/notificationReducer';

const NewBlogForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createBlog({ title, author, url, likes: 0 }));
    dispatch(notificationSetter({ message: `A blog was added with the title '${title}' by '${author}'`, info: "info" }));
    setAuthor('');
    setTitle('');
    setUrl('');
  };

  return (
    <div>
      <h2 className='title-toggle'>Create new</h2>

      <form onSubmit={handleSubmit} className='form'>
        <div>
          <label>Title</label>
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            id='title'
            placeholder='Title of the blog'
          />
        </div>
        <div>
          <label>Author</label>
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            id='author'
            placeholder='Author of the blog'
          />
        </div>
        <div>
          <label>Url for more info</label>
          <input
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            id='url'
            placeholder='Url of the blog'
          />
        </div>
        <button id='create-butto' type='submit'>
          Create
        </button>
      </form>
    </div>
  );
};

export default NewBlogForm;
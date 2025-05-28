import { useState } from 'react';

interface AddPostProps {
  addPost: (title: string, body: string) => void;
}

export default function AddPost({ addPost }: AddPostProps) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPost(title, body);
    setTitle('');
    setBody('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add new Post</h2>
      <div className="input-container">
        <label htmlFor="title">Title</label>
        <input 
          name="title" 
          type="text" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="input-container">
        <label htmlFor="body">Body</label>
        <textarea 
          name="body" 
          value={body} 
          onChange={(e) => setBody(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn-submit">Add Post</button>
    </form>
  );
}

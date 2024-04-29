const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#title').value.trim();
    const body = document.querySelector('#body').value.trim();
    const user_id = document.querySelector('#user_id').value.trim();
  
    if (title && body && user_id) {
      const response = await fetch(`/api/post`, {
        method: 'POST',
        body: JSON.stringify({ title, body, user_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create post');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/post/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete post');
      }
    }
  };
  
  document
    .querySelector('.new-post')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.posts-list')
    .addEventListener('click', delButtonHandler);
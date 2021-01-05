

async function newFormHandler(event) {
    event.preventDefault();
  
    // get title and post text values
    const title = document.querySelector('input[name="post-title"]').value;
    const post_text = document.querySelector('input[name="post-text"]').value;
  
    // send values to server
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        post_text
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);
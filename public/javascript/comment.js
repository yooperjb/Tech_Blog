
async function commentFormHandler(event) {
    event.preventDefault();

    // get text info from textbox
    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();

    // get post id from address string
    const post_id = window.location.toString().split('/')[window.location.toString().split('/').length -1];

    console.log(comment_text, post_id);
    // if comment box contains text
    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
};

// event listener for comment submit button
document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);
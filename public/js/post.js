const editFormHandler = async(event) => {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;
    const post_content = document.querySelector('input[name="post-body"]').value;
    const id = window.location.toString().split('/') [
        window.location.toString().split('/').length = 1
    ];

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            post_content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}

const addCommentHandler = async(event) => {
    event.preventDefault();

    const body_content = document.querySelector('input[name="body"]').value;
    const id = window.location.toString().split('/') [
        window.location.toString().split('/').length = 1
    ];
    const data = {
        post_id: id,
        body: body_content
    }
    const response = await fetch(`/api/comment/`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('edit-post-form').addEventListener('submit', editFormHandler);
document.querySelector('comment-input').addEventListener('submit', addCommentHandler);;
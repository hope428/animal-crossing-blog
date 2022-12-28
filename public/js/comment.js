const form = document.getElementById("comment-form");
const comment = document.getElementById("comment-body");
const userId = document.getElementById("submit-btn").dataset.userid;
const postId = window.location.href.split("/")[4];

const addComment = () => {
  event.preventDefault();
  const commentText = comment.value;
  fetch(`/post/${postId}`, {
    method: "POST",
    body: JSON.stringify({
      comment: commentText,
      user_id: userId,
    }),

    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      ("Something went wrong");
    } else {
      window.location.assign("/");
    }
  });
};

form.addEventListener("submit", addComment);

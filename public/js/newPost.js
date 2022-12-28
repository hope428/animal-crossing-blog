const postForm = document.querySelector("form");
const title = document.getElementById("new-post-title");
const body = document.getElementById("new-post-body");
const userid = document.querySelector("button").dataset.userid;
const deleteBtn = document.getElementById("delete-post")
const page = window.location.href.split("/");

const submit = () => {
    event.preventDefault()
  if (page[4] === "edit") {
    fetch(`${page[5]}`, {
        method: "PUT",
        body: JSON.stringify({
          title: title.value,
          content: body.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (!res.ok) {
          console.error("There was an issue updating this post");
        } else {
          window.location.assign("/dashboard");
        }
      })
  } else {
    fetch("/new-post", {
      method: "POST",
      body: JSON.stringify({
        title: title.value,
        content: body.value,
        user_id: userid,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (!res.ok) {
        console.error("There was an issue submitting this post");
      } else {
        window.location.assign("/dashboard");
      }
    });
  }
};

const deleteItem = () => {
  event.preventDefault()
  fetch(`/post/delete/${page[5]}`, {
    method: "DELETE", 
    headers: { "Content-Type": "application/json" }
  }).then((res) => {
    if(!res.ok){
      console.log('something went wrong!');
    } else {
      window.location.assign('/dashboard')
    }
  })
}

if(deleteBtn){
  deleteBtn.addEventListener('click', deleteItem)
}
postForm.addEventListener("submit", submit);

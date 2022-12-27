const postForm = document.querySelector("form")
const title = document.getElementById("new-post-title")
const body = document.getElementById("new-post-body")
const userid = document.querySelector("button").dataset.userid

const submit = () => {
    event.preventDefault()

    console.log(title.value);
    console.log(body.value);
    console.log(userid);
   
    fetch("/new-post", {
        method: "POST",
        body: 
            JSON.stringify({
                title: title.value,
                content: body.value,
                user_id: userid
            })
        , 
        headers: {
            "Content-Type": "application/json",
          }
    }).then((res) => {
        if(!res.ok){
            console.error("There was an issue submitting this post")
        } else {
            window.location.assign("/dashboard")
        }
    })
}

postForm.addEventListener("submit", submit)
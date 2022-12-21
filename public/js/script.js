const loginBtn = document.getElementById("login-submit");
const loginUser = document.getElementById("login-username");
const loginPw = document.getElementById("login-password");
const page = window.location.href.split("/")[3];

const submit = () => {
  event.preventDefault();
  if (page === "login") {
    const username = loginUser.value;
    const pw = loginPw.value;

    loginUser.value = "";
    loginPw.value = "";

    fetch("/login", {
      method: "POST",
      body: JSON.stringify({
        username,
        pw,
      }),

      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        console.log("You are now logged in!");
      } else {
        console.log("Something went wrong, we couldn't log you in!");
      }
    });
  } else if (page === 'singup') {
    
  }
};

loginBtn.addEventListener("click", submit);

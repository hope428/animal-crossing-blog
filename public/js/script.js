const loginBtn = document.getElementById("login-submit");
const loginUser = document.getElementById("login-username");
const loginPw = document.getElementById("login-password");
const page = window.location.href.split("/")[3];

const submit = () => {
  event.preventDefault();

  if (page === "login") {
    const username = loginUser.value;
    const pw = loginPw.value;

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
      if (!res.ok) {
        alert("Incorrect username or password!");
      } else {
        window.location.assign("/");
      }
    });
  } else if (page === "signup") {
    const username = loginUser.value;
    const pw = loginPw.value;

    fetch("/signup", {
      method: "POST",
      body: JSON.stringify({
        username,
        pw,
      }),

      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      if (res.ok) {
        window.location.assign("/dashboard")
      } else {
        const data = await res.json()
        console.log(data.errors[0].message);
      }
    });
  }
};

loginBtn.addEventListener("click", submit);

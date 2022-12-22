const logoutBtn = document.getElementById("logout")

const logout = () => {
    fetch('/logout', {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'}
    }).then((res) => {
        if(res.ok){
            document.location.replace('/')
        } else {
            alert(res.statusText)
        }
    })
}

logoutBtn.addEventListener('click', logout)
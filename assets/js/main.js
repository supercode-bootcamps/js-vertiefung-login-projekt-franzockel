document.onload = checkAlreadyVisited();
document.onload = checkUsername();

// ==========LOGIN MODAL==========
function error(wrongValue, errorMessage) {
  let warning = document.createElement("p");
  warning.classList.add("warning");
  document.querySelector("form").appendChild(warning);

  if (wrongValue == "username" || wrongValue == "password") {
    document.querySelector("#" + wrongValue).classList.add("wrongInput");

    warning.innerText = `*${errorMessage}`;
  } else if (wrongValue == "missingInput") {
    document.querySelectorAll("form > div > input").forEach((item) => {
      item.classList.add("wrongInput");
    });

    warning.innerText = "*please enter username and password";
  }

  document.querySelectorAll(".wrongInput").forEach((item) => {
    let annotation = document.createElement("p");
    annotation.innerText = "*";
    annotation.classList.add("annotation");
    item.parentNode.appendChild(annotation);
  });
}

document.querySelector("#submit").addEventListener("click", (e) => {
  e.preventDefault();
  let username = document.querySelector("#username").value.toLowerCase();
  let password = document.querySelector("#password").value;

  const data = { name: username, secret: password };
  if (username != "" && password != "") {
    fetch("https://supercode-auth-demo.herokuapp.com/", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success == true) {
          document.querySelector("#modal").style.display = "none";
          document.querySelector("#welcomeUsername").innerText = username;
          setCookie("Visited", "true", 365);
          setCookie("Username", username, 365);
        } else if (data.success == false && data.message == "user not found") {
          error("username", data.message);
        } else if (data.success == false && data.message == "wrong password") {
          error("password", data.message);
        }
      });
  } else {
    error("missingInput");
  }
});

document.querySelectorAll("input").forEach((item) => {
  item.addEventListener("click", (e) => {
    if (e.target.classList.contains("wrongInput")) {
      e.target.value = "";
      e.target.classList.remove("wrongInput");
      if (
        document
          .querySelector("form")
          .contains(document.querySelector(".warning"))
      ) {
        document
          .querySelector("form")
          .removeChild(document.querySelector(".warning"));
      }

      e.target.parentNode.childNodes[5].remove();
    }
  });
});

// ==========FUNCTION TO SET COOKIE==========

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// ==========FUNCTION TO CHECK WETHER USER HAS ALREADY LOGGED IN==========
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkAlreadyVisited() {
  var pageAlreadyVisited = getCookie("Visited");
  if (pageAlreadyVisited == "true") {
    document.querySelector("#modal").style.display = "none";
  }
}

function checkUsername() {
  var cookieUsername = getCookie("Username");
  document.querySelector("#welcomeUsername").innerText = cookieUsername;
}

// ==========LOGOUT==========
document.querySelector("#logout").addEventListener("click", (e) => {
  document.cookie = "Visited=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "Username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  location.reload();
});

const USERS = [
  { name: "supercode", secret: "no_one_will_know" },
  { name: "music_fan_1990", secret: "WeAreTheChampi0ns" },
  { name: "admin", secret: "1234" },
  { name: "Franzi", secret: "1234" },
];

document.onload = checkCookie();
document.onload = checkUsername();

// ==========LOGIN MODAL==========
function error(x) {
  if (x == "username" || x == "password") {
    document.querySelector("#" + x).classList.add("wrongInput");
    let annotation = document.createElement("p");
    annotation.innerText = "*";
    annotation.classList.add("annotation");
    document.querySelector("#" + x + "Div").appendChild(annotation);

    let warning = document.createElement("p");
    warning.classList.add("warning");
    document.querySelector("form").appendChild(warning);

    if (x == "username") {
      warning.innerText = "*user does not exist";
    } else if (x == "password") {
      warning.innerText = "*password is wrong";
    }
  } else if (x == "missingInput") {
    document.querySelectorAll("form > div > input").forEach((item) => {
      item.classList.add("wrongInput");
      let annotation = document.createElement("p");
      annotation.innerText = "*";
      annotation.classList.add("annotation");
      item.parentNode.appendChild(annotation);
    });
    let warning = document.createElement("p");
    warning.classList.add("warning");
    document.querySelector("form").appendChild(warning);
    warning.innerText = "*please enter username and password";
  }
}

document.querySelector("#submit").addEventListener("click", (e) => {
  e.preventDefault();
  let username = document.querySelector("#username").value.toLowerCase();
  let password = document.querySelector("#password").value;
  index = USERS.findIndex((x) => x.name.toLowerCase() == username);

  if (
    index >= 0 &&
    USERS[index].name.toLowerCase() == username &&
    USERS[index].secret == password
  ) {
    document.querySelector("#modal").style.display = "none";
    document.querySelector("#welcomeUsername").innerText = username;
    setCookie("Visited", "true", 365);
    setCookie("Username", username, 365);
  } else if (username == "" && password == "") {
    error("missingInput");
  } else if (
    USERS.some((user) => user["name"] == username) &&
    USERS[index].secret !== password
  ) {
    error("password");
  } else {
    error("username");
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

function checkCookie() {
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

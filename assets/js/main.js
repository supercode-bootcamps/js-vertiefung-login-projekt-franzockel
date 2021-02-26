const USERS = [
  { name: "supercode", secret: "no_one_will_know" },
  { name: "music_fan_1990", secret: "WeAreTheChampi0ns" },
  { name: "admin", secret: "1234" },
];

document.onload = checkCookie();

// ==========LOGIN MODAL==========
document.querySelector("#submit").addEventListener("click", (e) => {
  e.preventDefault();
  let username = document.querySelector("#username").value.toLowerCase();
  let password = document.querySelector("#password").value;
  index = USERS.findIndex((x) => x.name == username);

  if (
    USERS.some((user) => user["name"] == username) &&
    USERS[index].secret == password
  ) {
    document.querySelector("#modal").style.display = "none";
    setCookie("Visited", "true", 365);
    document.querySelector("#userName").innerText = username;
  }
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

// ==========LOGOUT==========
document.querySelector("#logout").addEventListener("click", (e) => {
  document.cookie = "Visited=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  location.reload();
});

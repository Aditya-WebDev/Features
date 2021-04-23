const api = `https://randomuser.me/api`;

const addUser = document.getElementById("user-btn");
const mainApp = document.getElementById("app");
const userList = document.getElementById("user-list");
const searchInput = document.getElementById("search");
const appState = [];

class User {
  constructor(title, firstname, lastname, gender, email) {
    this.title = `${title}`;
    this.name = ` ${firstname} ${lastname}`;
    this.gender = `${gender}`;
    this.email = `${email}`;
  }
}
addUser.addEventListener("click", async () => {
  const userData = await fetch(api, {
    method: "GET"
  });
  const userJson = await userData.json();
  // console.log(userJson.results[0]);
  const user = userJson.results[0];
  const classUser = new User(
    user.name.title,
    user.name.first,
    user.name.last,
    user.gender,
    user.email
  );
  appState.push(classUser);
  //console.log(appState);
  domRenderer(appState);
  // const userEl = document.createElement("div");
  // userEl.innerHTML = `<div>
  // ${user.name.title} ${user.name.first} ${user.name.last}
  // </div>`;
  // mainApp.appendChild(userEl);
});

const domRenderer = (stateArr) => {
  userList.innerHTML = null;
  stateArr.forEach((userObj) => {
    const userEl = document.createElement("div");
    userEl.innerHTML = `<div>
 Name : ${userObj.title} ${userObj.name}
  <ol>
    <li>${userObj.gender}</li>
    <li>${userObj.email}</li>
  </ol>
  </div>`;
    userList.appendChild(userEl);
  });
};

searchInput.addEventListener("keyup", (e) => {
  console.log(e, searchInput.value);
  const filteredAppState = appState.filter(
    (user) =>
      user.name.first.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      user.name.last.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      user.gender.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchInput.value.toLowerCase())
  );
  domRenderer(filteredAppState);
});
const sortDesc = document.getElementById("sort-desc");
sortDesc.addEventListener("click", () => {
  const appStateCopy = [...appState];
  appStateCopy.sort((a, b) => (a.name < b.name ? 1 : -1));
  domRenderer(appStateCopy);
});
const sortAsc = document.getElementById("sort-asc");
sortAsc.addEventListener("click", () => {
  const appStateCopy = [...appState];
  appStateCopy.sort((a, b) => (a.name < b.name ? -1 : 1));
  domRenderer(appStateCopy);
});

let userName = document.querySelector(".user_name");
let getRepos = document.querySelector(".get-repos");
let noData = document.querySelector(".no-data");
let reposContent = document.querySelector(".repos-content");

window.onload = function () {
  userName.focus();
};

getRepos.addEventListener("click", (e) => {
  e.preventDefault();
  if (userName.value === "" || userName.value === null) {
    reposContent.innerHTML = "";
    noData.innerHTML = "please enter a valid user name";
  } else {
    reposContent.innerHTML = "";
    showRepo(userName.value)
      .then((myData) => {
        myData.forEach((repo) => {
          createRepos(repo.name, repo.stargazers_count, repo.html_url);
        });
        noData.classList.add("hide");
      })
      .catch(() => {
        noData.classList.remove("hide");
        noData.innerHTML = "please enter a valid user name";
      })
      .finally(console.log("mission completed"));
  }
});

function createRepos($title, $start, $url) {
  let myDiv = document.createElement("div");
  let repoTitle = document.createElement("p");
  let links = document.createElement("div");
  let stars = document.createElement("span");
  let myUrl = document.createElement("a");

  let nbStars = document.createTextNode(`stars ${$start}`);
  let repoTitleText = document.createTextNode(`${$title}`);
  let myUrlText = document.createTextNode("visit");

  myDiv.className = "repo";
  repoTitle.className = "repo-title";
  links.className = "links";
  stars.className = "stars";
  myUrl.className = "url";
  myUrl.href = $url;
  myUrl.target = "_blank";

  repoTitle.appendChild(repoTitleText);
  myUrl.appendChild(myUrlText);
  stars.appendChild(nbStars);
  links.appendChild(stars);
  links.appendChild(myUrl);
  myDiv.appendChild(repoTitle);
  myDiv.appendChild(links);
  reposContent.appendChild(myDiv);
}

function showRepo(link) {
  return new Promise((res, rej) => {
    fetch(`https://api.github.com/users/${link}/repos`).then((result) => {
      if (result.status === 200) {
        res(result.json());
      } else {
        rej(Error("no data found"));
      }
    });
  });
}

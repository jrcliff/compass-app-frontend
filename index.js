let addUser = false;
const usersURL = "http://localhost:3000/users";
const postsURL = "http://localhost:3000/posts";
const likesURL = "http://localhost:3000/likes";
let pageBackGround = () => document.getElementById(`page-content`);
let userModal = () => document.getElementById(`user-modal`);
let postModal = () => document.getElementById(`post-modal`);
let userForm = () => document.querySelector(`#user-form`);
let removeSignUp = () => document.getElementById("sign-up-btn");
let postForm = () => document.getElementById("post-form");
let savePost = () => document.getElementById("save-post");

document.addEventListener("DOMContentLoaded", () => {
  const newPostButton = document.getElementById("new-post-btn");
  newPostButton.addEventListener("click", () => {
    showNewPostForm();
  });

  const newUserButton = document.getElementById("sign-up-btn");
  newUserButton.addEventListener("click", () => {
    showNewUserForm();
  });

  const closePost = document.getElementById("close-post");
  closePost.addEventListener("click", () => {
    closePostForm();
  });

  const anotherClosedPost = document.getElementById("tiger-king");
  anotherClosedPost.addEventListener("click", () => {
    closePostForm();
  });

  const closeUser = document.getElementById("close-user-btn");
  closeUser.addEventListener("click", () => {
    closeUserForm();
  });

  const closeNewUser = document.getElementById("close-new-user");
  closeNewUser.addEventListener("click", () => {
    closeUserForm();
  });

  fetch(postsURL)
    .then((resp) => resp.json())
    .then((postsArray) =>
      postsArray.forEach((post) => {
        // console.log(post)
        renderPost(post);
      })
    );

  userForm().addEventListener("submit", (event) => {
    createUser(event);
  });

  savePost().addEventListener("click", (event) => {
    createPost(event);
  });
});
// renderLikes()

function renderUser(user) {
  let list = document.getElementsByTagName("ul")[0];
  let name = document.createElement("li");
  name.innerText = user.name;
  list.appendChild(name);
}

function renderPost(post) {
  let wrapper = document.querySelector(".container");
  let likes = document.createElement('button')
  likes.classList.add('btn', 'btn-primary')
  likes.innerText = `${post.likes.length} Likes`;
  likes.style.display = 'block'
  let gridItem = document.createElement('div')
  gridItem.className = 'grid-item'
  let img = document.createElement("img");
  img.classList = "item";
  img.id = `${post.id}`;

  img.src = post.image;
  wrapper.appendChild(gridItem);
  gridItem.append(img, likes)
  
  // renderLikes(post);
}

function renderLikes(post) {
  post.likes.forEach((like) => {
    let newWrapper = document.getElementById(post.id);
    let displayLikes = document.createElement("p");
    displayLikes.classList = "visually-hidden";
    displayLikes.innerText = `${post.likes.length} likes`;
    newWrapper.appendChild(displayLikes);
  });
}

const showNewPostForm = () => {
  postModal().style.display = `block`;
  pageBackGround().position = `fixed`;
};

const showNewUserForm = () => {
  userModal().style.display = `block`;
  pageBackGround().position = `fixed`;
};

const closePostForm = () => {
  postModal().style.display = "none";
  pageBackGround().position = "auto";
};

const closeUserForm = () => {
  userModal().style.display = "none";
  pageBackGround().position = "auto";
};

function createUser(event) {
  event.preventDefault();
  let userInput = document.getElementById("enter-name").value;

  if (userInput === "") {
    document.getElementById("enter-name").placeholder =
      "Please Enter Your Name";
  } else {
    let data = {};
    data.name = userInput;

    fetch(usersURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((newUser) => renderUserName(newUser));

    userForm().reset();
    closeUserForm();
    // removeSignUp().style.display = "none";
  }
}

function renderUserName(user) {
  let jumbotron = document.querySelector(".jumbotron");
  div = document.createElement("div");
  div.classList = "baskin";
  div.id = user.id;
  jumbotron.appendChild(div);
}

function createPost(event) {
  event.preventDefault();
  let targetImage = document.getElementById("get-post").value;
  let captureCaption = document.getElementById("post-caption").value;
  let postId = document.querySelector(".baskin");
  let newPost = {
    image: targetImage,
    user_id: postId.id,
    caption: captureCaption,
  };

  fetch(postsURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  })
    .then((resp) => resp.json())
    .then((newImg) => renderPost(newImg));
}

function titleList(post) {
    const list = document.createElement('li');
    list.textContent = post.postTitle;
    list.style.backgroundColor = "white";
    list.style.paddingBottom = "20px";
    list.style.paddingTop = "20px";
    list.style.border = "none";
    list.style.borderRadius = "5px";
    list.style.cursor = "pointer";
    list.style.width = "100%";

    list.addEventListener('click', () => {
        showFirstPost(post);
    });

    const postListDiv = document.getElementById("post-list");
    postListDiv.appendChild(list);
}

function showFirstPost(post) {
    const postDetailsDiv = document.getElementById("post-detail");
    postDetailsDiv.innerHTML = "";

    const heading = document.createElement("h2");
    heading.textContent = post.postTitle;

    const author = document.createElement("p");
    author.textContent = `By: ${post.author}`;

    const image = document.createElement("img");
    image.src = post.imageURL;
    image.alt = post.postTitle;
    image.style.width = "95%";
    image.style.alignSelf = "center";

    const content = document.createElement("p");
    content.textContent = post.content;

    postDetailsDiv.appendChild(heading);
    postDetailsDiv.appendChild(author);
    postDetailsDiv.appendChild(image);
    postDetailsDiv.appendChild(content);
}

function displayPosts() {
    fetch("http://localhost:3000/Posts")
        .then(resp => resp.json())
        .then(data => {
            data.forEach(post => {
                titleList(post);
            });

            if (data.length > 0) {
                showFirstPost(data[0]);
            }
        });
}

function addNewPostListener() {
    const form = document.getElementById("blogForm");
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        postMaker();
    });
}

function postMaker() {
    const form = document.getElementById("blogForm");
    const formData = new FormData(form);

    const newBlog = {
        postTitle: formData.get("title"),
        author: formData.get("author"),
        imageURL: formData.get("image"),
        content: formData.get("content")
    };

    const poster = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(newBlog)
    };

    fetch("http://localhost:3000/posts", poster)
        .then(resp => resp.json())
        .then(post => {
            titleList(post); 
            showFirstPost(post); 
            form.reset();
        });
}

function main() {
    displayPosts();
    addNewPostListener();
}

function deletePost(form){
    const form = document.getElementById("blogform")
    
}

document.addEventListener('DOMContentLoaded', main);

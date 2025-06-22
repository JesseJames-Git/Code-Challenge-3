function titleList (title){
    const list = document.createElement('li')
    list.textContent = title
    list.style.backgroundColor = "white";
    list.style.paddingBottom = "20px";
    list.style.paddingTop = "20px";
    list.style.border = "none";
    list.style.borderRadius = "5px";
    list.style.cursor = "pointer";
    list.style.width = "100%";

    list.addEventListener('click',handlePostClick)
    function handlePostClick() {
    fetch("http://localhost:3000/Posts")
        .then(resp => resp.json())
        .then(data => {
        const post = data.find(blog => blog.postTitle === title)

        const heading = document.createElement("h2");
        heading.textContent = post.postTitle;

        const author = document.createElement("p");
        author.textContent = `By: ${post.author}`;

        const image = document.createElement("img");
        image.src = post.imageURL;
        image.alt = post.postTitle;
        image.style.width = "95%";
        image.style.alignSelf= "center"

        const content = document.createElement("p");
        content.textContent = post.content;

        const postDetailsDiv = document.getElementById("post-detail");
        postDetailsDiv.innerHTML = "";
        postDetailsDiv.appendChild(heading);
        postDetailsDiv.appendChild(author);
        postDetailsDiv.appendChild(image);
        postDetailsDiv.appendChild(content);
        });
    }
    const postListDiv =document.getElementById("post-list")
    postListDiv.appendChild(list)
    
}

function displayPosts(){
    fetch("http://localhost:3000/Posts")
    .then (resp => resp.json())
    .then ( data => { 
        data.forEach(post => {
            titleList(post.postTitle)  
        })
    })
}

function addNewPostListener (){
    const form = document.getElementById("blogForm")
    form.addEventListener('submit', (event)=>{
        event.preventDefault()
        postMaker()
    })

}

function postMaker(){
    const form = document.getElementById("blogForm")
    const formData = new FormData(form)

    const newBlog = {
        postTitle: formData.get("title"),
        author: formData.get("author"),
        imageURL: formData.get("image"),
        content: formData.get("content")
    }
    const poster ={
        method :"POST",
        headers :{
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        },
        body: JSON.stringify(newBlog)
    }
    fetch("http://localhost:3000/posts", poster)
    .then(resp => resp.json())
    .then(post =>{        
            titleList(post.postTitle)
            form.reset()  
        })
}

function main(){
    displayPosts()
    addNewPostListener()
}
document.addEventListener('DOMContentLoaded', main)



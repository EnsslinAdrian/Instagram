function initRender() {
    renderForYou();
    renderProfil();
    renderPosts();
    guestNameRender();
    questProfil();
}

let forYouPictures = ['./img/profil/max.png', './img/profil/stefani.png', './img/profil/dennis.png', './img/profil/tina.png', './img/profil/tamara.png', './img/profil/adrian.png', './img/profil/carina.png', './img/profil/criss.png',];
let forYouNames = ['Max', 'Stefani', 'Dennis', 'Tina', 'Tamara', 'Adrian', 'Carina', 'Criss'];

let usernames = ['max.musterman', 'stefani.vx7', 'dennis.slayer', 'tamra.schneider', 'tina.ensslin'];
let profilImages = ['./img/profil/max.png', './img/profil/stefani.png', './img/profil/dennis.png', './img/profil/tamara.png', './img/profil/tina.png'];

let questUserNames = [];
let questNames = [];

const likeImage = './img/icons8-favorite-48 (1).png';
const unlikeImage = './img/icons8-herz-50 (1).png';


let posts = [
    {
        "profilPic": "./img/profil/dennis.png",
        "name": "denis.slayer",
        "likes": [],
        "comments": ['Schön Landschaft 😊👍']
    },

    {
        "profilPic": "./img/profil/stefani.png",
        "name": "stefan.vx7",
        "likes": [],
        "comments": ['Schön Landschaft 😊👍']
    },

    {
        "profilPic": "./img/profil/tamara.png",
        "name": "tamara.schneider",
        "likes": [],
        "comments": ['Schön Landschaft 😊👍']
    }

];

loadComment();
loadQuest();


function renderForYou() {
    let forYou = document.getElementById('forYou');
    forYou.innerHTML = '';

    for (let i = 0; i < forYouPictures.length; i++) {
        const picture = forYouPictures[i];
        const name = forYouNames[i];

        forYou.innerHTML += `
        <div class="for-you-container">
        <img src="${picture}">
        <p>${name}</p>
        </div>
        `;
    }
}

function questProfil() {
    document.getElementById('questUserName').innerHTML = `${questUserNames}`;
    document.getElementById('questName').innerHTML = `${questNames}`;
}

function renderProfil() {
    let content = document.getElementById('suggestions');
    content.innerHTML = '';

    for (let i = 0; i < usernames.length; i++) {
        const username = usernames[i];
        const profilImage = profilImages[i];

        content.innerHTML += generateTextProfiles(username, profilImage, i);
    }
}

function generateTextProfiles(username, profilImage, i) {
    return `
    <div class="profiles-container-profil">
    <div class="profiles-picture">
        <img src="${profilImage}">
        <div class="profiles-names">
            <p><b>${username}</b></p>
            <p class="color">Vorschläge für dich</p>
        </div>
    </div>
    
    <div class="profile-change">
     <a href="#" onclick="follow(${i})" id="follow${i}">Folgen</a>
    </div>
    </div>
    `;
}

function follow(i) {
    let followButton = document.getElementById(`follow${i}`);
    if (followButton.innerHTML === 'Folgen') {
        followButton.innerHTML = 'Entfolgen';
    } else {
        followButton.innerHTML = 'Folgen';
    }
}


function renderPosts() {
    let content = document.getElementById('posts');
    content.innerHTML = '';

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        const isLiked = post.likes.includes(questUserNames[0]);
        const currentLikeImage = isLiked ? likeImage : unlikeImage;

        content.innerHTML += generateTextPosts(post, i, isLiked, currentLikeImage);
    }
}


function generateTextPosts(post, i, isLiked, currentLikeImage) {
    return `
<div class="post-container">

<div class="post-header">
    <div class="center">
        <img src="${post['profilPic']}">
        <h4 class="color-white">${post['name']}</h4>
    </div>
    <img class="options-img" src="./img/icons8-drei-punkte-50.png">
</div>


<div class="post-picture">
    <img src="./img/posts/bild1.jpg">
</div>

<div class="post-options-img">
    <div class="postion-left-options-img" id="like">
    <img onclick="like(${i})" id="heart${i}" class="cursor-pointer" src="${currentLikeImage}">
    </div>
    <img src="./img/icons8-speichern-50.png" alt="">
</div>

<div class="post-info-text color-white">
    <p class="distance-p">Gefällt ${post.likes.length} Mal</p>
    <p class="distance-p-bottom wihtd">${post['comments'][0]}</p>
</div>

<div class="post-comment color-gray">
    <p onclick="popupRender(${i})" class="distance-p cursor-pointer">Alle ${post.comments.length} Kommentare ansehen</p>
    <div class="comment-container">
        <textarea name="comment" id="commentfield${i}" cols="30" rows="10" placeholder="Kommentieren..."></textarea>
        <button class="cursor-pointer" onclick="newComment(${i})">Posten</button>
    </div>
</div>
</div>
`;
}


function like(i) {
    let name = questUserNames[0];
    let post = posts[i];
    let likesIndex = post.likes.indexOf(name);
    let heartImage = document.getElementById('heart' + i);

    if (likesIndex === -1) {
        post.likes.push(name);
        heartImage.src = likeImage;
    } else {
        post.likes.splice(likesIndex, 1);
        heartImage.src = unlikeImage;
    }
    renderPosts();
    saveComment();
}



function newComment(i) {
    let comment = document.getElementById(`commentfield${i}`).value;
    if (comment.length < 1) {
        alert('Mindestens 1 Zeichen')
    } else if (comment.length > 200) {
        alert('Maximal 200 Zeichen')
    }
    else {
        posts[i].comments.unshift(comment);
        renderPosts();
        saveComment();
    }
}

function newCommentPopup(i) {
    let comment = document.getElementById(`commentfieldPopup${i}`).value;
    if (comment.length < 1) {
        alert('Mindestens 1 Zeichen')
    } else {
        posts[i].comments.unshift(comment);
        popupRender(i);
        renderPosts();
        saveComment();
    }
}


function saveComment() {
    let saveCommentAsText = JSON.stringify(posts);
    localStorage.setItem('comments', saveCommentAsText);
}


function loadComment() {
    let saveCommentAsText = localStorage.getItem('comments');
    if (saveCommentAsText) {
        posts = JSON.parse(saveCommentAsText);
    }
}


function guestNameRender() {
    if (questNames.length === 0) {
        document.getElementById('popup').innerHTML = `
         <h5>Gast Login</h5>
         <input type="text" placeholder="Benutzername..." id="questUserNameField">
         <input type="text" placeholder="Vor- und Nachname..." id="questNameField">
         <button onclick="quest()">Login</button>
         `;
    } else {
        document.getElementById('popupSection').classList.add('d-none');
        document.getElementById('popup').classList.add('d-none');
    }
}

function quest() {
    let username = document.getElementById('questUserNameField').value;
    let name = document.getElementById('questNameField').value;
    questUserNames.push(username);
    questNames.push(name);
    document.getElementById('questUserNameField').value = '';
    document.getElementById('questNameField').value = '';
    document.getElementById('popupSection').classList.add('d-none');
    document.getElementById('popup').classList.add('d-none');
    saveQuest();
    questProfil();
}

function saveQuest() {
    let questUserNameAsText = JSON.stringify(questUserNames);
    let questNamesAsText = JSON.stringify(questNames);
    localStorage.setItem('questusername', questUserNameAsText);
    localStorage.setItem('questname', questNamesAsText);
}


function loadQuest() {
    let questUserNameAsText = localStorage.getItem('questusername');
    let questNamesAsText = localStorage.getItem('questname');
    if (questUserNameAsText && questNamesAsText) {
        questUserNames = JSON.parse(questUserNameAsText);
        questNames = JSON.parse(questNamesAsText);
    }
}

function popupRender(i) {
    document.getElementById('commentPopupSection').classList.remove('d-none');
    document.body.style.overflow = "hidden";
    let post = posts[i];
    const isLiked = post.likes.includes(questUserNames[0]);
    const currentLikeImage = isLiked ? likeImage : unlikeImage;
    let content = document.getElementById('commentPopup');
    content.innerHTML = generateTextPopup(post, i, isLiked, currentLikeImage);


    let comment = document.getElementById(`comments`);
    for (let e = 0; e < post['comments'].length; e++) {
        const comm = post['comments'][e];
        comment.innerHTML += `<div class="comment-text-popup" class="color-white"><b>${questUserNames}:</b> ${comm}</div>`;
    }
}


function generateTextPopup(post, i, isLiked, currentLikeImage) {
    return `
    <img src="./img/posts/bild1.jpg">
    
    <div class="comments-container-popup">
    
        <div class="post-header border">
            <div class="center">
               <img src="${post['profilPic']}">
                <h4 class="color-white">${post['name']}</h4>
            </div>
            <img class="options-img" src="./img/icons8-drei-punkte-50.png">
        </div>
        <div id="comments" class="show-comments" style="margin: 10px;">
    
        </div>
    
        <div class="post-options-img" style="margin: 10px;">
        <div class="postion-left-options-img" id="like">
        <img onclick="likePopup(${i})" id="heart${i}" class="cursor-pointer" src="${currentLikeImage}">
        </div>
            <img src="./img/icons8-speichern-50.png" alt="">
        </div>
    
        <div class="post-info-text color-white border">
        <p class="distance-p">Gefällt ${post.likes.length} Mal</p>
            <p class="distance-p-bottom"></p>
        </div>
    
        <div class="post-comment color-gray margin">
            <div class="comment-container">
            <textarea name="comment" id="commentfieldPopup${i}" cols="30" rows="10" placeholder="Kommentieren..."></textarea>
            <button class="cursor-pointer" onclick="newCommentPopup(${i})">Posten</button>
            </div>
        </div>
    
    </div>
    `;
}

function likePopup(i) {
    let name = questUserNames[0];
    let post = posts[i];
    let likesIndex = post.likes.indexOf(name);
    let heartImage = document.getElementById('heart' + i);

    if (likesIndex === -1) {
        post.likes.push(name);
        heartImage.src = likeImage;
    } else {
        post.likes.splice(likesIndex, 1);
        heartImage.src = unlikeImage;
    }
    popupRender(i);
    renderPosts();
    saveComment();
}



function closePopup() {
    document.getElementById('commentPopupSection').classList.add('d-none');
    document.body.style.overflow = "";
}


import { getToken, renderApp, posts } from "../index.js";
import { setLike, removeLike } from "../api.js";

export const likedUsers = ({ elementLikesLength, elementLikes }) => {
    if (elementLikesLength === 1) {
        return elementLikes.name;
    } else if (elementLikesLength > 1) {
        return `<strong>${elementLikes.name}</strong> и ещё <strong>${(elementLikesLength - 1)}</strong>`;
    } else {
        return elementLikesLength;
    }
};

export const likeEventListener = () => {
    const likeButtons = document.querySelectorAll(".like-button");

    likeButtons.forEach(likeButton => {
        likeButton.addEventListener("click", (event) => {
            event.stopPropagation();
            const postId = likeButton.dataset.postId;
            const index = likeButton.dataset.index;
            console.log(likeButton.dataset);

            if (posts[index].isLiked) {
                removeLike({ token: getToken(), postId });
                posts[index].isLiked = false;
                posts[index].likes--;
            } else {
                setLike({ token: getToken(), postId });
                posts[index].isLiked = true;
                posts[index].likes++;
            }

            renderApp();
        })
    });
};
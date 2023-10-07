import { getToken } from "../index.js";
import { setLike, removeLike } from "../api.js";
import { renderPostsPageComponent } from "./posts-page-component.js";

export const likedUsers = ({ elementLikesLength, elementLikes }) => {
    if (elementLikesLength === 1) {
        return elementLikes.name;
    } else if (elementLikesLength > 1) {
        return `<strong>${elementLikes.name}</strong> и ещё <strong>${(elementLikesLength - 1)}</strong>`;
    } else {
        return elementLikesLength;
    }
};

export const likeEventListener = ({ appEl }) => {
    const likeButtons = document.querySelectorAll(".like-button");

    likeButtons.forEach(likeButton => {
        likeButton.addEventListener("click", (event) => {
            event.stopPropagation();
            const postId = likeButton.dataset.postId;

            if (likeButton.dataset.isLiked) {
                removeLike({ token: getToken(), postId });
            } else {
                setLike({ token: getToken(), postId });
            }

            renderPostsPageComponent({ appEl });
        })
    });
};
import { getToken } from "../index.js";
import { setLike, removeLike } from "../api.js";
import { renderPostsPageComponent } from "./posts-page-component.js";


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
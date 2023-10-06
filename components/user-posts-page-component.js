import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";

export function renderUserPostsPageComponent({ appEl }) {

    const appPosts = posts.map((post) => {
        return {
            userImageUrl: post.user.imageUrl,
            userName: post.user.name,
            userId: post.user.id,
            imageUrl: post.imageUrl,
            description: post.description,
            userLogin: post.user.login,
            date: new Date(post.createdAt),
            likes: post.likes.length,
            isLiked: post.isLiked,
            id: post.id,
        }
    })
    /**
     * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
     * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
     */
    const postsHtml = appPosts.map((element, index) => {
        return `
      <div class="page-container">
        <div class="header-container"></div>
        <ul class="posts">
          <li class="post" data-index=${index}>
            <div class="post-header" data-user-id="${element.userId}">
                <img src="${element.userImageUrl}" class="post-header__user-image">
                <p class="post-header__user-name">${element.userName}</p>
            </div>
            <div class="post-image-container">
              <img class="post-image" src="${element.imageUrl}">
            </div>
            <div class="post-likes">
              <button data-post-id="${element.id}" class="like-button">
                <img src="./assets/images/like-active.svg">
              </button>
              <p class="post-likes-text">
                Нравится: <strong>${element.likes}</strong>
              </p>
            </div>
            <p class="post-text">
              <span class="user-name">${element.userName}</span>
              ${element.description}
            </p>
            <p class="post-date">
              ${element.date}
            </p>
          </li>                  
        </ul>
      </div>`
    });

    appEl.innerHTML = postsHtml;

    renderHeaderComponent({
        element: document.querySelector(".header-container"),
    });

    for (let userEl of document.querySelectorAll(".post-header")) {
        userEl.addEventListener("click", () => {
            goToPage(USER_POSTS_PAGE, {
                userId: userEl.dataset.userId,
            });
        });
    }
}
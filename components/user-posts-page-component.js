import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../main.js";
import { likeEventListener, likedUsers } from "./like-component.js";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";

export function renderUserPostsPageComponent({ appEl }) {

  const appPosts = posts.map((post) => {
    return {
      userImageUrl: post.user.imageUrl,
      userName: post.user.name,
      userId: post.user.id,
      imageUrl: post.imageUrl,
      description: post.description,
      userLogin: post.user.login,
      date: formatDistanceToNow(new Date(post.createdAt), { locale: ru }),
      likes: post.likes,
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
                <button data-post-id="${element.id}" data-like="${element.isLiked ? 'true' : ''}" data-index="${index}" class="like-button">
                  <img src="${element.isLiked ? `./assets/images/like-active.svg` : `./assets/images/like-not-active.svg`}">
                </button>
                <p class="post-likes-text">
                Нравится: ${likedUsers({ elementLikesLength: element.likes.length, elementLikes: element.likes[0] })}
                </p>
              </div>
              <p class="post-text">
                <span class="user-name">${element.userName}</span>
                ${element.description}
              </p>
              <p class="post-date">
              ${element.date} назад
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

  likeEventListener();
}
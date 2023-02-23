const SHOW_COMMENTS_STEP = 5;

const commentList = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('#social__comment')
  .content
  .querySelector('.social__comment');

const commentsCountElement = document.querySelector('.current-comments-count');
const commentsAmountElement = document.querySelector('.comments-count');
const loadCommentsBtn = document.querySelector('.comments-loader');

let shownCommentsCount = 0;
let photoComments = [];

const hideLoadCommentsBtn = () => {
  loadCommentsBtn.classList.add('visually-hidden');
};

const addComments = (comments) => {
  const commentsListFragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__text').textContent = comment.message;
    commentsListFragment.appendChild(commentElement);
  });
  commentList.appendChild(commentsListFragment);
};

const showCommentList = (comments) => {
  photoComments = comments;

  const commentsAmount = photoComments.length;
  commentsAmountElement.textContent = commentsAmount.toString();

  if (commentsAmount < SHOW_COMMENTS_STEP) {
    addComments(photoComments.slice(shownCommentsCount, shownCommentsCount + commentsAmount));
    commentsCountElement.textContent = (shownCommentsCount + commentsAmount).toString();
    shownCommentsCount = shownCommentsCount + commentsAmount;
    hideLoadCommentsBtn();
    return;
  }

  addComments(photoComments.slice(shownCommentsCount, shownCommentsCount + SHOW_COMMENTS_STEP));
  commentsCountElement.textContent = (shownCommentsCount + SHOW_COMMENTS_STEP).toString();
  shownCommentsCount = shownCommentsCount + SHOW_COMMENTS_STEP;
};

const clearCommentList = () => {
  commentList.innerHTML = '';
  shownCommentsCount = 0;
  photoComments = [];
  loadCommentsBtn.classList.remove('visually-hidden');
};

const onLoadCommentsClick = (evt) => {
  evt.preventDefault();

  if (shownCommentsCount +  SHOW_COMMENTS_STEP >= photoComments.length) {
    addComments(photoComments.slice(shownCommentsCount));
    commentsCountElement.textContent = (photoComments.length).toString();
    shownCommentsCount = photoComments.length;
    hideLoadCommentsBtn();
    return;
  }

  addComments(photoComments.slice(shownCommentsCount, shownCommentsCount + SHOW_COMMENTS_STEP));
  commentsCountElement.textContent = (shownCommentsCount + SHOW_COMMENTS_STEP).toString();
  shownCommentsCount = shownCommentsCount + SHOW_COMMENTS_STEP;
};

loadCommentsBtn.addEventListener('click', onLoadCommentsClick);

export {showCommentList, clearCommentList};

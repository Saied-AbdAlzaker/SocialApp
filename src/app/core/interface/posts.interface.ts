export interface PostList {
  success: boolean;
  message: string;
  data: Data;
  meta: Meta;
}

interface Meta {
  pagination: Pagination;
}

interface Pagination {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
  total: number;
}

interface Data {
  posts: Post[];
}

export interface Post {
  _id: string;
  body?: string;
  image?: string;
  privacy: string;
  user: User;
  sharedPost: SharedPost | null;
  likes: string[];
  createdAt: string;
  commentsCount: number;
  topComment: TopComment;
  sharesCount: number;
  likesCount: number;
  isShare: boolean;
  id: string;
  bookmarked: boolean;
}

interface TopComment {
  _id: string;
  content: string;
  commentCreator: User;
  post: string;
  parentComment: null;
  likes: any[];
  createdAt: string;
  image: string;
}

interface SharedPost {
  _id: string;
  body: string;
  image: string;
  privacy: string;
  user: User;
  sharedPost: null;
  likes: string[];
  createdAt: string;
  commentsCount: number;
  topComment: null;
  sharesCount: number;
  likesCount: number;
  isShare: boolean;
  id: string;
}

interface User {
  _id: string;
  name: string;
  username: string;
  photo: string;
}

// Single Post
export interface SinglePostResponse {
  success: boolean;
  message: string;
  data: Data;
}

interface Data {
  post: SinglePost;
}

export interface SinglePost {
  _id: string;
  body: string;
  privacy: string;
  user: User;
  sharedPost: null;
  likes: any[];
  createdAt: string;
  commentsCount: number;
  topComment: TopCommentPost;
  sharesCount: number;
  likesCount: number;
  isShare: boolean;
  id: string;
  bookmarked: boolean;
  image: string;
}

interface TopCommentPost {
  _id: string;
  content: string;
  commentCreator: UserPost;
  post: string;
  parentComment: null;
  likes: any[];
  createdAt: string;
}

export interface UserPost {
  _id: string;
  name: string;
  username: string;
  photo: string;
}
// bookmark post
export interface BookMarkPost {
  success: boolean;
  message: string;
  data: bookmark;
}

interface bookmark {
  bookmarked: boolean;
  bookmarksCount: number;
}
// like post
export interface LikePost {
  success: boolean;
  message: string;
  data: Data;
}

interface Data {
  liked: boolean;
  likesCount: number;
  post: SinglePost;
}
// Share post
export interface SharePostRes {
  success: boolean;
  message: string;
  data: Data;
}

interface Data {
  post: SinglePost;
}

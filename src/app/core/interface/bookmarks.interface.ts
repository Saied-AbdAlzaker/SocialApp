export interface BookmarksResponse {
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
  limit: number;
  total: number;
  numberOfPages: number;
  nextPage: number;
}

interface Data {
  bookmarks: Bookmark[];
}

export interface Bookmark {
  _id: string;
  body: string;
  privacy: string;
  user: User;
  sharedPost: null;
  likes: string[];
  createdAt: string;
  commentsCount: number;
  topComment: TopComment | TopComment2 | TopComment3 | null;
  sharesCount: number;
  likesCount: number;
  isShare: boolean;
  id: string;
  bookmarked: boolean;
  image?: string;
}

interface TopComment3 {
  _id: string;
  content: string;
  commentCreator: User;
  post: string;
  parentComment: null;
  likes: any[];
  createdAt: string;
  image?: string;
}

interface TopComment2 {
  _id: string;
  content: string;
  image: string;
  commentCreator: User;
  post: string;
  parentComment: null;
  likes: any[];
  createdAt: string;
}

interface TopComment {
  _id: string;
  content: string;
  commentCreator: User;
  post: string;
  parentComment: null;
  likes: string[];
  createdAt: string;
  image: string;
}

interface User {
  _id: string;
  name: string;
  username: string;
  photo: string;
}

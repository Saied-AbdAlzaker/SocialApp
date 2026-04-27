export interface CommentResponse {
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
}

interface Data {
  comments: Comment[];
}

export interface Comment {
  _id: string;
  content?: string;
  commentCreator: CommentCreator;
  post: string;
  parentComment: null;
  likes: any[];
  createdAt: string;
  repliesCount: number;
  image?: string;
}

// comment
export interface SingleCommentResponse {
  success: boolean;
  message: string;
  data: Data;
}

interface Data {
  comment: SingleComment;
}

interface SingleComment {
  _id: string;
  content: string;
  commentCreator: CommentCreator;
  post: string;
  parentComment: null;
  likes: any[];
  createdAt: string;
  likesCount: number;
  isReply: boolean;
  id: string;
}

interface CommentCreator {
  _id: string;
  name: string;
  username: string;
  photo: string;
  followersCount: number;
  followingCount: number;
  bookmarksCount: number;
  id: string;
}

// Like Comment
export interface LikeCommentResponse {
  success: boolean;
  message: string;
  data: Data;
}

interface Data {
  liked: boolean;
  likesCount: number;
  comment: SingleComment;
}

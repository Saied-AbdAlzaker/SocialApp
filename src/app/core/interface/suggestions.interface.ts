export interface SuggestionsResponse {
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
  suggestions: Suggestion[];
}

export interface Suggestion {
  _id: string;
  name: string;
  username: string;
  photo: string;
  mutualFollowersCount: number;
  followersCount: number;
}

// Follow UnFollow
export interface FollowUnFollowResponse {
  success: boolean;
  message: string;
  data: FollowUnFollow;
}

export interface FollowUnFollow {
  following: boolean;
  followersCount: number;
}
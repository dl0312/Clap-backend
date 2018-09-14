export const typeDefs = ["type Achievement {\n  id: Int!\n  name: String!\n  condition: String!\n  achievers: [User]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype AddCategoryResponse {\n  ok: Boolean!\n  error: String\n  categoryId: Int\n}\n\ntype Mutation {\n  AddCategory(name: String!, parentIds: [Int], childrenIds: [Int]): AddCategoryResponse!\n  DeleteCategory(categoryId: Int!): DeleteCategoryResponse!\n  EditCategory(categoryId: Int!, parentIds: [Int], childrenIds: [Int], name: String!): EditCategoryResponse!\n  SendClap(postId: Int!): SendClapResponse!\n  UnClap(postId: Int!): SendClapResponse!\n  AddComment(postId: Int!, parentCommentId: Int, body: String!, level: Int!): AddCommentResponse!\n  DeleteComment(commentId: Int!): DeleteCommentResponse!\n  EditComment(commentId: Int!, body: String!): EditCommentResponse!\n  AddExchange(productId: Int!): AddExchangeResponse!\n  UploadPostImage(file: Upload!): UploadPostImageResponse!\n  UploadShownImage(file: Upload!): UploadShownImageResponse!\n  SendMessage(text: String!, receiverId: Int!): SendMessageResponse!\n  AddPost(title: String!, categoryId: Int!, body: String!): AddPostResponse!\n  DeletePost(postId: Int!): DeletePostResponse!\n  EditPost(postId: Int!, title: String, categoryId: Int, body: String): EditPostResponse!\n  AddProduct(name: String!, price: Int!, categoryId: Int!): AddProductResponse!\n  DeleteProduct(productId: Int!): DeleteProductResponse!\n  EditProduct(productId: Int!, name: String, price: Int, stock: Int, categoryId: Int): EditProductResponse!\n  CompleteEmailVerification(key: String!): CompleteEmailVerificationResponse!\n  CompletePhoneVerification(phoneNumber: String!, key: String!): CompletePhoneVerificationResponse!\n  EmailSignIn(email: String!, password: String!): EmailSignInResponse!\n  EmailSignUp(nickName: String!, email: String!, password: String!, phoneNumber: String!): EmailSignUpResponse!\n  FacebookConnect(firstName: String!, lastName: String!, nickName: String!, email: String, fbId: String!): FacebookConnectResponse!\n  FollowUser(userId: Int!): FollowUserResponse!\n  GoogleConnect(firstName: String!, lastName: String!, nickName: String!, email: String, googleId: String!): GoogleConnectResponse!\n  RequestEmailVerification: RequestEmailVerificationResponse!\n  StartPhoneVerification(phoneNumber: String!): StartPhoneVerificationResponse!\n  UnfollowUser(userId: Int!): UnfollowUserResponse!\n  UpdateMyProfile(email: String, firstName: String, lastName: String, nickName: String, age: Int, gender: String, password: String, profilePhoto: String): UpdateMyProfileResponse!\n  AddWikiImage(categoryId: Int!, name: String, shownImageId: Int!, hoverImage: String!): AddWikiImageResponse!\n  DeleteWikiImage(wikiImageId: Int!): DeleteWikiImageResponse!\n  EditWikiImage(wikiImageId: Int!, categoryId: Int, name: String, shownImageId: Int, hoverImage: String): EditWikiImageResponse!\n}\n\ntype DeleteCategoryResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype EditCategoryResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype GetAllCategoriesResponse {\n  ok: Boolean!\n  error: String\n  categories: [Category]\n}\n\ntype Query {\n  GetAllCategories: GetAllCategoriesResponse!\n  GetCategoriesByIds(categoriesIds: [Int]): GetCategoriesByIdsResponse!\n  GetCategoriesByKeyword(keyword: String!): GetCategoriesByKeywordResponse!\n  GetCategoryById(categoryId: Int!): GetCategoryByIdResponse!\n  GetCommentsByPostId(postId: Int!): GetCommentsByPostIdResponse!\n  GetMyExchanges: GetMyExchangesResponse!\n  GetImage(path: String!): GetImageResponse!\n  GetReceivedMessages: GetReceivedMessagesResponse!\n  GetSendMessages: GetSendMessagesResponse!\n  GetAllPosts(limit: Int!): GetAllPostsResponse!\n  GetMyPosts: GetMyPostsResponse!\n  GetPostById(postId: Int!): GetPostByIdResponse!\n  GetPostsByKeyword(searchType: String!, keyword: String!): GetPostsByKeywordResponse!\n  GetAllProducts: GetAllProductsResponse!\n  GetProductById(productId: Int!): GetProductByIdResponse!\n  GetProductsByCategory(categoryId: Int!): GetProductsByCategoryResponse!\n  GetMyFollowing: GetMyFollowingResponse!\n  GetMyProfile: GetMyProfileResponse!\n  GetWikiImageById(wikiImageId: Int!): GetWikiImageByIdResponse!\n}\n\ntype GetCategoriesByIdsResponse {\n  ok: Boolean!\n  error: String\n  categories: [Category]\n}\n\ntype GetCategoriesByKeywordResponse {\n  ok: Boolean!\n  error: String\n  categories: [Category]\n}\n\ntype GetCategoryByIdResponse {\n  ok: Boolean!\n  error: String\n  category: Category\n}\n\ntype Category {\n  id: Int!\n  name: String!\n  parent: [Category]\n  children: [Category]\n  wikiImages: [WikiImage]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype SendClapResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Clap {\n  id: Int!\n  senderId: Int\n  sender: User!\n  receiverId: Int\n  receiver: User!\n  postId: Int\n  post: Post\n  wikiImageId: Int\n  wikiImage: WikiImage\n  createdAt: String!\n  updatedAt: String\n}\n\ntype UnClapResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype AddCommentResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype DeleteCommentResponse {\n  ok: Boolean\n  error: String\n}\n\ntype EditCommentResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype GetCommentsByPostIdResponse {\n  ok: Boolean!\n  error: String\n  comments: [Comment]\n}\n\ntype Comment {\n  id: Int!\n  body: String!\n  userId: Int\n  user: User!\n  postId: Int\n  post: Post!\n  parentComment: Comment\n  childrenComments: [Comment]\n  level: Int!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype AddExchangeResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype GetMyExchangesResponse {\n  ok: Boolean!\n  error: String\n  exchanges: [Exchange]\n}\n\ntype Exchange {\n  id: Int!\n  buyerId: Int\n  buyer: User!\n  productId: Int\n  product: Product!\n}\n\ntype GetImageResponse {\n  ok: Boolean!\n  error: String\n  image: String\n}\n\ntype PostImage {\n  id: Int!\n  url: String!\n  user: User\n  userId: Int!\n  post: Post\n  postId: Int\n  createdAt: String!\n  updatedAt: String\n}\n\nscalar Upload\n\ntype UploadPostImageResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype ShownImage {\n  id: Int!\n  url: String!\n  user: User\n  userId: Int!\n  wikiImage: WikiImage\n  wikiImageId: Int\n  createdAt: String!\n  updatedAt: String\n}\n\ntype UploadShownImageResponse {\n  ok: Boolean!\n  error: String\n  shownImage: ShownImage\n}\n\ntype GetReceivedMessagesResponse {\n  ok: Boolean!\n  error: String\n  messages: [Message]\n}\n\ntype GetSendMessagesResponse {\n  ok: Boolean!\n  error: String\n  messages: [Message]\n}\n\ntype SendMessageResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Message {\n  id: Int!\n  text: String!\n  senderId: Int!\n  sender: User!\n  receiverId: Int!\n  receiver: User!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Notification {\n  id: Int!\n  receiverId: Int!\n  receiver: User!\n  type: String!\n  postOfFollowers: Post\n  commentOnMyPost: Comment\n  commentOnMyComment: Comment\n  createdAt: String!\n  updatedAt: String\n}\n\ntype AddPostResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype DeletePostResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype EditPostResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype GetAllPostsResponse {\n  ok: Boolean!\n  error: String\n  posts: [Post]\n}\n\ntype GetMyPostsResponse {\n  ok: Boolean!\n  error: String\n  posts: [Post]\n}\n\ntype GetPostByIdResponse {\n  ok: Boolean!\n  error: String\n  post: Post\n  isClapped: Boolean\n}\n\ntype GetPostsByKeywordResponse {\n  ok: Boolean!\n  error: String\n  filterdPosts: [Post]\n}\n\ntype Post {\n  id: Int!\n  title: String!\n  body: String\n  userId: Int!\n  user: User!\n  claps: [Clap]\n  clapsCount: Int\n  comments: [Comment]\n  commentsCount: Int\n  category: Category\n  categoryId: Int!\n  view: Int!\n  wikiImages: [WikiImage]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype AddProductResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype DeleteProductResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype EditProductResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype GetAllProductsResponse {\n  ok: Boolean!\n  error: String\n  products: [Product]\n}\n\ntype GetProductByIdResponse {\n  ok: Boolean!\n  error: String\n  product: Product\n}\n\ntype GetProductsByCategoryResponse {\n  ok: Boolean!\n  error: String\n  products: [Product]\n}\n\ntype Product {\n  id: Int!\n  name: String!\n  price: Int!\n  stock: Int!\n  exchanges: [Exchange]\n  categoryId: Int!\n  category: Category!\n  createdAt: String!\n  updatedAt: String!\n}\n\ntype CompleteEmailVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype CompletePhoneVerificationResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype EmailSignInResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype EmailSignUpResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype FacebookConnectResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype FollowUserResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype GetMyFollowingResponse {\n  ok: Boolean!\n  error: String\n  following: [User]\n}\n\ntype GetMyProfileResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype GoogleConnectResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype RequestEmailVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype User {\n  id: Int!\n  email: String\n  verifiedEmail: Boolean!\n  firstName: String\n  lastName: String\n  nickName: String!\n  fullName: String\n  age: Int\n  gender: String\n  password: String\n  phoneNumber: String\n  verifiedPhoneNumber: Boolean!\n  profilePhoto: String\n  fbId: String\n  googleId: String\n  messagesAsSender: [Message]\n  messagesAsReceiver: [Message]\n  certification: Boolean\n  exp: Int!\n  clapPoint: Int!\n  following: [User]\n  followers: [User]\n  followersCount: Int\n  followingCount: Int\n  achievements: [Achievement]\n  posts: [Post]\n  exchanges: [Exchange]\n  clapsAsSender: [Clap]\n  clapsAsReceiver: [Clap]\n  clapsAsReceiverCount: Int\n  comments: [Comment]\n  notificationsAsReceiver: [Notification]\n  wikiImages: [WikiImage]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype StartPhoneVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype UnfollowUserResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype UpdateMyProfileResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Verification {\n  id: Int!\n  target: String!\n  payload: String!\n  key: String!\n  verified: Boolean!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype AddWikiImageResponse {\n  ok: Boolean\n  error: String\n  wikiImageId: Int\n}\n\ntype DeleteWikiImageResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype EditWikiImageResponse {\n  ok: Boolean\n  error: String\n}\n\ntype GetWikiImageByIdResponse {\n  ok: Boolean!\n  error: String\n  wikiImage: WikiImage\n}\n\ntype WikiImage {\n  id: Int!\n  name: String\n  userId: Int!\n  user: User!\n  category: Category!\n  categoryId: Int!\n  shownImageId: Int\n  shownImage: ShownImage\n  hoverImage: String!\n  posts: [Post]\n  postsCount: Int!\n  claps: [Clap]\n  clapsCount: Int!\n  createdAt: String!\n  updatedAt: String\n}\n"];
/* tslint:disable */

export interface Query {
  GetAllCategories: GetAllCategoriesResponse;
  GetCategoriesByIds: GetCategoriesByIdsResponse;
  GetCategoriesByKeyword: GetCategoriesByKeywordResponse;
  GetCategoryById: GetCategoryByIdResponse;
  GetCommentsByPostId: GetCommentsByPostIdResponse;
  GetMyExchanges: GetMyExchangesResponse;
  GetImage: GetImageResponse;
  GetReceivedMessages: GetReceivedMessagesResponse;
  GetSendMessages: GetSendMessagesResponse;
  GetAllPosts: GetAllPostsResponse;
  GetMyPosts: GetMyPostsResponse;
  GetPostById: GetPostByIdResponse;
  GetPostsByKeyword: GetPostsByKeywordResponse;
  GetAllProducts: GetAllProductsResponse;
  GetProductById: GetProductByIdResponse;
  GetProductsByCategory: GetProductsByCategoryResponse;
  GetMyFollowing: GetMyFollowingResponse;
  GetMyProfile: GetMyProfileResponse;
  GetWikiImageById: GetWikiImageByIdResponse;
}

export interface GetCategoriesByIdsQueryArgs {
  categoriesIds: Array<number> | null;
}

export interface GetCategoriesByKeywordQueryArgs {
  keyword: string;
}

export interface GetCategoryByIdQueryArgs {
  categoryId: number;
}

export interface GetCommentsByPostIdQueryArgs {
  postId: number;
}

export interface GetImageQueryArgs {
  path: string;
}

export interface GetAllPostsQueryArgs {
  limit: number;
}

export interface GetPostByIdQueryArgs {
  postId: number;
}

export interface GetPostsByKeywordQueryArgs {
  searchType: string;
  keyword: string;
}

export interface GetProductByIdQueryArgs {
  productId: number;
}

export interface GetProductsByCategoryQueryArgs {
  categoryId: number;
}

export interface GetWikiImageByIdQueryArgs {
  wikiImageId: number;
}

export interface GetAllCategoriesResponse {
  ok: boolean;
  error: string | null;
  categories: Array<Category> | null;
}

export interface Category {
  id: number;
  name: string;
  parent: Array<Category> | null;
  children: Array<Category> | null;
  wikiImages: Array<WikiImage> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface WikiImage {
  id: number;
  name: string | null;
  userId: number;
  user: User;
  category: Category;
  categoryId: number;
  shownImageId: number | null;
  shownImage: ShownImage | null;
  hoverImage: string;
  posts: Array<Post> | null;
  postsCount: number;
  claps: Array<Clap> | null;
  clapsCount: number;
  createdAt: string;
  updatedAt: string | null;
}

export interface User {
  id: number;
  email: string | null;
  verifiedEmail: boolean;
  firstName: string | null;
  lastName: string | null;
  nickName: string;
  fullName: string | null;
  age: number | null;
  gender: string | null;
  password: string | null;
  phoneNumber: string | null;
  verifiedPhoneNumber: boolean;
  profilePhoto: string | null;
  fbId: string | null;
  googleId: string | null;
  messagesAsSender: Array<Message> | null;
  messagesAsReceiver: Array<Message> | null;
  certification: boolean | null;
  exp: number;
  clapPoint: number;
  following: Array<User> | null;
  followers: Array<User> | null;
  followersCount: number | null;
  followingCount: number | null;
  achievements: Array<Achievement> | null;
  posts: Array<Post> | null;
  exchanges: Array<Exchange> | null;
  clapsAsSender: Array<Clap> | null;
  clapsAsReceiver: Array<Clap> | null;
  clapsAsReceiverCount: number | null;
  comments: Array<Comment> | null;
  notificationsAsReceiver: Array<Notification> | null;
  wikiImages: Array<WikiImage> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Message {
  id: number;
  text: string;
  senderId: number;
  sender: User;
  receiverId: number;
  receiver: User;
  createdAt: string;
  updatedAt: string | null;
}

export interface Achievement {
  id: number;
  name: string;
  condition: string;
  achievers: Array<User> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Post {
  id: number;
  title: string;
  body: string | null;
  userId: number;
  user: User;
  claps: Array<Clap> | null;
  clapsCount: number | null;
  comments: Array<Comment> | null;
  commentsCount: number | null;
  category: Category | null;
  categoryId: number;
  view: number;
  wikiImages: Array<WikiImage> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Clap {
  id: number;
  senderId: number | null;
  sender: User;
  receiverId: number | null;
  receiver: User;
  postId: number | null;
  post: Post | null;
  wikiImageId: number | null;
  wikiImage: WikiImage | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Comment {
  id: number;
  body: string;
  userId: number | null;
  user: User;
  postId: number | null;
  post: Post;
  parentComment: Comment | null;
  childrenComments: Array<Comment> | null;
  level: number;
  createdAt: string;
  updatedAt: string | null;
}

export interface Exchange {
  id: number;
  buyerId: number | null;
  buyer: User;
  productId: number | null;
  product: Product;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  exchanges: Array<Exchange> | null;
  categoryId: number;
  category: Category;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: number;
  receiverId: number;
  receiver: User;
  type: string;
  postOfFollowers: Post | null;
  commentOnMyPost: Comment | null;
  commentOnMyComment: Comment | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface ShownImage {
  id: number;
  url: string;
  user: User | null;
  userId: number;
  wikiImage: WikiImage | null;
  wikiImageId: number | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface GetCategoriesByIdsResponse {
  ok: boolean;
  error: string | null;
  categories: Array<Category> | null;
}

export interface GetCategoriesByKeywordResponse {
  ok: boolean;
  error: string | null;
  categories: Array<Category> | null;
}

export interface GetCategoryByIdResponse {
  ok: boolean;
  error: string | null;
  category: Category | null;
}

export interface GetCommentsByPostIdResponse {
  ok: boolean;
  error: string | null;
  comments: Array<Comment> | null;
}

export interface GetMyExchangesResponse {
  ok: boolean;
  error: string | null;
  exchanges: Array<Exchange> | null;
}

export interface GetImageResponse {
  ok: boolean;
  error: string | null;
  image: string | null;
}

export interface GetReceivedMessagesResponse {
  ok: boolean;
  error: string | null;
  messages: Array<Message> | null;
}

export interface GetSendMessagesResponse {
  ok: boolean;
  error: string | null;
  messages: Array<Message> | null;
}

export interface GetAllPostsResponse {
  ok: boolean;
  error: string | null;
  posts: Array<Post> | null;
}

export interface GetMyPostsResponse {
  ok: boolean;
  error: string | null;
  posts: Array<Post> | null;
}

export interface GetPostByIdResponse {
  ok: boolean;
  error: string | null;
  post: Post | null;
  isClapped: boolean | null;
}

export interface GetPostsByKeywordResponse {
  ok: boolean;
  error: string | null;
  filterdPosts: Array<Post> | null;
}

export interface GetAllProductsResponse {
  ok: boolean;
  error: string | null;
  products: Array<Product> | null;
}

export interface GetProductByIdResponse {
  ok: boolean;
  error: string | null;
  product: Product | null;
}

export interface GetProductsByCategoryResponse {
  ok: boolean;
  error: string | null;
  products: Array<Product> | null;
}

export interface GetMyFollowingResponse {
  ok: boolean;
  error: string | null;
  following: Array<User> | null;
}

export interface GetMyProfileResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
}

export interface GetWikiImageByIdResponse {
  ok: boolean;
  error: string | null;
  wikiImage: WikiImage | null;
}

export interface Mutation {
  AddCategory: AddCategoryResponse;
  DeleteCategory: DeleteCategoryResponse;
  EditCategory: EditCategoryResponse;
  SendClap: SendClapResponse;
  UnClap: SendClapResponse;
  AddComment: AddCommentResponse;
  DeleteComment: DeleteCommentResponse;
  EditComment: EditCommentResponse;
  AddExchange: AddExchangeResponse;
  UploadPostImage: UploadPostImageResponse;
  UploadShownImage: UploadShownImageResponse;
  SendMessage: SendMessageResponse;
  AddPost: AddPostResponse;
  DeletePost: DeletePostResponse;
  EditPost: EditPostResponse;
  AddProduct: AddProductResponse;
  DeleteProduct: DeleteProductResponse;
  EditProduct: EditProductResponse;
  CompleteEmailVerification: CompleteEmailVerificationResponse;
  CompletePhoneVerification: CompletePhoneVerificationResponse;
  EmailSignIn: EmailSignInResponse;
  EmailSignUp: EmailSignUpResponse;
  FacebookConnect: FacebookConnectResponse;
  FollowUser: FollowUserResponse;
  GoogleConnect: GoogleConnectResponse;
  RequestEmailVerification: RequestEmailVerificationResponse;
  StartPhoneVerification: StartPhoneVerificationResponse;
  UnfollowUser: UnfollowUserResponse;
  UpdateMyProfile: UpdateMyProfileResponse;
  AddWikiImage: AddWikiImageResponse;
  DeleteWikiImage: DeleteWikiImageResponse;
  EditWikiImage: EditWikiImageResponse;
}

export interface AddCategoryMutationArgs {
  name: string;
  parentIds: Array<number> | null;
  childrenIds: Array<number> | null;
}

export interface DeleteCategoryMutationArgs {
  categoryId: number;
}

export interface EditCategoryMutationArgs {
  categoryId: number;
  parentIds: Array<number> | null;
  childrenIds: Array<number> | null;
  name: string;
}

export interface SendClapMutationArgs {
  postId: number;
}

export interface UnClapMutationArgs {
  postId: number;
}

export interface AddCommentMutationArgs {
  postId: number;
  parentCommentId: number | null;
  body: string;
  level: number;
}

export interface DeleteCommentMutationArgs {
  commentId: number;
}

export interface EditCommentMutationArgs {
  commentId: number;
  body: string;
}

export interface AddExchangeMutationArgs {
  productId: number;
}

export interface UploadPostImageMutationArgs {
  file: Upload;
}

export interface UploadShownImageMutationArgs {
  file: Upload;
}

export interface SendMessageMutationArgs {
  text: string;
  receiverId: number;
}

export interface AddPostMutationArgs {
  title: string;
  categoryId: number;
  body: string;
}

export interface DeletePostMutationArgs {
  postId: number;
}

export interface EditPostMutationArgs {
  postId: number;
  title: string | null;
  categoryId: number | null;
  body: string | null;
}

export interface AddProductMutationArgs {
  name: string;
  price: number;
  categoryId: number;
}

export interface DeleteProductMutationArgs {
  productId: number;
}

export interface EditProductMutationArgs {
  productId: number;
  name: string | null;
  price: number | null;
  stock: number | null;
  categoryId: number | null;
}

export interface CompleteEmailVerificationMutationArgs {
  key: string;
}

export interface CompletePhoneVerificationMutationArgs {
  phoneNumber: string;
  key: string;
}

export interface EmailSignInMutationArgs {
  email: string;
  password: string;
}

export interface EmailSignUpMutationArgs {
  nickName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface FacebookConnectMutationArgs {
  firstName: string;
  lastName: string;
  nickName: string;
  email: string | null;
  fbId: string;
}

export interface FollowUserMutationArgs {
  userId: number;
}

export interface GoogleConnectMutationArgs {
  firstName: string;
  lastName: string;
  nickName: string;
  email: string | null;
  googleId: string;
}

export interface StartPhoneVerificationMutationArgs {
  phoneNumber: string;
}

export interface UnfollowUserMutationArgs {
  userId: number;
}

export interface UpdateMyProfileMutationArgs {
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  nickName: string | null;
  age: number | null;
  gender: string | null;
  password: string | null;
  profilePhoto: string | null;
}

export interface AddWikiImageMutationArgs {
  categoryId: number;
  name: string | null;
  shownImageId: number;
  hoverImage: string;
}

export interface DeleteWikiImageMutationArgs {
  wikiImageId: number;
}

export interface EditWikiImageMutationArgs {
  wikiImageId: number;
  categoryId: number | null;
  name: string | null;
  shownImageId: number | null;
  hoverImage: string | null;
}

export interface AddCategoryResponse {
  ok: boolean;
  error: string | null;
  categoryId: number | null;
}

export interface DeleteCategoryResponse {
  ok: boolean;
  error: string | null;
}

export interface EditCategoryResponse {
  ok: boolean;
  error: string | null;
}

export interface SendClapResponse {
  ok: boolean;
  error: string | null;
}

export interface AddCommentResponse {
  ok: boolean;
  error: string | null;
}

export interface DeleteCommentResponse {
  ok: boolean | null;
  error: string | null;
}

export interface EditCommentResponse {
  ok: boolean;
  error: string | null;
}

export interface AddExchangeResponse {
  ok: boolean;
  error: string | null;
}

export type Upload = any;

export interface UploadPostImageResponse {
  ok: boolean;
  error: string | null;
}

export interface UploadShownImageResponse {
  ok: boolean;
  error: string | null;
  shownImage: ShownImage | null;
}

export interface SendMessageResponse {
  ok: boolean;
  error: string | null;
}

export interface AddPostResponse {
  ok: boolean;
  error: string | null;
}

export interface DeletePostResponse {
  ok: boolean;
  error: string | null;
}

export interface EditPostResponse {
  ok: boolean;
  error: string | null;
}

export interface AddProductResponse {
  ok: boolean;
  error: string | null;
}

export interface DeleteProductResponse {
  ok: boolean;
  error: string | null;
}

export interface EditProductResponse {
  ok: boolean;
  error: string | null;
}

export interface CompleteEmailVerificationResponse {
  ok: boolean;
  error: string | null;
}

export interface CompletePhoneVerificationResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface EmailSignInResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface EmailSignUpResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface FacebookConnectResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface FollowUserResponse {
  ok: boolean;
  error: string | null;
}

export interface GoogleConnectResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface RequestEmailVerificationResponse {
  ok: boolean;
  error: string | null;
}

export interface StartPhoneVerificationResponse {
  ok: boolean;
  error: string | null;
}

export interface UnfollowUserResponse {
  ok: boolean;
  error: string | null;
}

export interface UpdateMyProfileResponse {
  ok: boolean;
  error: string | null;
}

export interface AddWikiImageResponse {
  ok: boolean | null;
  error: string | null;
  wikiImageId: number | null;
}

export interface DeleteWikiImageResponse {
  ok: boolean;
  error: string | null;
}

export interface EditWikiImageResponse {
  ok: boolean | null;
  error: string | null;
}

export interface UnClapResponse {
  ok: boolean;
  error: string | null;
}

export interface PostImage {
  id: number;
  url: string;
  user: User | null;
  userId: number;
  post: Post | null;
  postId: number | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Verification {
  id: number;
  target: string;
  payload: string;
  key: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string | null;
}

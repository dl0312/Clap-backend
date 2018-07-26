# clap-server

Server for the CLAP, GraphQL, TypeScript, NodeJS

## Resolvers

### Public Resolvers:

- [x] Sign In / Sign Up with Facebook
- [x] Sign In with Email
- [x] Start Phone Number Verification
- [x] Complete Phone Number Verification
- [x] Sign Up with Email

---

### Authentication:

- [x] Generate JWT
- [x] Verify JWT

### Private Resolvers:

- [x] **User**
  - [x] _Query_
    - [x] Get My Profile
    - [x] Get My Followers ( Implemented on GetMyProfile )
    - [x] Get My Following
  - [x] _Mutation_
    - [x] Request Email Verification
    - [x] Complete Email Verification
    - [x] Update my Profile
    - [x] Follow User
    - [x] Unfollow User
- [x] **Post**
  - [x] _Query_
    - [x] Get All Posts
    - [x] Search by Keyword ( Title, Body, Both )
    - [x] Get My Posts
  - [x] _Mutation_
    - [x] Add Post
    - [x] Edit Post
    - [x] Delete Post
- [x] **Comment**
  - [x] _Query_
    - [x] Get Comments by Post
  - [x] _Mutation_
    - [x] Add Comment On Post
    - [x] Add Commnet On Comment
    - [x] Edit Comment
    - [x] Delete Comment
- [x] **Clap**
  - [x] _Query_
    - [x] Check My Sended Claps ( Implemented on GetMyProfile )
    - [x] Check My Received Claps For Each Posts ( Implemented on GetMyProfile )
  - [x] _Mutation_
    - [x] Send Clap to Post
- [ ] **Image**
  - [ ] _Query_
  - [ ] _Mutation_
    - [x] Add Image
    - [ ] Edit Image
    - [ ] Delete Image
- [ ] **Category**
  - [x] _Query_
  - [x] _Mutation_
    - [x] Add Category ( need to implement level )
    - [x] Edit Category ( need to fix )
    - [x] Delete Category
- [x] **Message**
  - [x] _Query_
    - [x] Check Received Messages
    - [x] Check Send Messages
  - [x] _Mutation_
    - [x] Send a Message
- [ ] **Achievement**
  - [ ] _Query_
    - [ ] Check How Many Users Achieve
  - [ ] _Mutation_
- [ ] **Product**
  - [ ] _Query_
    - [x] Get All Products
    - [ ] Get All Products with Game Category
    - [ ] Get Specific Product ( Get Product By ID)
  - [x] _Mutation_
    - [x] Add Product
    - [x] Edit Product
    - [x] Delete Product( need to? )
    - [x] Purchase Product (= Add Exchange)
- [x] **Exchange**
  - [x] _Query_
    - [x] Get My Exchanges
  - [x] _Mutation_
    - [x] Add Exchange

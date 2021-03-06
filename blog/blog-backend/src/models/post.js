import mongoose from 'mongoose';

const { Schema } = mongoose;

// 스키마 생성
const PostSchema = new Schema({
   title: String,
   body: String,
   tags: [String], // 문자열로 이루어진 배열
   publishedDate: {
      type: Date,
      default: Date.now, // 현재 날짜를 기본값으로 지정
   },
   // 포스트에서도 이제 로그인해야만 작성할 수 있고, 삭제와 수정은 작성자만 할 수 있도록 구현하기 위함
   user: {
      _id: mongoose.Types.ObjectId,
      username: String,
   },
});

// 모델 생성
const Post = mongoose.model('Post', PostSchema);
export default Post;

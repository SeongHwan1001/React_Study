import Post from '../../models/post';
import mongoose from 'mongoose';
import Joi from 'joi';

const { ObjectId } = mongoose.Types;

export const getPostById = async (ctx, next) => {
   const { id } = ctx.params;
   if (!ObjectId.isValid(id)) {
      ctx.status = 400; // Bad Request
      return;
   }
   try {
      const post = await Post.findById(id);
      // 포스트가 존재하지 않을 때
      if (!post) {
         ctx.status = 404; // Not Found
         return;
      }
      ctx.state.post = post;
      return next();
   } catch (e) {
      ctx.throw(500, e);
   }
   return next();
};

/* 포스트 작성
POST /api/posts
{
   title: '제목',
   body: '내용',
   tags: ['태그1', '태그2']
}
*/
export const write = async ctx => {
   const schema = Joi.object().keys({
      // 객체가 다음 필드를 가지고 있음을 검증
      title: Joi.string().required(), // required()가 있으면 필수 항목
      body: Joi.string().required(),
      tags: Joi.array()
         .items(Joi.string())
         .required(), // 문자열로 이루어진 배열
   });

   // 검증하고 나서 검증 실패인 경우 에러 처리
   const result = Joi.validate(ctx.request.body, schema);
   if (result.error) {
      ctx.status = 400; // Bad Request
      ctx.body = result.error;
      return;
   }
   const { title, body, tags } = ctx.request.body;
   const post = new Post({
      title,
      body,
      tags,
      user: ctx.state.user,
   });
   try {
      await post.save();
      ctx.body = post;
   } catch (e) {
      ctx.throw(500, e);
   }
};

/* 포스트 목록 조회
GET /api/posts
GET /api/posts?username=&tag=&page=
*/
// export const list = async ctx => {
//    try {
//       const posts = await Post.find().exec();
//       ctx.body = posts;
//    } catch (e) {
//       ctx.throw(500, e);
//    }
// };
// 포스트를 역순으로 불러오기
export const list = async ctx => {
   // query는 문자열이기 때문에 숫자로 변환해 주어야 한다.
   // 값이 주어지지 않았다면 1을 기본으로 사용한다.
   const page = parseInt(ctx.query.page || '1', 10);

   if (page < 1) {
      ctx.status = 400; // Bad Request
      return;
   }

   const { tag, username } = ctx.query;
   // tag, username 값이 유효하면 객체 안에 넣고, 그렇지 않으면 넣지 않음
   const query = {
      ...(username ? { 'user.username': username } : {}),
      ...(tag ? { tag: tag } : {}),
   };

   try {
      const posts = await Post.find()
         .sort({ _id: -1 }) // 역순으로 불러오기
         .limit(10) // 10개의 데이터만 불러오기
         .skip((page - 1) * 10) // page 처리를 위해 사용

         // 이 함수를 사용하면 데이터를 처음부터 JSON형태로 조회 가능하다.
         // 그러면 아래에서 인스턴스 형태를 json 형태로 변환을 해서 사용하지 않아도 된다.
         // .lean()

         .exec();

      // 마지막 페이지 번호 알려주기
      const postCount = await Post.countDocuments(query).exec();
      ctx.set('Last-Page', Math.ceil(postCount / 10));

      // lean()을 사용한 방식
      // ctx.body = posts.map(post => ({
      //    ...post,
      //    body:
      //       post.body.length < 200 ? post.body : `${post.body.slice(0, 200)}...`,
      // }))

      // body(내용)의 길이를 제한.
      ctx.body = posts
         // find()로 불러온 문서는 인스턴스의 형태이기 때문에 바로 변형 불가능 하다.
         // 그러므로 toJSON() 함수를 실행하여 JSON 형태로 변환한 뒤 필요한 변형을 한다.
         .map(post => post.toJSON()) // 현 post들을 toJSON 형태로 변환
         .map(post => ({
            ...post, // body만 변형 하기 때문에 나머지는 보존해야 되기 때문
            body:
               post.body.length < 200
                  ? post.body
                  : `${post.body.slice(0, 200)}...`, // 200자가 넘으면 뒤에 ...을 붙여줌
         }));
   } catch (e) {
      ctx.throw(500, e);
   }
};

/* 특정 포스트 조회
GET /api/posts/:id
*/
export const read = ctx => {
   ctx.body = ctx.state.post;
};

/* 특정 포스트 제거
DELETE /api/posts/:id
*/
export const remove = async ctx => {
   const { id } = ctx.params;
   try {
      await (await Post.findByIdAndRemove(id)).exec();
      ctx.status = 204; // No Content(성공하기는 했지만 응답할 데이터는 없음)
   } catch (e) {
      ctx.throw(500, e);
   }
};

/* 포스트 수정(교체)
PUT /api/posts/:id
{title, body}
 */
export const replace = ctx => {};

/* 포스트 수정(특정 필드 변경)
PATCH /api/posts/:id
{
   title: '수정',
   body: '수정 내용',
   tags: ['수정', '태그']
}
*/
export const update = async ctx => {
   const { id } = ctx.params;
   // write에서 사용한 schema와 비슷한데, required()가 없습니다.
   const schema = Joi.object().keys({
      title: Joi.string(),
      body: Joi.string(),
      tags: Joi.array().items(Joi.string()),
   });

   // 검증하고 나서 검증 실패인 경우 에러 처리
   const result = Joi.validate(ctx.request.body, schema);
   if (result.error) {
      ctx.status = 400; // Bad Request
      ctx.body = result.error;
      return;
   }

   try {
      const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
         new: true, // 이 값을 설정하면 업데이트된 데이터를 반환
         // false일 떄는 업데이트 되기 전의 데이터를 반환한다.
      }).exec();
      if (!post) {
         ctx.status = 404;
         return;
      }
      ctx.body = post;
   } catch (e) {
      ctx.throw(500, e);
   }
};

// 로그인 중인 사용자가 작성한 포스트인지 확인
export const checkOwnPost = (ctx, next) => {
   const { user, post } = ctx.state;
   if (post.user._id.toString() !== user._id) {
      ctx.status = 403;
      return;
   }
   return next();
};

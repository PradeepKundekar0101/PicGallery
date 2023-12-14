"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const s3_1 = require("../aws/s3");
const post_1 = require("../model/post");
class PostService {
    getAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield post_1.Post.find();
            for (const post of posts) {
                const image_name = post.image_name;
                post.image_url = yield (0, s3_1.getObjectURL)(image_name);
            }
            return posts;
        });
    }
    createPost(content, file) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const imageName = yield (0, s3_1.putObjectURL)(file);
                const post = new post_1.Post({ content: content, image_name: imageName });
                yield post.save();
                return post;
            }
            catch (error) {
                console.log(error.message);
                return null;
            }
        });
    }
    deletePost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postFound = yield post_1.Post.findById(postId);
                if (!postFound)
                    return null;
                yield (0, s3_1.deleteObject)(postFound.image_name);
                yield postFound.deleteOne();
                return {};
            }
            catch (error) {
                console.log(error.message);
            }
        });
    }
}
exports.default = new PostService();

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.createPost = exports.getAllPosts = void 0;
const post_1 = __importDefault(require("../services/post"));
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield post_1.default.getAllPosts();
        res.status(200).send({ data: posts });
    }
    catch (error) {
        res.status(500).json({ data: "Error" });
    }
});
exports.getAllPosts = getAllPosts;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file)
            return;
        const response = yield post_1.default.createPost(req.body.content, req.file);
        res.json({ response });
    }
    catch (error) {
    }
});
exports.createPost = createPost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.params.postId)
            res.status(404).json({ data: "PostId Not found" });
        const response = yield post_1.default.deletePost(req.params.postId);
        if (!response) {
            res.status(404).json({ data: "Post with this id was not found" });
        }
        res.status(200).json({ data: "Deleted" });
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.deletePost = deletePost;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const PostSchema = new mongoose_1.default.Schema({
    content: {
        type: String,
        min: [3, "content must be of atleast 3 characters"],
        required: true
    },
    image_name: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});
const Post = mongoose_1.default.model("Post", PostSchema);
exports.Post = Post;

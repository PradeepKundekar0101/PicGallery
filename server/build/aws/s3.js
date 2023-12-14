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
exports.deleteObject = exports.putObjectURL = exports.getObjectURL = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const aws_1 = require("../config/aws");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const sharp_1 = __importDefault(require("sharp"));
const getObjectURL = (key) => __awaiter(void 0, void 0, void 0, function* () {
    const command = new client_s3_1.GetObjectCommand({
        Key: key,
        Bucket: process.env.BUCKET_NAME
    });
    const url = yield (0, s3_request_presigner_1.getSignedUrl)(aws_1.s3Client, command);
    return url;
});
exports.getObjectURL = getObjectURL;
const putObjectURL = (file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imageName = "uploads/user/image-" + Date.now();
        //resize the image
        const buffer = yield (0, sharp_1.default)(file.buffer).resize({ height: 1920, width: 1080, fit: "contain" }).toBuffer();
        const uploadParams = {
            Bucket: process.env.BUCKET_NAME,
            Body: buffer,
            Key: imageName,
            ContentType: file.mimetype,
        };
        yield aws_1.s3Client.send(new client_s3_1.PutObjectCommand(uploadParams));
        return imageName;
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.putObjectURL = putObjectURL;
const deleteObject = (key) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const command = new client_s3_1.DeleteObjectCommand({
            Key: key,
            Bucket: process.env.BUCKET_NAME
        });
        yield aws_1.s3Client.send(command);
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.deleteObject = deleteObject;

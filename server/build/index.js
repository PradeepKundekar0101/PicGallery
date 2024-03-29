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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const post_1 = __importDefault(require("./routes/post"));
const mongoose_1 = __importDefault(require("mongoose"));
const multer_1 = __importDefault(require("multer"));
const post_2 = require("./controllers/post");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const MONGOURI = process.env.MONGO_URI;
        yield mongoose_1.default.connect(MONGOURI);
        console.log("DB connected");
    }
    catch (error) {
        console.log(error.message);
    }
});
connect();
const PORT = process.env.PORT || 8080;
app.get("/", (req, res) => { res.send("Hello from the backend"); });
app.post("/api/v1/post", upload.single("image"), post_2.createPost);
app.use("/api/v1/post", post_1.default);
app.listen(PORT, () => {
    console.log("Server is up and running at PORT " + PORT);
});

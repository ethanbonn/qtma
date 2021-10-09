"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const mongoose_1 = __importDefault(require("mongoose"));
require("./firebase");
const PORT = 2001;
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
const uri = "mongodb+srv://qtma:qtma@cluster0.eehgg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose_1.default
    .connect(uri)
    .then(() => app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)))
    .catch((error) => {
    throw error;
});
//# sourceMappingURL=index.js.map
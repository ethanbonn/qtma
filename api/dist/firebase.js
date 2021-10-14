"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("firebase/app");
const auth_1 = require("firebase/auth");
const admin = __importStar(require("firebase-admin"));
const auth = (0, auth_1.getAuth)();
// var admin = require("firebase-admin");
// var serviceAccount = require("path/to/serviceAccountKey.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://qtma.firebaseio.com",
});
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDr1eu1rM33xz0Jq3AcO7j-mPOlA7YMuTg",
    authDomain: "qtma-94a76.firebaseapp.com",
    projectId: "qtma-94a76",
    storageBucket: "qtma-94a76.appspot.com",
    messagingSenderId: "503941208323",
    appId: "1:503941208323:web:a3cc2e22cadf36e0ec7136",
    measurementId: "G-PWJZFSZFLF",
};
// Initialize Firebase
const app = (0, app_1.initializeApp)(firebaseConfig);
//# sourceMappingURL=firebase.js.map
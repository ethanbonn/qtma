"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typegoose_1 = require("@typegoose/typegoose");
/**
 *  - Email
 - User Name
 - Password
 - First Name
 - Last Name
 - Profile Pic (Link) -> maybe move to cdn later
Job Title
 - Professional Summary / User Description
 - Links: (Linkedin, github, portfolio website, other)
 - Skills
 - Interests
 */
class UserProfile {
}
__decorate([
    (0, typegoose_1.prop)({ required: true })
], UserProfile.prototype, "firstName", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true })
], UserProfile.prototype, "lastName", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, unique: true })
], UserProfile.prototype, "email", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, unique: true })
], UserProfile.prototype, "userName", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true })
], UserProfile.prototype, "password", void 0);
__decorate([
    (0, typegoose_1.prop)()
], UserProfile.prototype, "profilePicture", void 0);
__decorate([
    (0, typegoose_1.prop)()
], UserProfile.prototype, "description", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: [String] })
], UserProfile.prototype, "links", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: [String] })
], UserProfile.prototype, "skills", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: [String] })
], UserProfile.prototype, "interests", void 0);
const UserProfileModel = (0, typegoose_1.getModelForClass)(UserProfile);
//# sourceMappingURL=userModel.js.map
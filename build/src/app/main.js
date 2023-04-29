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
const schema_1 = require("./graphql/schema");
const apollo_server_express_1 = require("apollo-server-express");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const context_1 = require("./graphql/context");
const server = new apollo_server_express_1.ApolloServer({
    schema: schema_1.schema,
    context: context_1.context,
    introspection: true,
    cache: "bounded",
});
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
server.start().then(() => __awaiter(void 0, void 0, void 0, function* () {
    app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.send(200);
    }));
    server.applyMiddleware({
        app,
        path: "/graphql"
    });
    // listenToChainEvents();
    app.listen({ port: process.env.PORT || 3000 }, () => __awaiter(void 0, void 0, void 0, function* () {
        const host = process.env.HOST || 'localhost';
        const port = process.env.PORT || 3000;
        console.log(`GraphQL API running at http://${host}:${port}/graphql`);
    }));
}));

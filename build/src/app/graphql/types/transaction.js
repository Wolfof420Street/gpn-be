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
exports.TransactionMutation = exports.TransactionQuery = exports.Transaction = void 0;
const nexus_1 = require("nexus");
exports.Transaction = (0, nexus_1.objectType)({
    name: "Transaction",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.string("timestamp");
        t.nonNull.string("type");
        t.nonNull.string("txHash");
        t.nonNull.int("gasUsed");
        t.int("gasPrice");
        t.nonNull.int("gasLimit");
        t.nonNull.int("gasFee");
        t.string("link");
        t.nonNull.string("from");
    },
});
exports.TransactionQuery = (0, nexus_1.extendType)({
    type: "Query",
    definition(t) {
        t.list.field("transactions", {
            type: "Transaction",
            args: {
                address: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
            },
            resolve: (_root, { address }, ctx) => __awaiter(this, void 0, void 0, function* () {
                return yield ctx.prisma.transaction.findMany({
                    where: {
                        from: address,
                    },
                    orderBy: {
                        id: "desc",
                    },
                });
            })
        });
    }
});
exports.TransactionMutation = (0, nexus_1.extendType)({
    type: "Mutation",
    definition(t) {
        t.field("createTransaction", {
            type: "Transaction",
            args: {
                timestamp: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                type: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                txHash: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                gasUsed: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
                gasPrice: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
                gasLimit: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
                gasFee: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
                link: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                from: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
            },
            resolve: (_root, { timestamp, type, txHash, gasUsed, gasPrice, gasLimit, gasFee, link, from }, ctx) => __awaiter(this, void 0, void 0, function* () {
                return yield ctx.prisma.transaction.create({
                    data: {
                        timestamp,
                        type,
                        txHash,
                        gasUsed,
                        gasPrice,
                        gasLimit,
                        gasFee,
                        link,
                        from,
                    }
                });
            })
        });
    }
});

import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";

export const Transaction = objectType({
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

export const TransactionQuery = extendType({
    type: "Query",
    definition(t) {
        t.list.field("transactions", {
            type: "Transaction",
            args: {
                address: nonNull(stringArg()),
            },
            resolve: async (_root, { address }, ctx) => {
                return await ctx.prisma.transaction.findMany({
                    where: {
                        from: address,
                    },
                    orderBy: {
                        id: "desc",
                    },
                });
            }
        })
    }
});


export const TransactionMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("createTransaction", {
            type: "Transaction",
            args: {
                timestamp: nonNull(stringArg()),
                type: nonNull(stringArg()),
                txHash: nonNull(stringArg()),
                gasUsed: nonNull(intArg()),
                gasPrice: nonNull(intArg()),
                gasLimit: nonNull(intArg()),
                gasFee: nonNull(intArg()),
                link: nonNull(stringArg()),
                from: nonNull(stringArg()),
            },
            resolve: async (_root, { timestamp, type, txHash, gasUsed, gasPrice, gasLimit, gasFee, link, from }, ctx) => {
                return await ctx.prisma.transaction.create({
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
            }
        })
    }
});

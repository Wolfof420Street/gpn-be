
 

import { fieldAuthorizePlugin, makeSchema } from "nexus";
import { join } from "path";
import * as types from "../graphql/types";

export const schema = makeSchema({
    types,
    plugins: [fieldAuthorizePlugin()],
    outputs: {
        typegen: join(
            process.cwd(),
            "node_modules",
            "@types",
            "nexus-typegen",
            "index.d.ts"
        ),
        schema: join(process.cwd(), "src/app/graphql", "schema.graphql"),
    },
    contextType: {
        export: "Context",
        module: join(process.cwd(), "src/app/graphql", "context.ts"),
    },
});
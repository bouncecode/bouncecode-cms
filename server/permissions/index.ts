import { rule, shield, and, or, not } from "graphql-shield";

const rules = {
  isAuthorized: rule()(async (parent, args, ctx, info) => {
    return Boolean(ctx.user?.id);
  }),
  isAdmin: rule()(async (parent, args, ctx, info) => {
    return Boolean(ctx.user?.isAdmin);
  }),
};

const permissions = shield({
  Query: {
    user: rules.isAdmin,
    users: rules.isAdmin,
  },
  Mutation: {
    createBoard: rules.isAdmin,
    updateBoard: rules.isAdmin,
    deleteBoard: rules.isAdmin,
    createBoardItem: rules.isAdmin,
    updateBoardItem: rules.isAdmin,
    deleteBoardItem: rules.isAdmin,
    createPage: rules.isAdmin,
    updatePage: rules.isAdmin,
    deletePage: rules.isAdmin,
    createPopup: rules.isAdmin,
    updatePopup: rules.isAdmin,
    deletePopup: rules.isAdmin,
    createUser: rules.isAdmin,
    updateUser: rules.isAdmin,
  },
});

export default permissions;

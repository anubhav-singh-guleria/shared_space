import { v } from "convex/values"

import { query } from "./_generated/server"
import { favourite } from "./board";
import { getAllOrThrow } from "convex-helpers/server/relationships"
export const get = query({
    
    args: {
        orgId: v.string(),
        search: v.optional(v.string()),
        favourites: v.optional(v.string())
    },  

    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new Error('Unauthorized user!');
        }

        if(args.favourites){
            const favouriteBoards = await ctx.db
                                            .query("userFavourites")
                                            .withIndex("by_user_org", (q) => {
                                                return q.eq("userId", identity.subject)
                                                        .eq("orgId", args.orgId)
                                            }).order("asc").collect()

            const ids = favouriteBoards.map((b) => b.boardId);
            const boards = await getAllOrThrow(ctx.db, ids);

            return boards.map((board) => {
                return {
                    ...board,
                    isFavourite: true
                }
            })
        }


        const title = args.search as string;
        let boards = [];
        if(title){
            boards = await ctx.db.query("boards")
                                 .withSearchIndex("search_title", (q) => {
                                    return q.search("title",title)
                                            .eq("orgId", args.orgId)
                                 })
                                 .collect();
        }
        else{
            boards = await ctx.db
            .query("boards")
            .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
            .order("desc")
            .collect()
        }
            
        const boardsWithFavouriteRelation = boards.map((board) => {
            return ctx.db
                        .query("userFavourites")
                        .withIndex("by_user_board", (q) => {
                            return q.eq("userId", identity.subject).eq("boardId", board._id);
                        }).unique()
                        .then((favourite) => {
                            return {
                                ...board,
                                isFavaourite: !!favourite,
                            }
                        })
        })

        const boardsWithFavouriteBoolean = Promise.all(boardsWithFavouriteRelation);
        return boardsWithFavouriteBoolean;
    },
})
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const postToken = mutation({
  args: {
    email: v.string(),
    balance: v.number(),
  },
  handler: async (ctx, args) => {
    try {
      const { email, balance } = args;

      const userDoc = await ctx.db.query("token").filter(q => q.eq(q.field("email"), email)).first();
      
      if (userDoc) {
        await ctx.db.patch(userDoc._id, {
          balance: balance,
        });
      } else {
        await ctx.db.insert("token", {
          email: email,
          balance: balance,
        });
      }

      return { success: true, message: "Balance updated successfully" };
    } catch (error) {
      console.error("Error in postToken mutation:", error);
      return { success: false, message: "An error occurred" };
    }
  },
});

export const getBalanceByEmail = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const { email } = args;
      const userDoc = await ctx.db.query("token").filter(q => q.eq(q.field("email"), email)).first();

      if (userDoc) {
        return { success: true, balance: userDoc.balance };
      } else {
        return { success: false, message: "User not found" };
      }
    } catch (error) {
      console.error("Error in getBalanceByEmail query:", error);
      return { success: false, message: "An error occurred" };
    }
  },
});


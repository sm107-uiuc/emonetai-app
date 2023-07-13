import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { loadString, saveString } from "app/utils/storage"
import { PreferencesModel as Preferences } from "./Preferences"

export const UserStoreModel = types
  .model("UserStore")
  .props({
    isWelcome: types.optional(types.boolean, false),
    isOnBoarded: types.optional(types.boolean, false),
    name: types.optional(types.string, "Hatch King"),
    profilePicture: types.optional(types.string, ""),
    bio: types.optional(types.string, "This is a sample bio"),
    pushToken: types.optional(types.array(types.string),[]),
    preferences: types.optional(types.array(Preferences),[]),
    isregistered: types.optional(types.boolean, false),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    async setIsWelcome() {
        await saveString("@@isWelcome", "true")
        store.setProp("isWelcome", true);
    },
    async loadIsWelcome() {
        const isWelcome = await loadString("@@isWelcome")
        store.setProp("isWelcome", isWelcome === "true");
        console.tron.log("isWelcome", isWelcome === "true");
    },
    async setIsOnBoarded() {
      await saveString("user has onBoarded", "true")
      store.setProp("isOnBoarded", true);
  },
  async loadIsOnBoarded() {
      const isOnBoarded = await loadString("user has onBoarded")
      store.setProp("isOnBoarded", isOnBoarded === "true");
      console.tron.log("isOnBoarded", isOnBoarded === "true");
  },
    async clearIsWelcome() {
        await saveString("@@isWelcome", "false")
        store.setProp("isWelcome", false);
    }
  }));


export interface UserStore extends Instance<typeof UserStoreModel> {}
export interface UserStoreSnapshot extends SnapshotOut<typeof UserStoreModel> {}

// @demo remove-file

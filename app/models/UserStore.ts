import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { loadString, saveString } from "app/utils/storage"


export const UserStoreModel = types
  .model("UserStore")
  .props({
    isWelcome: types.optional(types.boolean, false),
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
    async clearIsWelcome() {
        await saveString("@@isWelcome", "false")
        store.setProp("isWelcome", false);
    }
  }));


export interface UserStore extends Instance<typeof UserStoreModel> {}
export interface UserStoreSnapshot extends SnapshotOut<typeof UserStoreModel> {}

// @demo remove-file

import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
export const PreferencesModel = types
  .model("Preferences")
  .props({
    interests: types.optional(types.array(types.string),[]),
    preferredFrequency: types.optional(types.number,2),
    preferredJournalTime: types.optional(types.array(types.Date),[])
  })
  .actions(withSetPropAction)
  .actions((store) => ({
  }));


export interface PreferencesStore extends Instance<typeof PreferencesModel> {}
export interface PreferencesStoreSnapshop extends SnapshotOut<typeof PreferencesModel> {}

// @demo remove-file

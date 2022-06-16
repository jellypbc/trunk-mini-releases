import type { WriteTransaction } from '@rocicorp/reflect';
import {
  initClientState,
  setCursor,
  setUsername,
  setAvatarURL,
  setTrunkIDs,
} from './client-state';
import {
  putItem,
  deleteItem,
  updateItemTitle,
  updateItemContent,
  updateItemArrows,
  updateItemSourceURL,
  updateItemAddSingleArrow,
  updateItemArrowsDeleteArrow,
  updateItemCreatedBy,
  updateItemWebSourceURL,
  updateItemPublicationDate,
} from './item';
import {
  putArrow,
  deleteArrow,
  updateArrowCreatedBy,
} from './arrow'

export type M = typeof serverMutators;

export const serverMutators = {
  initClientState,
  setCursor,
  createItem: putItem,
  deleteItem,
  updateItemTitle,
  updateItemContent,
  updateItemArrows,
  updateItemSourceURL,
  createArrow: putArrow,
  updateItemAddSingleArrow,
  deleteArrow,
  updateItemArrowsDeleteArrow,
  setUsername,
  setAvatarURL,
  setTrunkIDs,
  updateItemCreatedBy,
  updateArrowCreatedBy,
  updateItemWebSourceURL,
  updateItemPublicationDate,
  nop: async (_: WriteTransaction) => {},
};

export const clientMutators: M = {
  ...serverMutators
};


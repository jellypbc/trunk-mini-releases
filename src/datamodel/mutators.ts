import type { WriteTransaction } from "replicache";
import {
  initClientState,
  setCursor,
  overShape,
  selectShape,
} from "./client-state";
import {
  putShape,
  deleteShape,
  moveShape,
  resizeShape,
  rotateShape,
  initShapes,
} from "./shape";
import {
  putItem,
  deleteItem,
  updateItemTitle,
  updateItemContent,
  updateItemArrows,
  updateItemSourceURL,
  updateItemAddSingleArrow,
  updateItemArrowsDeleteArrow,
  initItems,
} from './item';
import {
  putArrow,
  deleteArrow
} from './arrow'

export type M = typeof mutators;

export const mutators = {
  createShape: putShape,
  deleteShape,
  moveShape,
  resizeShape,
  rotateShape,
  initClientState,
  setCursor,
  overShape,
  selectShape,
  initShapes,
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
  initItems,
  nop: async (_: WriteTransaction) => {},
};

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
  updateItemSourceURL
} from './item';
import {
  putArrow
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
  createArrow: putArrow,
  updateItemSourceURL,
  nop: async (_: WriteTransaction) => {},
};

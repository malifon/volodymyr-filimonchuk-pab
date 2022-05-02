import * as TagService from "../tags/tags.service";
import { isString, isArray, isNumber } from "../utils/validator.utils";
import { INote } from "./notes.modal";
import { readStorage, updateStorage } from "../utils/save.utils";
import { NOTES_FILE, TAGS_FILE } from "../constants";
import { ITag } from "../tags/tags.modal";

const isExistTag = async (item: ITag[] | undefined) => {
  let tags: ITag[] = await readStorage(TAGS_FILE);

  if (!item || item.length === 0) return;

  for (let i = 0; i < item.length; i++) {
    const element = item[i];
    const result = tags.filter((i) => i.name === element.name);

    if (result.length > 0) {
      await TagService.create(element);
    }
  }
};

export const create = async (newItem: INote): Promise<number | Error> => {
  let notes: INote[] = await readStorage(NOTES_FILE);

  if (!isString(newItem.title) || !isString(newItem.content)) {
    throw new Error("This format is invalid!");
  }

  if (newItem.createDate && !isString(newItem.createDate))
    throw new Error("Field createDate is invalid!");
  if (newItem.tags && !isArray(newItem.tags))
    throw new Error("Field tags is invalid!");

  isExistTag(newItem.tags);
  const id: number = +new Date();
  notes.push({ id, ...newItem });

  await updateStorage(NOTES_FILE, notes);
  return id;
};

export const get = async (id: number): Promise<INote | Error> => {
  let notes: INote[] = await readStorage(NOTES_FILE);

  const result = notes.filter((i) => i.id === id)[0];

  if (result) {
    return result;
  }
  throw new Error("This note not exist!");
};

export const getAll = async (): Promise<INote[]> => {
  return await readStorage(NOTES_FILE);
};

export const remove = async (id: number): Promise<undefined | Error> => {
  let notes: INote[] = await readStorage(NOTES_FILE);

  const result = notes.filter((i) => i.id === id)[0];

  if (result) {
    notes = notes.filter((i) => i.id !== id);
    await updateStorage(NOTES_FILE, notes);
    return;
  }
  throw new Error("This note not exist!");
};

export const edit = async (newItem: INote): Promise<INote | Error> => {
  if (
    !isString(newItem.title) ||
    !isString(newItem.content) ||
    !isNumber(newItem.id)
  ) {
    throw new Error("This format is invalid!");
  }

  if (newItem.createDate && !isString(newItem.createDate))
    throw new Error("Field createDate is invalid!");
  if (newItem.tags && !isArray(newItem.tags))
    throw new Error("Field tags is invalid!");

  isExistTag(newItem.tags);

  let notes: INote[] = await readStorage(NOTES_FILE);

  let result = notes.filter((i) => i.id === newItem.id)[0];

  if (result) {
    notes = notes.map((i) => (i.id !== newItem.id ? newItem : i));
    await updateStorage(NOTES_FILE, notes);

    return newItem;
  }
  throw new Error("This note not exist!");
};

import { ITag } from "../tags/tags.modal";

export interface INote {
  title: string;
  content: string;
  createDate?: Date;
  tags?: ITag[];
  id?: number;
  author?: string;
  isPrivate?: boolean;
  userToAccess?: string[];
}

import { ObjectId } from 'mongodb';

export const convertObjectIdToString = (id: ObjectId) => {
  return id.toString();
};

export const convertStringToObjectId = (uid: string) => {
  return ObjectId.createFromHexString(uid);
};


export type CommonReadOnlyAttributes = '_id' | 'createdAt' | 'updatedAt';

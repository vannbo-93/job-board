/** @format */

import { isValidObjectId } from "mongoose";
import { dbConnect } from "@/lib/db";
import { UserModel, type UserDoc } from "@/lib/models/user.model";
import type { Role, User } from "@/types";

type UserLean = UserDoc & { _id: { toString(): string } };

// Pick allowed fields by name. A new field added to the model
// (or passwordHash) can never leak through here.
function toUser(doc: UserLean): User {
  return {
    id: doc._id.toString(),
    email: doc.email,
    name: doc.name,
    role: doc.role as Role,
  };
}

export async function findUserById(id: string): Promise<User | null> {
  if (!isValidObjectId(id)) return null;
  await dbConnect();
  const user = await UserModel.findById(id).lean<UserLean>();
  return user ? toUser(user) : null;
}

export async function findUserByEmail(email: string): Promise<User | null> {
  await dbConnect();
  const user = await UserModel.findOne({
    email: email.trim().toLowerCase(),
  }).lean<UserLean>();
  return user ? toUser(user) : null;
}

// Only for checking a password at sign-in. Never pass the result to the UI.
export async function findUserByEmailWithPassword(
  email: string,
): Promise<(User & { passwordHash: string }) | null> {
  await dbConnect();
  const user = await UserModel.findOne({ email: email.trim().toLowerCase() })
    .select("+passwordHash")
    .lean<UserLean>();
  if (!user) return null;

  return { ...toUser(user), passwordHash: user.passwordHash };
}

export async function findAllUsers(): Promise<User[]> {
  await dbConnect();
  const users = await UserModel.find({})
    .sort({ createdAt: -1 })
    .lean<UserLean[]>();
  return users.map(toUser);
}

export async function findUsersByRole(role: Role): Promise<User[]> {
  await dbConnect();
  const users = await UserModel.find({ role }).lean<UserLean[]>();
  return users.map(toUser);
}

export async function saveNewUser(
  user: Omit<User, "id"> & { passwordHash: string },
): Promise<User> {
  await dbConnect();
  const created = await UserModel.create(user);
  return toUser(created.toObject() as UserLean);
}

import { User } from "./user.model";


export const findLastUserId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastUser?.id;
};


export const generateUseId = async (role: string) => {
  const lastownerId = await User.findOne({ role: "owner" }, { id: 1 })
    .sort({ id: -1 })
    .lean();
  const lastrenterId = await User.findOne({ role: "renter" }, { id: 1 })
    .sort({ id: -1 })
    .lean();

  let prefix = "";
  let currentId = 0;

  if (role === "renter") {
    prefix = "R";
    currentId = lastrenterId ? parseInt(lastrenterId.id.slice(1)) : 0;
  } else if (role === "owner") {
    prefix = "O";
    currentId = lastownerId ? parseInt(lastownerId.id.slice(1)) : 0;
  } else {
    throw new Error("Invalid user role");
  }

  const incrementedId = (currentId + 1).toString().padStart(4, "0");
  const generatedId = `${prefix}${incrementedId}`;

  return generatedId;
};


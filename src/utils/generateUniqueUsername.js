import { User } from "../models/user.model.js";
function slugifyName(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 10);
}

function randomDigits() {
  return Math.floor(1000 + Math.random() * 9000); // 4 digits
}
export async function generateUniqueUsername(name) {
  const base = slugifyName(name) || "user";
  let username;
  let exists = true;

  while (exists) {
    username = `${base}${randomDigits()}`;
    exists = await User.exists({ username });
  }

  return username;
}
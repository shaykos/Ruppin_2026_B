import bcrypt from 'bcrypt';
import argon2 from 'argon2';

let users = [];

export function getAllUsers(req, res) {
  return res.send({ users });
}

export async function addUser(req, res) {
  let data = req.body;
  data.password_bcrypt = await bcrypt.hash(data.password, 10);
  data.password_argon = await argon2.hash(data.password);

  delete data.password;

  users.push(data);
  return res.send({ msg: "DONE!" });
}

export async function loginUserBcrypt(req, res) {
  let data = req.body;

  let u = users.find(user => user.email == data.email);

  if (u == null) {
    return res.status(404).json({ msg: "user not found" });
  }

  let check = await bcrypt.compare(data.password, u.password_bcrypt);

  if (!check) {
    return res.status(401).json({ msg: "invalid credencials" });
  }

  return res.status(200).json({ msg: "login" });
}

export async function loginUserArgon2(req, res) {
  let data = req.body;

  let u = users.find(user => user.email == data.email);

  if (u == null) {
    return res.status(404).json({ msg: "user not found" });
  }

  let isValid = await argon2.verify(u.password_argon, data.password);

  if (!isValid) {
    return res.status(401).json({ msg: "invalid credencials" });
  }

  return res.status(200).json({ msg: "login" });
}

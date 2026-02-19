import { prisma } from "../utils/prisma.js";
import {
  createUser,
  findUserByEmail,
  listUsers,
  getUserById,
  deleteUser,
  UpdateUser,
} from "./users.service.js";
import { validateUser, validateUpdateUser } from "./users.validation.js";

export async function handleCreateUser(req, res) {
  try {
    const result = validateUser(req.body);

    if (!result.ok) {
      return res.status(400).json({
        message: "Validate failed",
        errors: result.errors,
      });
    }

    // Check if user already exists
    const existingUser = await findUserByEmail(req.body.email);
    if (existingUser) {
      return res.status(409).json({ message: "User already exist" });
    }

    // Create user
    const User = await createUser(req.body);
    return res.status(201).json(User);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
export async function handleListUsers(req, res) {
  try {
    const users = await listUsers();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
export async function handleGetUserById(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: " Missing user ID" });
    }
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
export async function handleDeleteUser(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Missing user ID" });
    }
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await deleteUser(id);

    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function UpdateUser(id, data) {
  return prisma.user.update({
    where: { id },
    data,
  });
}
export async function handleUpdateUser(req, res) {
  try {
    //
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Missing user ID" });
    }
    // Validate if user exists
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Validate user data
    const result = validateUpdateUser(req.body);
    if (!result.ok) {
      return res.status(400).json({
        message: "Validation failed",
        errors: result.errors,
      });
    }
    // Update user
    const updatedUser = await UpdateUser(id, result.data);
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
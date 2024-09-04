import { Request } from "express";
import { UserService } from "../services/user.service";
import { encryptPassword, response, serverError } from "../utils/common";
import * as mongoose from "mongoose";

const userServices = new UserService();

export const createUser = async (req: Request, res: any) => {
  try {
    const { email, password, username, profile } = req.body;

    const isUsernameExists = await userServices.getUser(
      { username },
      {},
      { lean: 1 }
    );
    if (isUsernameExists) {
      return response(res, true, 409, "Username already exists");
    }

    const encryptedPassword = await encryptPassword(password);
    const user = userServices.User({
      email,
      password: encryptedPassword,
      username,
      profile,
    });

    await userServices.create(user);

    return response(res, false, 200, "success", {
      message: "User created successfully",
    });
  } catch (error) {
    return serverError(res, error);
  }
};
export const getUsers = async (req: Request, res: any) => {
  try {
    const perPage = Number(req.query.perPage);
    const page = Number(req.query.page);

    const usersCount = await userServices.countDocuments();

    const data = await userServices.getUsersWithPagination({ page, perPage });

    return response(res, false, 200, "success", {
      data,
      totalPage: Math.ceil(usersCount / perPage),
      currentPage: page,
    });
  } catch (error) {
    return serverError(res, error);
  }
};
export const getUser = async (req: Request, res: any) => {
  try {
    const userId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(
      req.params.userId
    );

    const user = await userServices.getById(userId, {
      username: 1,
      email: 1,
      profile: 1,
      createdAt: 1,
    });

    if (!user) {
      return response(res, true, 404, "User not found");
    }

    return response(res, false, 200, "success", { user });
  } catch (error) {
    return serverError(res, error);
  }
};

export const updateUser = async (req: Request, res: any) => {
  try {
    const userId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(
      req.body.userId
    );
    const { email, age, birthDate, bio } = req.body.update;

    const isUserExists = await userServices.getUser({
      _id: userId,
      deletedAt: { $exists: false },
    });
    if (!isUserExists) {
      return response(res, true, 404, "User not found");
    }

    const user = await userServices.findByIdAndUpdate(
      userId,
      {
        $set: {
          email,
          "profile.birthDate": new Date(birthDate),
          "profile.bio": bio,
          "profile.age": age,
        },
      },
      { projection: { username: 1, email: 1, profile: 1 } }
    );

    return response(res, false, 200, "success", { user });
  } catch (error) {
    return serverError(res, error);
  }
};

export const deleteUser = async (req: Request, res: any) => {
  try {
    const userId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(
      req.body.userId
    );

    const isUserExists = await userServices.getUser({
      _id: userId,
      deletedAt: { $exists: false },
    });
    if (!isUserExists) {
      return response(res, true, 404, "User not found");
    }

    await userServices.delete(userId);

    return response(res, false, 200, "User deleted successfully");
  } catch (error) {
    return serverError(res, error);
  }
};

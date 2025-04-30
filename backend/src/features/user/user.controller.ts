import type { NextFunction, Request, Response } from "express";
import UserService from "@features/user/user.service.ts";

export default class UserController {
  constructor(private userService: UserService) {}

  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.id;
      const { email, password, username } = req.body;

      const updateData = { email, password, username };

      const user = await this.userService.updateUser(userId, updateData); // userId to update

      res.status(200).json({ message: "Updated user", data: user });
    } catch (error) {
      next(error);
    }
  };

  fetchUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: targetId } = req.params;
      const userId = req.user.id;

      const user = await this.userService.fetchUser(userId, targetId);

      res.status(200).json({ message: "Fetched user", data: user });
    } catch (error) {
      next(error);
    }
  };

  fetchSettings = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.id;

      const settings = await this.userService.fetchSettings(userId);

      res.status(200).json({ message: "Fetched settings", data: settings });
    } catch (error) {
      next(error);
    }
  };

  saveSettings = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.id;
      const settings = req.body;

      const response = await this.userService.saveSettings(userId, settings);

      res.status(200).json({ message: "Updated settings", data: response });
    } catch (error) {
      next(error);
    }
  };
}

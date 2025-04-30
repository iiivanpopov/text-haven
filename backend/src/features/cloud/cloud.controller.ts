import type { NextFunction, Request, Response } from "express";
import CloudService from "./cloud.service.ts";

class CloudController {
  constructor(private cloudService: CloudService) {}

  getStorage = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { id: folderId } = req.params;
    const userId = req.user.id;

    try {
      const storage = await this.cloudService.getStorage(
        userId,
        folderId as string | undefined,
      );
      res.status(200).json({ message: "Fetched storage", data: storage });
    } catch (error) {
      next(error);
    }
  };

  getLatestPosts = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const posts = await this.cloudService.getLatestPosts();
      res.status(200).json({ message: "Fetched latest posts", data: posts });
    } catch (error) {
      next(error);
    }
  };

  createFolder = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userId = req.user.id;
      const { name, parentId, exposure } = req.body;

      const folder = await this.cloudService.createFolder(
        userId,
        parentId,
        name,
        exposure,
      );
      res.status(201).json({ message: "Folder created", data: folder });
    } catch (error) {
      next(error);
    }
  };

  createFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.id;
      const { name, folderId, expiresAt, exposure, content, type } = req.body;
      const file = await this.cloudService.createFile(
        userId,
        folderId,
        content,
        name,
        exposure,
        type,
        expiresAt,
      );
      res.status(201).json({ message: "File created", data: file });
    } catch (error) {
      next(error);
    }
  };

  getFolders = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userId = req.user.id;
      const { parentId, targetUserId, folderId } = req.query;

      const data = await this.cloudService.getFoldersOrFolder(userId, {
        parentId: parentId as string,
        targetUserId: targetUserId as string,
        folderId: folderId as string,
      });

      res.status(200).json({ message: "Fetched folders", data });
    } catch (error) {
      next(error);
    }
  };

  getFilesOrFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.id;
      const { folderId, targetUserId, fileId } = req.query;

      const data = await this.cloudService.getFilesOrFile(userId, {
        folderId: folderId as string,
        targetUserId: targetUserId as string,
        fileId: fileId as string,
      });

      res.status(200).json({ message: "Fetched files", data });
    } catch (error) {
      next(error);
    }
  };

  getFileContent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const content = await this.cloudService.getFileContent(id, userId);
      res.status(200).json({ message: "Fetched file content", data: content });
    } catch (error) {
      next(error);
    }
  };

  deleteFolder = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const folders = await this.cloudService.deleteFolder(userId, id);
      res.status(200).json({ message: "Folder deleted", data: folders });
    } catch (error) {
      next(error);
    }
  };

  deleteFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.id;
      const { id } = req.params;

      const file = await this.cloudService.deleteFile(userId, id);
      res.status(200).json({ message: "File deleted", data: file });
    } catch (error) {
      next(error);
    }
  };

  updateFolder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const { body: payload } = req;

      const folder = await this.cloudService.updateFolder(userId, id, payload);
      res.status(200).json({ message: "Folder updated", data: folder });
    } catch (error) {
      next(error);
    }
  };

  updateFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { body: payload } = req;
      const userId = req.user.id;

      const file = await this.cloudService.updateFile(userId, id, payload);
      res.status(200).json({ message: "File updated", data: file });
    } catch (error) {
      next(error);
    }
  };

  updateFileContent = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const userId = req.user.id;

      const file = await this.cloudService.updateFileContent(
        userId,
        id,
        content,
      );
      res.status(200).json({ message: "File content updated", data: file });
    } catch (error) {
      next(error);
    }
  };
}

export default CloudController;

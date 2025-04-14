import { Router, Request, Response } from "express";
import { checkAuthentication } from "../helpers/auth";

const profileRouter = Router();

profileRouter.get('/', checkAuthentication, async (req: Request, res: Response) => {
    res.status(200).json({
        user: req.user,
    });
})

export default profileRouter;
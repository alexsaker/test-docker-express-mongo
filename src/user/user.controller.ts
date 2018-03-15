import { userModel, User } from "./user.model";

export class UserController {
  public static findAll(req, res): void {
    const conditions = req.params;
    userModel.find(conditions, (error, users: User[]) => {
      if (error) {
        res.status(500).json(error);
      } else {
        res.status(200).json(users);
      }
    });
  }

  public static findById(req, res): void {
    const userId = req.params.userId;
    userModel.findById(userId, (error, user: User) => {
      if (error) {
        res.status(500).json(error);
      } else {
        res.status(200).json(user);
      }
    });
  }

  public static save(req, res): void {
    const user = req.body as User;
    new userModel(user)
      .save()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => res.status(500).json(err));
  }
}

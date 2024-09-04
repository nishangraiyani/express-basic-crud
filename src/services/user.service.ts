import { User, UserModel } from "../models/user.model";
import { GenericService } from "./generic.service";

export class UserService extends GenericService<User> {
  constructor() {
    super(UserModel);
    this.model = UserModel;
  }

  User<T>(data: any) {
    return new this.model(data);
  }

  async getUser(query: object, projection: object = {}, option: object = {}) {
    return this.model.findOne(query, projection, option);
  }
  async getUsersWithPagination({
    page,
    perPage,
  }: {
    page: number;
    perPage: number;
  }) {
    return await this.model
      .find(
        { deletedAt: { $exists: false } },
        { username: 1, email: 1, fullName: "profile.fullName" }
      )
      .skip((page - 1) * perPage)
      .limit(perPage);
  }
}

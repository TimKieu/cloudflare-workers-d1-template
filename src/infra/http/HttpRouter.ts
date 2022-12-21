import { IRepositoryFactory } from "@/domain/factory/IRepositoryFactory";
import { UserController } from "@/infra/http/controller/UserController";
import { IHttp } from "@/infra/http/IHttp";
import { httpExample } from "@/infra/http/middleware/httpExample";

export class HttpRouter {
  private userController: UserController;

  constructor(
    readonly http: IHttp,
    readonly repositoryFactory: IRepositoryFactory
  ) {
    this.userController = new UserController(repositoryFactory);
  }

  init() {
    this.http.on("get", "/api/v1/users", () => this.userController.getUsers());

    this.http.on(
      "get",
      "/api/v1/users/:id",
      httpExample("first middleware"),
      httpExample("second middleware"),
      (request: Request) => this.userController.getUser(request)
    );

    this.http.on("post", "/api/v1/users", (request: Request) =>
      this.userController.createUser(request)
    );
  }
}

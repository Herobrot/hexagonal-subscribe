import { GetUserController } from "./infraestructure/controllers/getUserController";
import { GetUserUseCase } from "./application/getUserUseCase";
import { NotificacionNewUser } from "./infraestructure/rabbitMQ/NotificationNewUser";
import { NotificacionNewUserUseCase } from "./application/services/NotificationNewUser";

export const notificationNewUser = new NotificacionNewUser();

export const notificationNewUserUseCase = new NotificacionNewUserUseCase(
    notificationNewUser
);

export const getUserUseCase = new GetUserUseCase(
    notificationNewUserUseCase
)

export const getUserController = new GetUserController(
    getUserUseCase
)

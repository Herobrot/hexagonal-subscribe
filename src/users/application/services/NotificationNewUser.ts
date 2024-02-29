import { NotificacionNewUser } from "../../infraestructure/rabbitMQ/NotificationNewUser";
import { User } from "../../domain/user" ;
export class NotificacionNewUserUseCase{
    constructor(readonly notificationNewUser: NotificacionNewUser){}

    async run(user: User){
        return await this.notificationNewUser.sendNotification(user);
    }
}
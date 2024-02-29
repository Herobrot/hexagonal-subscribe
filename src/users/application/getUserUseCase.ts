import { NotificacionNewUserUseCase } from "./services/NotificationNewUser";
import { User } from "../domain/user"

export class GetUserUseCase{
    constructor(
        readonly notificationNewUser: NotificacionNewUserUseCase
    ){}

    async run(
        name: string,
        lastName: string,
        badgeNumber: string,
        password: string,
        role: string
     ): Promise<User | null> {
        try{
           const user = new User(
              name,
              lastName,
              badgeNumber,
              password,
              role
           );
           if(user){
            const publish = await this.notificationNewUser.run(user);
            if(publish)
                return user;
           }
           else{
            console.log("El usuario no es válido");
            return null
           }
           
           return null
        } catch (error){
           return null
        }
     }
}

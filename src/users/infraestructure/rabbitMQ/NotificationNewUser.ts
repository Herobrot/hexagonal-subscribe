import signale from "signale";
import { INotificationNewUser } from "../../domain/services/INotificationNewUser";
import { User } from "../../domain/user";
import amqplib from "amqplib";

export class NotificacionNewUser implements INotificationNewUser {
    private options: any;
    private url: any;
    private exch: any;

    constructor() {
        this.options = {
          vhost: process.env.AMQP_VHOST,
          username: process.env.AMQP_USERNAME,
          password: process.env.AMQP_PASSWORD,
          port: process.env.AMQP_PORT,
        };
        this.url = process.env.AMQP_URL;
        this.exch = process.env.AMQP_EX_UP;
      }
    
    async sendNotification(user: User): Promise<boolean> {
      const conn = await amqplib.connect(this.url, this.options);
        try {          
          const ch = await conn.createChannel()
          const result = ch.publish(this.exch, "", Buffer.from(JSON.stringify(user)));
          if(result){
            signale.success("Se ha publicado en el exchange a partir de la segunda API");
          }
          else{
            signale.fatal(new Error("Hubo una falla al publicar el usuario"));
          }

          return result
        } catch (error: any) {
          signale.fatal(new Error("Error al publicar el usuario"), + error.message);
          conn.close();
          return false;
        }
    }
}
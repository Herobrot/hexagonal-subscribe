import { GetUserUseCase } from "../../application/getUserUseCase";
import { Request, Response } from "express";
import WebSocketService  from "../../../config/webSocket";
import signale from "signale";

export class GetUserController{
    constructor(readonly getUserUseCase: GetUserUseCase){}

    async run(req: Request, res: Response){
        try {
            const user = await this.getUserUseCase.run(
                req.body.name,
                req.body.lastName,
                req.body.badgeNumber,
                req.body.password,
                req.body.role
            )
            if(!user){
                return res.status(401).json({
                    message: "El usuario no existe o no es válido"
                });
            }
            signale.success("El usuario es válido");
            
            const wsUrl = process.env.WS_URL!.toString();
            const webSocketService = new WebSocketService({ wsUrl: wsUrl });
        
            
        
            try {
                webSocketService.connect(user);

                if(webSocketService){
                    res.status(200).json({ message: 'Mensaje enviado al web socket' });
                }
                else{
                    res.status(500).json({ message: 'Hubo un error al procesar la solicitud' });
                }
            } catch(error: any) {
                signale.fatal(new Error('Error al enviar mensajes:'));
                res.status(500).json({ message: 'Hubo un error al procesar la solicitud', error: error.message });
            } 
        } catch (error: any) {
            signale.fatal(new Error("Error al obtener el usuario"), + error.message);
            return res.status(500).json({
                message: "Error al obtener el usuario"
            });
        }
    }
}
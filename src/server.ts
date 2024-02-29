import express, { Request, Response } from "express"
import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"
import signale from "signale"
import WebSocketService from "./config/webSocket"
import "dotenv/config"
import { getUserController } from "./users/dependencies"

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use(helmet())


app.post('/user', getUserController.run.bind(getUserController));

app.post('/', express.json(), async (req, res) => {
    const { message } = req.body;
    const wsUrl = process.env.WS_URL!.toString();
    const webSocketService = new WebSocketService({ wsUrl: wsUrl });

    webSocketService.connect();

    try {
        webSocketService.sendMessage(message);
        
        res.status(200).json({ message: 'Mensaje enviado al web socket' });
    } catch(error: any) {
        signale.fatal(new Error('Error al enviar mensajes:'));
        res.status(500).json({ message: 'Hubo un error al procesar la solicitud', error: error.message });
    } 
});

try{
    const port = process.env.PORT

    app.listen(port, ():void => {
        signale.success(`Servidor corriendo en el puerto ${port}`);
    });

} catch (error: any) {
    signale.fatal(new Error(error.message));
}

export default app;
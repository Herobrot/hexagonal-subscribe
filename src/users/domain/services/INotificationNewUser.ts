import { User } from "../user"

export interface INotificationNewUser {
    sendNotification(user: User): Promise<boolean>
}
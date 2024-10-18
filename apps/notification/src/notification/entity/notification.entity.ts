import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export enum NotificationStatus {
    pending,
    sent,
}

@Schema()
export class Notification extends Document{
    @Prop({
        required: true,
    })
    from: string;

    @Prop({
        required: true,
    })
    to: string;

    @Prop({
        required: true,
    })
    subject: string;

    @Prop({
        required: true,
    })
    content: string;

    @Prop({
        enum: NotificationStatus,
        default: NotificationStatus.pending,
    })
    status: NotificationStatus;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
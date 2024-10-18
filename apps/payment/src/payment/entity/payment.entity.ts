import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum PaymentStatus {
    pending = 'Pending',
    rejected = 'Rejected',
    approved = 'Approved',
}

export enum PaymentMethod {
    creditCard = 'CreditCard',
    kakao = 'Kakao'
}

export enum NotificationStatus {
    pending = 'pending',
    sent = 'sent',
}

@Entity()
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        enum: PaymentStatus,
        default: PaymentStatus.pending
    })
    paymentStatus: PaymentStatus;

    @Column({
        enum: PaymentMethod,
        default: PaymentMethod.creditCard,
    })
    paymentMethod: PaymentMethod;

    @Column()
    cardNumber: string;

    @Column()
    expiryYear: string;

    @Column()
    expiryMonth: string;

    @Column()
    birthOrRegistration: string;

    @Column()
    passwordTwoDigits: string;

    @Column({
        enum: NotificationStatus,
        default: NotificationStatus.pending,
    })
    notificationStatus: NotificationStatus;
}
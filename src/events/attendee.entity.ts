import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Event } from './event.entity';
import { Expose } from 'class-transformer';
import { User } from './../auth/user.entity';
import { PaginationResult } from './../pagination/paginator';

export enum AttendeeAnswerEnum{
    Accepted = 1,
    Maybe,
    Rejected
}
@Entity()
export class Attendee {
    @PrimaryGeneratedColumn()
    @Expose()
    id : number;

    @Column()
    @Expose()
    name : string;
    @ManyToOne(()=>Event, (event)=> event.attendees,{
        nullable: true
    })
    // @JoinColumn({
    //     name:'event_id'
    // })
    @JoinColumn()
    event : Event;

    @Column()
    eventId: number;

    @Column('enum',{
        enum:AttendeeAnswerEnum,
        default:AttendeeAnswerEnum.Accepted
    })
    @Expose()
    answer : AttendeeAnswerEnum;

    @ManyToOne(()=> User , user => user.attended)
    @Expose()
    user : User;
    @Column()
    userId: number;
}
export type PaginatedEvents = PaginationResult<Event>
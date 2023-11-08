import { Controller, Get, Param, ParseIntPipe, SerializeOptions } from "@nestjs/common";
import { AttendeesService } from "./attendees.service";

@Controller('/events/:evenId/attendees')
@SerializeOptions({ strategy: 'excludeAll' })
export class EventAttendeesController {
    constructor(
        private readonly attendeesService : AttendeesService
    ){}

    @Get()
    async findAll(@Param('evenId',ParseIntPipe) eventId:number){
        return await this.attendeesService.findByEventId(eventId)
    }
}
import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Room } from 'src/database/models/room.model';
import { Booking } from 'src/database/models/booking.model';
import { User } from 'src/database/models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Room, Booking, User])],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}

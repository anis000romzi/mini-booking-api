/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Room } from 'src/database/models/room.model';
import { Booking } from 'src/database/models/booking.model';
import { User } from 'src/database/models/user.model';
import { v4 as uuidv4 } from 'uuid';
import { GetAvailableDatesDto } from './dto/get-available-dates.dto';
import { GetAvailableRoomsDto } from './dto/get-available-rooms.dto';
import moment from 'moment';
import { Op } from 'sequelize';
import * as _ from 'lodash';
import { UpdateBookingStatusDto } from './dto/update-bookind-status.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking) private bookingModel: typeof Booking,
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Room) private roomModel: typeof Room,
  ) {}

  async createbooking(userId: string, payload: CreateBookingDto) {
    const { roomId, startAt, endAt } = payload;

    const user = await this.userModel.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const room = await this.roomModel.findOne({
      where: {
        id: roomId,
      },
    });
    if (!room) {
      throw new NotFoundException(`Room with id ${roomId} not found`);
    }

    if (!room.available) {
      throw new NotFoundException(
        `Room with id ${roomId} is currently unavailable`,
      );
    }

    if (!startAt || !endAt) {
      throw new BadRequestException('startAt and endAt must be provided');
    }
    const startMoment = moment(startAt);
    const endMoment = moment(endAt);
    if (!startMoment.isBefore(endMoment)) {
      throw new BadRequestException('startAt must be before endAt');
    }

    const overlappingBookings = await this.bookingModel.findAll({
      where: {
        roomId: room.id,
        status: 'booked',
        [Op.and]: [
          { startAt: { [Op.lte]: endMoment.toDate() } },
          { endAt: { [Op.gte]: startMoment.toDate() } },
        ],
      },
      attributes: ['id'],
      raw: true,
    });

    if (overlappingBookings.length > 0) {
      throw new BadRequestException(
        'Room is not available for the selected time range',
      );
    }

    const booking = await this.bookingModel.create({
      id: uuidv4(),
      userId,
      roomId,
      startAt,
      endAt,
      status: 'booked',
    });

    return booking;
  }

  async getAvailableDates(query: GetAvailableDatesDto) {
    const { roomId, startAt, endAt } = query;

    const room = await this.roomModel.findOne({
      where: {
        id: roomId,
      },
    });
    if (!room) {
      throw new NotFoundException(`Room with id ${roomId} not found`);
    }

    if (!room.available) {
      throw new NotFoundException(
        `Room with id ${roomId} is currently unavailable`,
      );
    }

    if (!startAt && !endAt) {
      throw new BadRequestException('startAt and endAt must be provided');
    }

    const startMoment = moment(startAt);
    const endMoment = moment(endAt);

    if (!startMoment.isBefore(endMoment)) {
      throw new BadRequestException('startAt must be before endAt');
    }

    const bookedDates = await this.bookingModel.findAll({
      where: {
        roomId: room.id,
        status: 'booked',
        [Op.and]: [
          { startAt: { [Op.lte]: endMoment.toDate() } },
          { endAt: { [Op.gte]: startMoment.toDate() } },
        ],
      },
      attributes: ['startAt', 'endAt', 'roomId'],
      raw: true,
    });

    const bookedRanges = bookedDates.map((b) => ({
      start: moment(b.startAt),
      end: moment(b.endAt),
    }));

    const availableIntervals: { start: string; end: string }[] = [];
    let current = startMoment.clone();

    while (current.isBefore(endMoment)) {
      const next = current.clone().add(1, 'hour');

      const isOverlapping = bookedRanges.some(
        (b) => current.isBefore(b.end) && next.isAfter(b.start),
      );

      if (!isOverlapping) {
        availableIntervals.push({
          start: current.toISOString(),
          end: next.toISOString(),
        });
      }

      current = next;
    }

    return {
      roomId,
      roomName: room.roomName,
      startAt,
      endAt,
      availableDates: availableIntervals,
    };
  }

  async getAvailableRooms(query: GetAvailableRoomsDto) {
    const { startAt, endAt } = query;

    if (!startAt || !endAt) {
      throw new BadRequestException('startAt and endAt must be provided');
    }

    const startMoment = moment(startAt);
    const endMoment = moment(endAt);

    if (!startMoment.isBefore(endMoment)) {
      throw new BadRequestException('startAt must be before endAt');
    }

    const allRooms = await this.roomModel.findAll({
      where: { available: true },
      raw: true,
    });

    const bookedRooms = await this.bookingModel.findAll({
      where: {
        status: 'booked',
        [Op.and]: [
          { startAt: { [Op.lte]: endMoment.toDate() } },
          { endAt: { [Op.gte]: startMoment.toDate() } },
        ],
      },
      attributes: ['roomId'],
      raw: true,
    });

    const bookedRoomIds = bookedRooms.map((b) => b.roomId);

    const availableRooms = allRooms.filter(
      (room) => !bookedRoomIds.includes(room.id),
    );

    return {
      startAt,
      endAt,
      availableRooms,
    };
  }

  async findOne(id: string) {
    const booking = await this.bookingModel.findOne({
      where: { id },
    });

    if (!booking) {
      throw new NotFoundException(`Booking with id ${id} not found`);
    }

    return booking;
  }

  async updateBookingStatus(id: string, payload: UpdateBookingStatusDto) {
    const { status } = payload;

    const booking = await this.bookingModel.findOne({
      where: { id },
    });
    if (!booking)
      throw new NotFoundException(`Booking with id ${id} not found`);

    booking.status = status;
    await booking.save();

    return await this.findOne(id);
  }

  private createWhere(conditions) {
    const { page, limit, order, orderBy, ...rest } = conditions; // eslint-disable-line
    const where = _.isEmpty(rest) ? {} : { [Op.and]: { ...rest } };
    return where;
  }
}

/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
  Get,
  Query,
  Param,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import type { Request } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { GetAvailableDatesDto } from './dto/get-available-dates.dto';
import { GetAvailableRoomsDto } from './dto/get-available-rooms.dto';
import { RolesGuard } from 'src/commons/guards/roles.guard';
import { Roles } from 'src/commons/decorators/roles.decorator';
import { UpdateBookingStatusDto } from './dto/update-bookind-status.dto';

@ApiBearerAuth()
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post('create-booking')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  createbooking(@Req() req: Request, @Body() payload: CreateBookingDto) {
    const userId = (req.user as any)?.id;
    return this.bookingService.createbooking(userId, payload);
  }

  @Get('get-available-dates')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  getAvailableDates(@Query() query: GetAvailableDatesDto) {
    return this.bookingService.getAvailableDates(query);
  }

  @Get('get-available-rooms')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  getAvailableRooms(@Query() query: GetAvailableRoomsDto) {
    return this.bookingService.getAvailableRooms(query);
  }

  // list all bookings

  @Get('update-status/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  updateBookingStatus(
    @Param('id') id: string,
    @Body() payload: UpdateBookingStatusDto,
  ) {
    return this.bookingService.updateBookingStatus(id, payload);
  }
}

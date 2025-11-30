/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from 'src/database/models/room.model';
import { InjectModel } from '@nestjs/sequelize';
import { v4 as uuidv4 } from 'uuid';
import * as _ from 'lodash';
import { Op } from 'sequelize';
import { QueryRoomDto } from './dto/query-room.dto';

@Injectable()
export class RoomService {
  constructor(@InjectModel(Room) private roomModel: typeof Room) {}

  async create(payload: CreateRoomDto) {
    const data = await this.roomModel.create({
      id: uuidv4(),
      roomName: payload.roomName,
      available: payload.available,
    });

    return data;
  }

  count(query?: QueryRoomDto): Promise<number> {
    return this.roomModel.count({ where: this.createWhere(query) });
  }

  async findAll(query?: QueryRoomDto) {
    const { page = 1, limit = 10, order, orderBy } = query || {};
    const findOptions: any = {
      where: this.createWhere(query),
      limit,
      offset: (page - 1) * limit,
    };

    if (orderBy && order) {
      findOptions.order = [[orderBy, order]];
    }

    return this.roomModel.findAll(findOptions);
  }

  async findOne(id: string) {
    const room = await this.roomModel.findOne({
      where: { id },
    });

    if (!room) {
      throw new NotFoundException(`Room with id ${id} not found`);
    }

    return room;
  }

  async update(id: string, payload: UpdateRoomDto) {
    const room = await this.roomModel.findOne({
      where: { id },
    });
    if (!room) throw new NotFoundException(`Room with id ${id} not found`);

    const newData: any = {};

    if (payload.roomName !== undefined) {
      newData['roomName'] = payload.roomName;
    }
    if (payload.available !== undefined) {
      newData['available'] = payload.available;
    }

    await room.update(newData);

    return await this.findOne(id);
  }

  async remove(id: string) {
    const room = await this.findOne(id);
    if (!room) throw new NotFoundException(`Room with id ${id} not found`);

    await room.destroy();

    return { message: `Room has been deleted` };
  }

  private createWhere(conditions) {
    const { page, limit, order, orderBy, ...rest } = conditions; // eslint-disable-line
    const where = _.isEmpty(rest) ? {} : { [Op.and]: { ...rest } };
    return where;
  }
}

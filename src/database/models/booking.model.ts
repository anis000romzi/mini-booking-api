import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  DefaultScope,
  ForeignKey,
  AllowNull,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Room } from './room.model';

@DefaultScope(() => ({
  attributes: { exclude: ['deletedAt'] },
  include: [],
}))
@Table({ timestamps: true, tableName: 'bookings' })
export class Booking extends Model {
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'user_id',
  })
  @ForeignKey(() => User)
  declare userId: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'room_id',
  })
  @ForeignKey(() => Room)
  declare roomId: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'room_name',
  })
  declare roomName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'customer_name',
  })
  declare customerName: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'start_at',
  })
  declare startAt: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'end_at',
  })
  declare endAt: string;

  @AllowNull(true)
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare status: 'booked' | 'done' | 'cancelled';

  @CreatedAt
  @Column({ field: 'created_at' })
  declare createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  declare updatedAt: Date;

  @DeletedAt
  @Column({ field: 'deleted_at', type: DataType.DATE })
  declare deletedAt?: Date | null;

  @BelongsTo(() => User)
  user?: User;

  @BelongsTo(() => Room)
  room?: Room;
}

import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  DefaultScope,
} from 'sequelize-typescript';

@DefaultScope(() => ({
  attributes: { exclude: ['deletedAt'] },
  include: [],
}))
@Table({ timestamps: true, tableName: 'rooms' })
export class Room extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'room_name',
  })
  declare roomName: string | null;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  declare available: boolean | null;

  @CreatedAt
  @Column({ field: 'created_at' })
  declare createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  declare updatedAt: Date;

  @DeletedAt
  @Column({ field: 'deleted_at', type: DataType.DATE })
  declare deletedAt?: Date | null;
}

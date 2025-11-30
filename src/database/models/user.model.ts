import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  DefaultScope,
  AllowNull,
} from 'sequelize-typescript';

@DefaultScope(() => ({
  attributes: { exclude: ['password', 'deletedAt'] },
  include: [],
}))
@Table({ timestamps: true, tableName: 'users' })
export class User extends Model {
  @AllowNull(true)
  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'first_name',
  })
  declare firstName: string | null;

  @AllowNull(true)
  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'last_name',
  })
  declare lastName: string | null;

  @AllowNull(true)
  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'user_name',
  })
  declare userName: string | null;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @AllowNull(true)
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare role: string | null;

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

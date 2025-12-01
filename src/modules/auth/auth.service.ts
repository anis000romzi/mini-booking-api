/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/database/models/user.model';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { v4 as uuidv4 } from 'uuid';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async register(payload: RegisterDto) {
    const { firstName, lastName, userName, email, password } = payload;
    const hashed = await bcrypt.hash(password, 10);
    await this.userModel.create({
      id: uuidv4(),
      firstName,
      lastName,
      userName,
      email,
      password: hashed,
      role: 'user',
    });
    return { message: 'Registered successfully' };
  }

  async login(payload: LoginDto) {
    const { email, password } = payload;

    const user = await this.userModel.unscoped().findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    const loggedUser = await this.userModel.findOne({ where: { id: user.id } });
    return { access_token: token, user: loggedUser };
  }

  async profile(userId: string) {
    const loggedUser = await this.userModel.findOne({ where: { id: userId } });
    return { user: loggedUser };
  }
}

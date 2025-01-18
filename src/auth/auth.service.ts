import { Injectable, UnauthorizedException, UseFilters } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async signup(signupdto: SignupDto) {
        const {username, password} = signupdto;

        const existingUser = await this.userModel.findOne({username});
        if (existingUser) {
            throw new UnauthorizedException('Username already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = uuidv4();
        const createdUser = new this.userModel({user_id: userId, username, password: hashedPassword});

        await createdUser.save();        
        return {status: 'success', message: 'User created successfully', user_id: createdUser.user_id};
    }

    async login(logindto: LoginDto) {
        const {username, password} = logindto;
        const user = await this.userModel.findOne({username});
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Invalid username or password');
        }
        return {status: 'success', message: 'User logged in successfully', user_id: user.user_id};
    }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createCipheriv, scrypt } from 'crypto';
import { ConfigService } from '@nestjs/config';
import { CreateVisitorDTO, LoginDTO } from '../dto/visitor.dto';
import { Visitor } from '../interface/visitor.interface';
import { promisify } from 'util';
import { ApiException } from '../../../common/exceptions/api.exception';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class VisitorService {
  // 构造函数
  constructor(
    @InjectModel('Visitor') private readonly visitorModel: Model<Visitor>,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}
  /**
   * 通过账号获取访客信息
   * @param userName
   * @returns
   */
  async findOne(userName: string): Promise<Visitor> {
    return await this.visitorModel.findOne({ userName });
  }
  /**
   * 通过id获取访客信息
   * @param _id
   * @returns
   */
  async findById(_id: string): Promise<Visitor> {
    return await this.visitorModel.findById(_id);
  }

  // 添加单个用户
  async addOne(body: CreateVisitorDTO): Promise<any> {
    return await this.visitorModel.create(body);
  }
  /**
   * 注册
   * @param body
   * @returns
   */
  async register(body: CreateVisitorDTO): Promise<any> {
    const user = await this.findOne(body.userName);
    if (user) return new ApiException().errorMsg(10001);
    const aeskey = this.configService.get<string>('aeskey.key');
    const ivkey = this.configService.get<string>('aeskey.iv');
    const iv = Buffer.from(ivkey, 'base64');
    const key = (await promisify(scrypt)(aeskey, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, iv);
    const encryptedText = Buffer.concat([
      cipher.update(body.password),
      cipher.final(),
    ]).toString('base64');
    body.password = encryptedText;
    const result = await this.addOne(body);
    return { userName: result.userName, _id: result._id };
  }
  /**
   * 登录
   * @param body
   */
  async login(body: LoginDTO): Promise<any> {
    const user = await this.findOne(body.userName);
    if (!user) return new ApiException().errorMsg(10000);
    const aeskey = this.configService.get<string>('aeskey.key');
    const ivkey = this.configService.get<string>('aeskey.iv');
    const iv = Buffer.from(ivkey, 'base64');
    const key = (await promisify(scrypt)(aeskey, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, iv);
    const encryptedText = Buffer.concat([
      cipher.update(body.password),
      cipher.final(),
    ]).toString('base64');
    if (encryptedText === user.password) {
      const jwtSign = this.jwtService.sign(
        {
          uid: user._id,
        },
        {
          expiresIn: this.configService.get<string>('jwt.expiresIn'),
        },
      );
      return { token: jwtSign, role: user.role };
    } else {
      return new ApiException().errorMsg(10002);
    }
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from './health-status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HealthRepository {
  constructor(
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
  ) {}

  async getStatus(): Promise<'UP'> {
    const status = (await this.statusRepository.find())[0];
    if (status == null) throw new Error('ステータス取得エラー');

    return status.status;
  }
}

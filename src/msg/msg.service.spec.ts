import { Test, TestingModule } from '@nestjs/testing';
import { MsgService } from './msg.service';

describe('MsgService', () => {
  let service: MsgService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MsgService],
    }).compile();

    service = module.get<MsgService>(MsgService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

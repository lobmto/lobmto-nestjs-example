import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import {
  RegisterWordRequest,
  UpdateWordRequest,
} from '../src/words/words.request';

describe('WordsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );
    await app.init();
  });

  describe('GET /words', () => {
    it('should return list of words', async () => {
      const response = await request(app.getHttpServer()).get('/words');
      expect(response.status).toBe(200);
      expect(response.body.words).toEqual(expect.any(Array));
    });
  });

  describe('POST /words', () => {
    it('should register a new word', async () => {
      const word = {
        word: 'test',
        meaning: 'テスト',
      } satisfies RegisterWordRequest;

      const response = await request(app.getHttpServer())
        .post('/words')
        .send(word);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject({
        id: expect.any(String),
        word: word.word,
        meaning: word.meaning,
      });
    });

    it('should return 400 when required fields are missing', async () => {
      const invalidWord = {
        word: 'test',
        meaning: undefined,
      };

      const response = await request(app.getHttpServer())
        .post('/words')
        .send(invalidWord);

      expect(response.status).toBe(400);
    });
  });

  describe('GET /words/:id', () => {
    it('should return a word with specified ID', async () => {
      const createResponse = await request(app.getHttpServer())
        .post('/words')
        .send({
          word: 'test',
          meaning: 'テスト',
        } satisfies RegisterWordRequest);

      const { id } = createResponse.body;

      const response = await request(app.getHttpServer()).get(`/words/${id}`);
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({
        id: expect.any(String),
        word: 'test',
        meaning: 'テスト',
      });
    });

    it('should return 404 when ID does not exist', async () => {
      const response = await request(app.getHttpServer()).get(
        '/words/00000000-0000-0000-0000-000000000000',
      );
      expect(response.status).toBe(404);
    });

    it('should return 400 when ID format is invalid', async () => {
      const response = await request(app.getHttpServer()).get(
        '/words/invalid-uuid',
      );
      expect(response.status).toBe(400);
    });
  });

  describe('PATCH /words/:id', () => {
    it('should update a word', async () => {
      const createResponse = await request(app.getHttpServer())
        .post('/words')
        .send({
          word: 'test',
          meaning: 'テスト',
        } satisfies RegisterWordRequest);

      const { id } = createResponse.body;

      const response = await request(app.getHttpServer())
        .patch(`/words/${id}`)
        .send({
          meaning: '更新後の値',
        } satisfies UpdateWordRequest);

      expect(response.status).toBe(204);
    });

    it.skip('should return 404 when ID does not exist', async () => {
      const response = await request(app.getHttpServer())
        .patch('/words/00000000-0000-0000-0000-000000000000')
        .send({
          meaning: '更新後の値',
        } satisfies UpdateWordRequest);

      expect(response.status).toBe(404);
    });

    it('should return 400 when ID format is invalid', async () => {
      const response = await request(app.getHttpServer())
        .patch('/words/invalid-uuid')
        .send({
          meaning: '更新後の値',
        } satisfies UpdateWordRequest);

      expect(response.status).toBe(400);
    });

    it('should return 400 when request body is invalid', async () => {
      const createResponse = await request(app.getHttpServer())
        .post('/words')
        .send({
          word: 'test',
          meaning: 'テスト',
        } satisfies RegisterWordRequest);

      const { id } = createResponse.body;

      const response = await request(app.getHttpServer())
        .patch(`/words/${id}`)
        .send({
          invalid: 'invalid-field',
        });

      expect(response.status).toBe(400);
    });
  });

  describe('DELETE /words/:id', () => {
    it('should delete a word', async () => {
      const createResponse = await request(app.getHttpServer())
        .post('/words')
        .send({
          word: 'test',
          meaning: 'テスト',
        } satisfies RegisterWordRequest);

      const { id } = createResponse.body;

      const response = await request(app.getHttpServer()).delete(
        `/words/${id}`,
      );
      expect(response.status).toBe(204);
    });

    it('should return 404 when ID does not exist', async () => {
      const response = await request(app.getHttpServer()).delete(
        '/words/00000000-0000-0000-0000-000000000000',
      );
      expect(response.status).toBe(404);
    });

    it('should return 400 when ID format is invalid', async () => {
      const response = await request(app.getHttpServer()).delete(
        '/words/invalid-uuid',
      );
      expect(response.status).toBe(400);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});

import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { RegisterTagRequest, UpdateTagRequest } from 'src/tags/tags.request';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('TagsController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
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

  describe('GET /tags', () => {
    it('should return list of tags', async () => {
      const response = await request(app.getHttpServer()).get('/tags');
      expect(response.status).toBe(200);
      expect(response.body.tags).toEqual(expect.any(Array));
    });
  });

  describe('POST /tags', () => {
    it('should register a new tag', async () => {
      const tag = {
        name: 'test',
      } satisfies RegisterTagRequest;

      const response = await request(app.getHttpServer())
        .post('/tags')
        .send(tag);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject({
        id: expect.any(String),
        name: tag.name,
      });
    });

    it('should return 400 when required fields are missing', async () => {
      const invalidTag = {
        name: undefined,
      };

      const response = await request(app.getHttpServer())
        .post('/tags')
        .send(invalidTag);

      expect(response.status).toBe(400);
    });
  });

  describe('GET /tags/:id', () => {
    it('should return a tag with specified ID', async () => {
      const createResponse = await request(app.getHttpServer())
        .post('/tags')
        .send({
          name: 'test',
        } satisfies RegisterTagRequest);

      const { id } = createResponse.body;

      const response = await request(app.getHttpServer()).get(`/tags/${id}`);
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({
        id: expect.any(String),
        name: 'test',
      });
    });

    it('should return 404 when ID does not exist', async () => {
      const response = await request(app.getHttpServer()).get(
        '/tags/00000000-0000-0000-0000-000000000000',
      );
      expect(response.status).toBe(404);
    });

    it('should return 400 when ID format is invalid', async () => {
      const response = await request(app.getHttpServer()).get(
        '/tags/invalid-uuid',
      );
      expect(response.status).toBe(400);
    });
  });

  describe('PATCH /tags/:id', () => {
    it('should update a tag', async () => {
      const createResponse = await request(app.getHttpServer())
        .post('/tags')
        .send({
          name: 'test',
        } satisfies RegisterTagRequest);

      const { id } = createResponse.body;

      const response = await request(app.getHttpServer())
        .patch(`/tags/${id}`)
        .send({
          name: 'updated',
        } satisfies UpdateTagRequest);

      expect(response.status).toBe(204);
    });

    it('should return 404 when ID does not exist', async () => {
      const response = await request(app.getHttpServer())
        .patch('/tags/00000000-0000-0000-0000-000000000000')
        .send({
          name: 'updated',
        } satisfies UpdateTagRequest);

      expect(response.status).toBe(404);
    });

    it('should return 400 when ID format is invalid', async () => {
      const response = await request(app.getHttpServer())
        .patch('/tags/invalid-uuid')
        .send({
          name: 'updated',
        } satisfies UpdateTagRequest);

      expect(response.status).toBe(400);
    });

    it('should return 400 when request body is invalid', async () => {
      const createResponse = await request(app.getHttpServer())
        .post('/tags')
        .send({
          name: 'test',
        } satisfies RegisterTagRequest);

      const { id } = createResponse.body;

      const response = await request(app.getHttpServer())
        .patch(`/tags/${id}`)
        .send({
          invalid: 'invalid-field',
        });

      expect(response.status).toBe(400);
    });
  });

  describe('DELETE /tags/:id', () => {
    it('should delete a tag', async () => {
      const createResponse = await request(app.getHttpServer())
        .post('/tags')
        .send({
          name: 'test',
        } satisfies RegisterTagRequest);

      const { id } = createResponse.body;

      const response = await request(app.getHttpServer()).delete(`/tags/${id}`);
      expect(response.status).toBe(204);
    });

    it('should return 404 when ID does not exist', async () => {
      const response = await request(app.getHttpServer()).delete(
        '/tags/00000000-0000-0000-0000-000000000000',
      );
      expect(response.status).toBe(404);
    });

    it('should return 400 when ID format is invalid', async () => {
      const response = await request(app.getHttpServer()).delete(
        '/tags/invalid-uuid',
      );
      expect(response.status).toBe(400);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});

/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module server.models.Config.entities
 */

import {getConnection} from 'typeorm';
import {connectDatabase} from '../../../lib/connectDatabase';
import {ConfigEntity} from './Config.entity';
import {ConfigLogEntity} from './ConfigLog.entity';

const userId = 1;
const createdPayload: any = {foo: 'foo_' + Math.random()};
const updatedPayload: any = {foo: 'bar_' + Math.random()};
const id = 'test_' + Math.random();
const isPublic = true;

beforeAll(async () => {
  await connectDatabase();
});

afterAll(async () => {
  await getConnection().close();
});

describe('레코드 조회', () => {
  beforeAll(async () => {
    await ConfigEntity.create({
      id,
      createdBy: userId,
      payload: createdPayload,
      isPublic,
    }).save();
  });

  afterAll(async () => {
    await ConfigEntity.delete({id});
    await ConfigLogEntity.delete({originId: id});
  });

  it('추가한 레코드를 조회합니다.', async () => {
    const entity = await ConfigEntity.findOne({id});
    expect(entity.payload.foo).toBe(createdPayload.foo);
    expect(entity.createdBy).toBe(userId);
    expect(entity.createdDate).toBeTruthy();
  });
});

describe('레코드 추가', () => {
  afterAll(async () => {
    await ConfigEntity.delete({id});
    await ConfigLogEntity.delete({originId: id});
  });

  it('레코드를 추가합니다.', async () => {
    await ConfigEntity.create({
      id,
      createdBy: userId,
      payload: createdPayload,
      isPublic,
    }).save();

    const createdEntity = await ConfigEntity.findOne({
      id,
    });

    expect(createdEntity.payload.foo).toBe(createdPayload.foo);
    expect(createdEntity.createdBy).toBe(userId);
    expect(createdEntity.createdDate).toBeTruthy();
  });

  it('레코드를 추가하면 로그를 기록해야합니다.', async () => {
    const entity = await ConfigEntity.findOne({id});
    expect(entity.payload.foo).toBe(createdPayload.foo);

    const logEntity = await ConfigLogEntity.findOne(
      {originId: id},
      {order: {id: 'DESC'}},
    );

    delete entity.id;
    delete logEntity.id;
    delete logEntity.originId;
    expect(logEntity).toMatchObject(entity);
  });
});

describe('레코드 수정', () => {
  beforeAll(async () => {
    await ConfigEntity.create({
      id,
      createdBy: userId,
      payload: createdPayload,
      isPublic,
    }).save();
  });

  afterAll(async () => {
    await ConfigEntity.delete({id});
    await ConfigLogEntity.delete({originId: id});
  });

  it('레코드를 수정합니다.', async () => {
    const entity = await ConfigEntity.findOne({id});
    entity.payload = updatedPayload;
    entity.updatedBy = userId;
    await entity.save();

    const updatedEntity = await ConfigEntity.findOne({
      id,
    });

    expect(updatedEntity.payload.foo).toBe(updatedPayload.foo);
    expect(updatedEntity.updatedBy).toBe(userId);
    expect(updatedEntity.updatedDate).toBeTruthy();
  });

  it('레코드를 수정하면 로그를 기록해야합니다.', async () => {
    const entity = await ConfigEntity.findOne({id});
    expect(entity.payload.foo).toBe(updatedPayload.foo);

    const logEntity = await ConfigLogEntity.findOne(
      {originId: id},
      {order: {id: 'DESC'}},
    );

    delete entity.id;
    delete logEntity.id;
    delete logEntity.originId;
    expect(logEntity).toMatchObject(entity);
  });
});

describe('레코드 삭제', () => {
  beforeAll(async () => {
    await ConfigEntity.create({
      id,
      createdBy: userId,
      payload: createdPayload,
      isPublic,
    }).save();
  });

  afterAll(async () => {
    await ConfigEntity.delete({id});
    await ConfigLogEntity.delete({originId: id});
  });

  it('레코드를 삭제합니다.', async () => {
    const entity = await ConfigEntity.findOne({id});
    entity.deletedBy = userId;
    await entity.save();

    const updatedEntity = await ConfigEntity.findOne({
      id,
    });

    expect(updatedEntity.deletedBy).toBe(userId);
    expect(updatedEntity.deletedDate).toBeTruthy();
  });

  it('레코드를 삭제하면 로그를 기록해야합니다.', async () => {
    const entity = await ConfigEntity.findOne({id});
    expect(entity.deletedBy).toBe(userId);

    const logEntity = await ConfigLogEntity.findOne(
      {originId: id},
      {order: {id: 'DESC'}},
    );

    delete entity.id;
    delete logEntity.id;
    delete logEntity.originId;
    expect(logEntity).toMatchObject(entity);
  });
});

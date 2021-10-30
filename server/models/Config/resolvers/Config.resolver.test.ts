/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import {getConnection} from 'typeorm';
import {connectDatabase} from '../../../lib/connectDatabase';
import {ConfigResolver} from './Config.resolver';
import {ConfigUpsertInput} from '../inputs/ConfigUpsert.input';
import {ConfigEntity} from '../entities/Config.entity';
import {ConfigLogEntity} from '../entities/ConfigLog.entity';
import {ConfigUniqueWhereInput} from '../inputs/ConfigUniqueWhere.input';
import {ConfigWhereInput} from '../inputs/ConfigWhere.input';
import {ConfigLogWhereInput} from '../inputs/ConfigLogWhere.input';

const configResolver = new ConfigResolver();
const id = 'test_' + Math.random();
const type = 'test_' + Math.random();
const isPublic = false;
const createdPayload = {foo: 'foo_' + Math.random()};
const updatedPayload = {foo: 'bar_' + Math.random()};
const ctx = {user: {id: 1}};

beforeAll(async () => {
  await connectDatabase();
});

afterAll(async () => {
  await getConnection().close();
});

describe('레코드 조회', () => {
  beforeAll(async () => {
    const configUpsertInput = new ConfigUpsertInput();
    configUpsertInput.id = id;
    configUpsertInput.type = type;
    configUpsertInput.isPublic = isPublic;
    configUpsertInput.payload = createdPayload;

    await configResolver.upsertConfig(configUpsertInput, ctx);
  });

  afterAll(async () => {
    await ConfigEntity.delete({type: type});
    await ConfigLogEntity.delete({type: type});
  });

  it('추가한 레코드를 조회합니다.', async () => {
    const configUniqueWhereInput = new ConfigUniqueWhereInput();
    configUniqueWhereInput.id = id;

    const config = await configResolver.config(configUniqueWhereInput);

    expect(config.id).toBe(id);
    expect(config.payload.foo).toBe(createdPayload.foo);
    expect(config.createdBy).toBe(ctx.user.id);
  });

  it('레코드 목록을 조회합니다.', async () => {
    const configWhereInput = new ConfigWhereInput();
    configWhereInput.type = type;

    const configs = await configResolver.configs(configWhereInput);
    expect(configs.length).toBeTruthy();
  });

  it('레코드 변경 내역을 조회합니다.', async () => {
    for (let i = 0; i < 10; i++) {
      const configUpsertInput = new ConfigUpsertInput();
      configUpsertInput.id = id;
      configUpsertInput.type = type;
      configUpsertInput.isPublic = isPublic;
      configUpsertInput.payload = {foo: Math.random()};
      await configResolver.upsertConfig(configUpsertInput, ctx);
    }

    const configLogWhereInput = new ConfigLogWhereInput();
    configLogWhereInput.originId = id;

    const configLogs = await configResolver.configLogs(
      configLogWhereInput,
      null,
      5,
    );
    expect(configLogs.length).toBeTruthy();

    const configLogLastId = configLogs[configLogs.length - 1].id;
    expect(configLogLastId).toBeTruthy();

    const nextConfigLogs = await configResolver.configLogs(
      configLogWhereInput,
      configLogLastId,
      5,
    );
    expect(nextConfigLogs[0].id).toBe(configLogLastId);
    expect(configLogs.length).toBeTruthy();
  });
});

describe('레코드 추가', () => {
  afterAll(async () => {
    await ConfigEntity.delete({type: type});
    await ConfigLogEntity.delete({type: type});
  });

  it('레코드를 추가합니다.', async () => {
    const configUniqueWhereInput = new ConfigUniqueWhereInput();
    configUniqueWhereInput.id = id;

    const configUpsertInput = new ConfigUpsertInput();
    configUpsertInput.id = id;
    configUpsertInput.type = type;
    configUpsertInput.isPublic = isPublic;
    configUpsertInput.payload = createdPayload;

    await configResolver.upsertConfig(configUpsertInput, ctx);

    const config = await configResolver.config(configUniqueWhereInput);
    expect(config.payload.foo).toBe(createdPayload.foo);
    expect(config.createdBy).toBeTruthy();
  });
});

describe('레코드 수정', () => {
  beforeAll(async () => {
    const configUpsertInput = new ConfigUpsertInput();
    configUpsertInput.id = id;
    configUpsertInput.type = type;
    configUpsertInput.isPublic = isPublic;
    configUpsertInput.payload = createdPayload;

    await configResolver.upsertConfig(configUpsertInput, ctx);
  });

  afterAll(async () => {
    await ConfigEntity.delete({type: type});
    await ConfigLogEntity.delete({type: type});
  });

  it('레코드를 수정합니다.', async () => {
    const configUniqueWhereInput = new ConfigUniqueWhereInput();
    configUniqueWhereInput.id = id;

    const configUpsertInput = new ConfigUpsertInput();
    configUpsertInput.id = id;
    configUpsertInput.type = type;
    configUpsertInput.isPublic = isPublic;
    configUpsertInput.payload = updatedPayload;

    const upsertedConfig = await configResolver.upsertConfig(
      configUpsertInput,
      ctx,
    );
    expect(upsertedConfig.payload.foo).toBe(updatedPayload.foo);

    const config = await configResolver.config(configUniqueWhereInput);
    expect(config.payload.foo).toBe(updatedPayload.foo);
    expect(config.updatedBy).toBeTruthy();
  });
});

describe('레코드 삭제', () => {
  beforeAll(async () => {
    const configUpsertInput = new ConfigUpsertInput();
    configUpsertInput.id = id;
    configUpsertInput.type = type;
    configUpsertInput.isPublic = isPublic;
    configUpsertInput.payload = createdPayload;

    await configResolver.upsertConfig(configUpsertInput, ctx);
  });

  afterAll(async () => {
    await ConfigEntity.delete({type: type});
    await ConfigLogEntity.delete({type: type});
  });

  it('레코드를 삭제합니다.', async () => {
    const configUniqueWhereInput = new ConfigUniqueWhereInput();
    configUniqueWhereInput.id = id;

    await configResolver.deleteConfig(configUniqueWhereInput, ctx);

    const config = await configResolver.config(configUniqueWhereInput);
    expect(config).not.toBeTruthy();
  });

  it('삭제한 레코드의 아이디와 같은 레코드를 만들 수 있어야 합니다.', async () => {
    const configUniqueWhereInput = new ConfigUniqueWhereInput();
    configUniqueWhereInput.id = id;

    const configUpsertInput = new ConfigUpsertInput();
    configUpsertInput.id = id;
    configUpsertInput.type = type;
    configUpsertInput.isPublic = isPublic;
    configUpsertInput.payload = createdPayload;

    const upsertedConfig = await configResolver.upsertConfig(
      configUpsertInput,
      ctx,
    );
    expect(upsertedConfig.payload.foo).toBe(createdPayload.foo);

    const config = await configResolver.config(configUniqueWhereInput);
    expect(config.payload.foo).toBe(createdPayload.foo);
    expect(config.createdBy).toBe(ctx.user.id);
    expect(config.updatedBy).not.toBeTruthy();
  });
});

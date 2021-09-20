import {TestResolver} from './Test.resolver';

describe('Test', () => {
  const message = 'message';

  test('test(message)', async () => {
    const testResolver = new TestResolver();
    const testObject = await testResolver.test(message);
    expect(testObject?.message).toBe(message);
  });
});

import publishMap from '../src/publish.js';

test('the publish of 5502 is 北京联合出版公司', () => {
  expect(publishMap.get('5502')).toBe('北京联合出版公司');
});
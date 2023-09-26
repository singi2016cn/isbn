import publishMap from '../src/publish.js';

test('the publish of 5596 is 北京联合出版公司', () => {
  expect(publishMap.get('5596')).toBe('北京联合出版公司');
});
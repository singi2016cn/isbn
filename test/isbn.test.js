import isbn from '../src/isbn.js';

test('978-7-502-4734-5 is valid', () => {
  expect((new isbn('978-7-502-4734-5')).isValid()).toBe(false);
});

test('978-7-5502-4734-5 is valid', () => {
  expect((new isbn('978-7-5502-4734-5')).isValid()).toBe(true);
});

test('978 7 5502 4734 5 is valid', () => {
  expect((new isbn('978 7 5502 4734 5')).isValid()).toBe(true);
});

test('978-7 5502,4734.5 is valid', () => {
  expect((new isbn('978-7 5502,4734.5')).isValid()).toBe(true);
});

test('8721304621 is valid', () => {
  expect((new isbn('8721304621')).isValid()).toBe(false);
});

test('9788721304621 is valid', () => {
  expect((new isbn('9788721304621')).isValid()).toBe(true);
});

test('7309045475 is valid', () => {
  expect((new isbn('7309045475')).isValid()).toBe(true);
});

test('9788721304621 is valid', () => {
  expect((new isbn('9788721304621')).isValid()).toBe(true);
});

test('7302122601 to new is 9787302122609', () => {
  expect((new isbn('7302122601')).oldToCurrentVersion()).toBe('9787302122609');
});

test('7302122601 to new is 9797302122608', () => {
  expect((new isbn('7302122601')).oldToCurrentVersion(isbn.PRIFIX_CODE_979)).toBe('9797302122608');
});

test('9787302122609 to old is 7302122601', () => {
  expect((new isbn('9787302122609')).currentToOldVersion()).toBe('7302122601');
});

test('9787550247345 parse', () => {
  expect((new isbn('9787550247345')).parse()).toEqual({
    prefixCode: '978',
    groupCode: '7',
    publishCode: '5502',
    bookCode: '4734',
    checkCode: '5'
  });
});

test('9787550247345 parse 978-7-5502-4734-5', () => {
  expect((new isbn('9787550247345')).parseWithSeparator()).toBe('978-7-5502-4734-5');
});

test('7309045475 parse 7-309-04547-5', () => {
  expect((new isbn('7309045475')).parseWithSeparator()).toBe('7-309-04547-5');
});

test('7309045475 is valid', () => {
  expect((new isbn('7309045475')).isValid()).toBe(true);
});

test('publish name of 9787559602176 is 北京联合出版公司', () => {
  expect((new isbn('9787559602176')).publishName()).toBe('北京联合出版公司');
});
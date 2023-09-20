import isbn from '../src/isbn.js';

test('8721304621 is old version', () => {
  expect((new isbn('8721304621')).isOldVersion()).toBe(true);
});

test('9788721304621 is current version', () => {
  expect((new isbn('9788721304621')).isCurrentVersion()).toBe(true);
});

test('7309045475 is old valid', () => {
  expect((new isbn('7309045475')).isValidOldVersion()).toBe(true);
});

test('9788721304621 is current valid', () => {
  expect((new isbn('9788721304621')).isValidCurrentVersion()).toBe(true);
});

test('7302122601 to new is 9787302122609', () => {
  expect((new isbn('7302122601')).oldToCurrentVersion()).toBe('9787302122609');
});

test('9787302122609 to old is 7302122601', () => {
  expect((new isbn('9787302122609')).currentToOldVersion()).toBe('7302122601');
});

test('9787550247345 parse', () => {
  expect((new isbn('9787550247345')).parseCurrentVersion()).toEqual({
    prefixCode: '978',
    groupCode: '7',
    publishCode: '5502',
    bookCode: '4734',
    checkCode: '5'
  });
});

test('9787550247345 parse 978-7-5502-4734-5', () => {
  expect((new isbn('9787550247345')).parseCurrentVersionWithSeparator()).toBe('978-7-5502-4734-5');
});

test('7309045475 is valid', () => {
  expect((new isbn('7309045475')).isValid()).toBe(true);
});
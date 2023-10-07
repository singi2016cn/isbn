import csbn from '../src/csbn.js';

test('7-144-00316-X/TP·340 is valid', () => {
  expect((new csbn('7-144-00316-X/TP·340')).isValid()).toBe(true);
});

test('7-144-00316-X/TP·340 parse', () => {
  expect((new csbn('7-144-00316-X/TP·340')).parse()).toEqual({
    prefixCode: null,
    groupCode: '7',
    publishCode: '144',
    bookCode: '00316',
    checkCode: 'X',
    categoryCode: 'TP',
    orderCode: '340',
  });
});

test('714400316X/TP·340 parse', () => {
  expect((new csbn('714400316X/TP·340')).parse()).toEqual({
    prefixCode: null,
    groupCode: '7',
    publishCode: '144',
    bookCode: '00316',
    checkCode: 'X',
    categoryCode: 'TP',
    orderCode: '340',
  });
});

test('7-144-00316-X/TP·340 is 自动化技术、计算技术', () => {
  expect((new csbn('7-144-00316-X/TP·340')).categoryName()).toBe('自动化技术、计算技术');
});
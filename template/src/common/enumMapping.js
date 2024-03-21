import transform from 'lodash/transform';

const enumKeys = [];

const commonEnumLoaders = [
  ['GENDER_ENUM', () => [
    {description: '男', value: 'M'},
    {description: '女', value: 'F'}
  ]]
];

let promise = null;

const getMapping = async () => {
  let enumsData = {};
  if (!promise) {
    console.log('此处接口中请求得数据，需要配置到enumKeys变量数组中...');
    // 此处接口中请求得数据，需要配置到enumKeys变量数组中
    // promise = Promise.all([ajax(apis.test.getEnumMapping)]).then(([positionEnumMappingResponse]) => {
    //   return Object.assign({}, positionEnumMappingResponse.data.data);
    // });
  }
  const data = await promise;
  enumsData = data || {};
  return enumsData;
};

const enumMapping = transform([...enumKeys.map(key => {
  return [key, async () => {
    const enumsData = await getMapping();
    return enumsData[key];
  }];
}), ...commonEnumLoaders], (result, value) => {
  result[value[0]] = value[1];
}, {});


export default Object.assign({}, enumMapping, {});

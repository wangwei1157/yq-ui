export const clearNull = (obj: any) => {
  for (const key in obj) {
    if (obj[key] == '' || obj[key] == null || obj[key] == undefined) {
      delete obj[key];
    }
  }
  return obj;
}
/**
 * 
 * @param obj 搜索数据
 * @param list option内列配置数组
 * @returns 
 */
export const handlerSearch = (obj: any, list: any[]) => {
  const newObj = clearNull(obj); //将空数据过滤
  const dateMap = new Map(); //处理日期数组Map对象
  const selectMap = new Map(); //处理多选数组Map对象
  list.forEach((item: any) => {
    //通过特定字符串__DATE__获取到日期key值,将真实请求key值存入Map对象，
    //真实请求key值存储在特定key值_date内，第一项为开始日期，第二项为结束日期
    if (item.prop.indexOf('__DATE__') == 0) {
      dateMap.set(item.prop, item._date)
    }
    //通过特定字符串__SELECT__获取到多项项key值,将真实请求key值存入Map对象，
    //真实请求key值存储在特定key值_prop内，_prop为真实请求key值
    if (item.prop.indexOf('__SELECT__') == 0) {
      selectMap.set(item.prop, item._prop)
    }
  })

  /**
   * 通过遍历将日期数据及多选数据处理
   */
  for (const key in newObj) {
    //date第一项为开始日期key，date第二项为结束日期key
    if (key.indexOf('__DATE__') == 0 && newObj[key]) {
      const date = dateMap.get(key)
      newObj[date[0]] = newObj[key][0]
      newObj[date[1]] = newObj[key][1]
      //删除原本带__DATE__的特殊key值，实际请求不需要
      delete newObj[key];
    }
    //prop为真实请求key值，多选项只需要数据最后一项数据，
    //例如[[1,2,3],[4,5,6]],只需要每一项中最后一位即3，6
    //最终结果为[3,6]
    if (key.indexOf('__SELECT__') == 0 && newObj[key]) {
      const prop = selectMap.get(key)
      newObj[prop] = newObj[key].map((item: any) => {
        return item[item.length - 1]
      })
      //删除原本带__SELECT__的特殊key值，实际请求不需要
      delete newObj[key];
    }
  }
  return newObj
}
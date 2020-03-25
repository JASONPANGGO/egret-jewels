/**
 * 写在前面的接口函数描述文件
 * @file {interface_ahead.d.ts}
 */
/**
 * 通过key获取64位资源
 * @param {string} key
 */
declare function getAssestByKey(key: string): string;
/**
 * 通过路径获取64位资源
 * @param {string} url
 */
declare function getAssestByUrl(url: string): string;
/**
 * base64转二进制
 * @param {string} base64
 */
declare function basedecode(base64: string);
/**
 * 获取查询字符串
 * @param {string} name 需要查询的字符串
 */
declare function getQueryString(name: string): string;
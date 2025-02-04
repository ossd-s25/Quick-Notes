// utils.js

/**
 * 将字符串转换成全大写
 * @param {string} text
 * @returns {string}
 */
function upperCaseText(text) {
  return text.toUpperCase();
}

/**
 * 将字符串转换成全小写
 * @param {string} text
 * @returns {string}
 */
function lowerCaseText(text) {
  return text.toLowerCase();
}

/**
 * 将字符串中每个单词首字母大写，其余变小写。
 * @param {string} text
 * @returns {string}
 */
function capitalizeWords(text) {
  return text
    .split(" ")
    .map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

/**
 * 生成一个适合用在 URL/文件名里的“slug”字符串
 * @param {string} text
 * @returns {string}
 */
function slugify(text) {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

/**
 * 统计字符串中单词数量（按空格分隔的简易示例）
 * @param {string} text
 * @returns {number}
 */
function countWords(text) {
  if (!text.trim()) {
    return 0;
  }
  return text.trim().split(/\s+/).length;
}

/**
 * 将文本内容截断到指定长度，超出部分用“...”替代
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
function truncateText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + "...";
}

/**
 * 将 Markdown 文本中最简单的 **加粗** 和 *斜体* 去掉标记后，返回纯文本
 * @param {string} md
 * @returns {string}
 */
function simpleMdToPlainText(md) {
  return md
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1');
}

/**
 * 将文本转换为 Base64 编码
 * @param {string} text
 * @returns {string}
 */
function toBase64(text) {
  return btoa(unescape(encodeURIComponent(text)));
}

/**
 * 将 Base64 字符串解码回普通文本
 * @param {string} b64
 * @returns {string}
 */
function fromBase64(b64) {
  return decodeURIComponent(escape(atob(b64)));
}



// 1. 压缩（最小化）JSON 字符串：将其解析后再使用 JSON.stringify(obj) 生成单行格式
function minifyJSON(jsonString) {
  try {
    const obj = JSON.parse(jsonString);
    // 直接不带第三个参数，stringify 默认就是单行紧凑形式
    return JSON.stringify(obj);
  } catch (err) {
    console.error("JSON 压缩失败:", err);
    // 如果解析失败，就原样返回或返回提示
    return "Invalid JSON input!";
  }
}

// 2. 美化（格式化）JSON 字符串：将其解析后再用 JSON.stringify(obj, null, 2) 生成带缩进的格式
function formatJSON(jsonString, indent = 2) {
  try {
    const obj = JSON.parse(jsonString);
    return JSON.stringify(obj, null, indent);
  } catch (err) {
    console.error("JSON 格式化失败:", err);
    return "Invalid JSON input!";
  }
}

// 集中式导出
export {
  upperCaseText,
  lowerCaseText,
  capitalizeWords,
  slugify,
  countWords,
  truncateText,
  simpleMdToPlainText,
  toBase64,
  fromBase64,
  minifyJSON,
  formatJSON
};

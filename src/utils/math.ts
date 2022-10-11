import BigNumber from "bignumber.js";

/**
 *
 * @param n 需要格式化的数字
 * @param cutZero 是否需要去除末尾多余的0
 * @param shortNum 需要保留的小数位数
 * @returns
 */
export const numberFormat = (
  n: any,
  cutZero = false,
  shortNum = 18
): string => {
  if (new BigNumber(n).eq(0)) {
    return `0`;
  }
  let str = new BigNumber(n).toFormat(shortNum);
  if (cutZero) {
    while (str[str.length - 1] === "0") {
      str = str.substring(0, str.length - 1);
    }
    if (str[str.length - 1] === ".") {
      str = str.substring(0, str.length - 1);
    }
  }

  return str;
};

/**
 * 百分比优化
 * @param e
 * @param max 最大绝对值（如300%传300）
 * @param all 超过最大绝对值时是否显示完整值
 * @returns
 */
export const formatColRatio = (e: any, all = false, max = 300) => {
  const val = e;
  if (!e) {
    return "-";
  }
  if (e === 0) {
    return "0%";
  }
  if (max && (val > 300 || val < -300) && all) {
    return `> ${max}%`;
  }
  if (val > 0 && val < 0.01) {
    return "< 0.01%";
  }
  return cutZero(String(val ? val.toFixed(2) : 0)) + "%";
};

// 转换成带单位的数字比如k,m等，默认精确到2位小数
export function unitNumberFormat(amount: any, shortNum?: number) {
  if (!amount) {
    return "0";
  }
  if (new BigNumber(amount).eq(0)) {
    return "0";
  }
  if (new BigNumber(amount).lt(0.001)) {
    return "< 0.001";
  }
  const dp = shortNum || 2;
  let resStr = String(new BigNumber(amount).toFixed(dp));
  if (new BigNumber(amount).gte(new BigNumber(1000000000))) {
    resStr = new BigNumber(amount).div(1000000000).toFixed(dp) + "B";
  } else {
    if (new BigNumber(amount).gte(new BigNumber(1000000))) {
      resStr = new BigNumber(amount).div(1000000).toFixed(dp) + "M";
    } else {
      if (new BigNumber(amount).gte(new BigNumber(1000))) {
        resStr = new BigNumber(amount).div(1000).toFixed(dp) + "K";
      }
    }
  }
  return cutZero(resStr);
}

export function formatNum(number: any, digits = 0) {
  return new BigNumber(number).toFormat(digits);
}

// 去除末尾多余的0
export function cutZero(old: string) {
  const regexp = /(?:\.0*|(\.\d+?)0+)$/;
  return old.replace(regexp, "$1");
}

// 检测替换为符合标准的数字
export const NumberCheck = (amount: any, length = 6) => {
  if (typeof amount === "undefined" || amount === "") {
    return "";
  }
  let str: string = typeof amount === "string" ? amount : amount.toString();
  const len1 = str.substr(0, 1);
  const len2 = str.substr(1, 1);
  //如果第一位是0，第二位不是点，就用数字把点替换掉
  if (str.length > 1 && len1 === "0" && len2 !== ".") {
    str = str.substr(1, 1);
  }
  //第一位不能是.
  if (len1 === ".") {
    str = "";
  }
  //限制只能输入一个小数点
  if (str.indexOf(".") !== -1) {
    const str_ = str.substr(str.indexOf(".") + 1);
    if (str_.indexOf(".") !== -1) {
      str = str.substr(0, str.indexOf(".") + str_.indexOf(".") + 1);
    }
  }
  //正则替换，保留数字和小数点
  str = str.replace(/[^\d^.]+/g, "");
  //如果需要保留小数点后6位
  str = str.replace(/\.\d\d$/, "");
  const dotNum = str.split(".").length > 1 ? str.split(".")[1].length : 0;
  if (dotNum > length) {
    str = new BigNumber(str).toFixed(length, 1).toString();
  }
  return str.toString();
};

/**
 *
 *
 * @param {number} molecular  分子
 * @param {number} denominator 分母
 * @param {boolean} [isInt=true] 是否转换为int型
 * @return {*} 百分比
 */
export const convPercentage = (
  molecular: number,
  denominator: number,
  isInt = true
) => {
  const percentage = (molecular / denominator) * 100;

  return isInt ? Math.round(percentage) : percentage;
};

/**
 *
 * @param {number} min 最小值
 * @param {number} amount 数据
 * @param {number} [fixed=0] 保留小数位数
 * @param {boolean}  是否需要格式化
 * @return {*}
 */
export const isLessThanMin = (
  min = 0.01,
  amount: number,
  fixed = 0,
  isFormat = false
) => {
  return amount < min
    ? `<${min}`
    : isFormat
    ? numberFormat(amount, true, fixed)
    : amount.toFixed(fixed);
};

export function formatNumFloat(number: any, digits = 0, decPoint = ".") {
  if (number) {
    if (digits === 0) {
      return new BigNumber(number).toFixed(0);
    }
    const strNum = `${number}`;
    const floatNum = strNum.split(decPoint)[1];
    if (floatNum?.length > 0) {
      return new BigNumber(number).toFixed(
        Math.min(floatNum?.length, digits),
        1
      );
    }
    return number;
  }
  return "";
}

/**
 * V2功能，获取借贷的币种数量，返回token0和token1的具体个数
 * @param token0Amount token0抵押数量
 * @param token0Price token0价格
 * @param token1Amount token1抵押数量
 * @param token1Price token1价格
 * @param leverage 杠杆倍数
 * @param tokenRatio token0的占比，自动计算token1的占比
 */
export const calculationTokens = (
  token0Amount: string | number,
  token0Price: string | number,
  token0Liqudity: string | number,
  token1Amount: string | number,
  token1Price: string | number,
  token1Liqudity: string | number,
  leverage: string | number,
  tokenRatio: string | number
) => {
  // 计算抵押物总价值
  const totalPrice = new BigNumber(token0Amount)
    .times(new BigNumber(token0Price))
    .plus(new BigNumber(token1Amount).times(new BigNumber(token1Price)));
  // 计算总债务
  const totalDebt = new BigNumber(leverage).eq(0)
    ? new BigNumber(0)
    : new BigNumber(leverage).times(totalPrice);
  // 如果token0及token1的流动性都大于0
  if (
    !new BigNumber(token0Liqudity).eq(0) &&
    !new BigNumber(token1Liqudity).eq(0)
  ) {
    // 计算token0的数量(总债务乘以token0的占比后，除以token0的价值)
    const token0Result = new BigNumber(totalDebt)
      .times(new BigNumber(tokenRatio).div(100))
      .div(new BigNumber(token0Price))
      .toString();
    // 计算token1的数量(总债务乘以(100 - token0的占比)后，除以token1的价值)
    const token1Result = new BigNumber(totalDebt)
      .times(new BigNumber(1).minus(new BigNumber(tokenRatio).div(100)))
      .div(new BigNumber(token1Price))
      .toString();
    return {
      token0Result,
      token1Result,
    };
  } else {
    // 如果token0的流动性为0
    if (new BigNumber(token0Liqudity).eq(0)) {
      // token0的数量 = 0
      const token0Result = new BigNumber(0).toString();
      // 计算token1的数量(总债务乘以(100 - token0的占比)后，除以token1的价值)
      const token1Result = new BigNumber(totalDebt)
        .div(new BigNumber(token1Price))
        .toString();
      return {
        token0Result,
        token1Result,
      };
    } else {
      // 计算token0的数量(总债务乘以token0的占比后，除以token0的价值)
      const token0Result = new BigNumber(totalDebt)
        .div(new BigNumber(token0Price))
        .toString();
      // token1的数量=0
      const token1Result = new BigNumber(0).toString();
      return {
        token0Result,
        token1Result,
      };
    }
  }
};

/**
 * V2功能，根据当前债务配比，自动设置最大token数量,返回token0和token1的数量以及新的百分比
 * @param token0Amount token0抵押数量
 * @param token0Price token0价格
 * @param token1Amount token1抵押数量
 * @param token1Price token1价格
 * @param leverage 杠杆倍数
 * @param tokenRatio token0的占比，自动计算token1的占比
 * @param activeToken 设置最大token0或者token1，值：0 / 1
 * @param token0Liqudity token0流动性
 * @param token1Liqudity token1ldx
 */
export const calculationMaxToken = (
  token0Amount: string | number,
  token0Price: string | number,
  token1Amount: string | number,
  token1Price: string | number,
  leverage: string | number,
  activeToken: number,
  token0Liqudity: string | number,
  token1Liqudity: string | number
) => {
  // 计算抵押物总价值
  const totalPrice = new BigNumber(token0Amount)
    .times(new BigNumber(token0Price))
    .plus(new BigNumber(token1Amount).times(new BigNumber(token1Price)));
  // 计算总债务
  const totalDebt = new BigNumber(leverage).eq(0)
    ? new BigNumber(0)
    : new BigNumber(leverage).times(totalPrice);
  // 根据activeToken设置token0或者token1的数量
  let token0Result;
  let token1Result;
  let newTokenRatio; // 新的比例
  // 选择最大为token0
  if (activeToken === 0) {
    token0Result = new BigNumber(token0Liqudity).toString();
    token1Result = totalDebt
      .minus(new BigNumber(token0Liqudity).times(new BigNumber(token0Price)))
      .div(new BigNumber(token1Price))
      .toString();
    // 如果计算后的token1的数量依旧大于token1的流动性，则token1数量同样设置为流动性数量
    if (new BigNumber(token1Result).gt(new BigNumber(token1Liqudity))) {
      token1Result = new BigNumber(token1Liqudity).toString();
    }
    newTokenRatio = new BigNumber(token0Result)
      .times(token0Price)
      .div(totalDebt)
      .toFixed(2);
  }
  // 选择最大为token1
  else {
    token1Result = new BigNumber(token1Liqudity).toString();
    token0Result = totalDebt
      .minus(new BigNumber(token1Liqudity).times(new BigNumber(token1Price)))
      .div(new BigNumber(token0Price))
      .toString();
    // 如果计算后的token1的数量依旧大于token1的流动性，则token1数量同样设置为流动性数量
    if (new BigNumber(token0Result).gt(new BigNumber(token0Liqudity))) {
      token0Result = new BigNumber(token0Liqudity).toString();
    }
    newTokenRatio = new BigNumber(token0Result)
      .times(token0Price)
      .div(totalDebt)
      .toFixed(2);
  }
  return {
    token0Result,
    token1Result,
    newTokenRatio,
  };
};

// 注意max限制， px 大于 unit 时的使用
export default function px2vw(
  px: number,
  unit = 375,
  ignoreMax = false
): string {
  if (!ignoreMax) {
    if (px > unit) {
      return "100vw";
    } else if (px < -1 * unit) {
      return "-100vw";
    }
  }

  // 100vw = ${unit}px
  return `${(px / unit) * 100}vw`;
}

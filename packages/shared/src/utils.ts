/**
 * 通用工具函数
 */

/**
 * 从给定 URL（或当前页面 URL）中获取查询参数值
 * @param name 参数名
 * @param url 可选，指定要解析的完整 URL 或查询字符串
 * @returns 参数值或 null
 */
export function getUrlParam(name: string, url?: string): string | null {
  const target = url ?? (typeof window !== 'undefined' ? window.location.href : '');
  if (!target) return null;
  try {
    // 如果传入的是相对路径，new URL 可能需要 base
    const u = new URL(target, typeof window === 'undefined' ? 'http://localhost' : undefined as any);
    return u.searchParams.get(name);
  } catch (e) {
    // 回退到简单解析 query 部分
    const query = target.includes('?') ? target.split('?')[1] : target;
    const params = new URLSearchParams(query || '');
    return params.get(name);
  }
}

/**
 * 通用防抖函数，返回带有 `cancel` 方法的防抖函数
 * @param fn 要防抖执行的函数
 * @param wait 延迟毫秒，默认 300
 */
export function debounce<F extends (...args: any[]) => any>(fn: F, wait = 300) {
  let timer: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<F>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
      timer = null;
    }, wait);
  };

  debounced.cancel = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  return debounced as ((...args: Parameters<F>) => void) & { cancel: () => void };
}

export default {
  getUrlParam,
  debounce,
};

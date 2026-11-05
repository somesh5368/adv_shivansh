export function getParam(param: string | string[] | undefined, defaultVal = ''): string {
  if (!param) return defaultVal;
  return Array.isArray(param) ? param[0] : param;
}


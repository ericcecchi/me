export function handleError(err: any) {
  return err?.response?.data || err?.message || err;
}

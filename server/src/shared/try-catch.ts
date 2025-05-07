import { ResourceNotFoundError } from '@/app/errors/resource-not-found-error'

export const tryCatch = async <T>(
  fn: () => Promise<T>
): Promise<[NonNullable<T>, undefined] | [undefined, unknown]> => {
  try {
    const result = await fn()
    if (result === null || result === undefined) {
      throw new ResourceNotFoundError()
    }
    return [result as NonNullable<T>, undefined]
  } catch (error) {
    return [undefined, error]
  }
}

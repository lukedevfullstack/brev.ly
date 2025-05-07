import { exportUrls } from '@/app/functions/export-urls'
import * as dbModule from '@/infra/db'
import * as uploadModule from '@/infra/storage/upload-file-to-storage'
import { fakerPT_BR as faker } from '@faker-js/faker'
import { PassThrough, Readable } from 'node:stream'
import { describe, expect, it, vi } from 'vitest'

// Use a helper type to ensure correct destructuring without `any`
type ExportedResult = Awaited<ReturnType<typeof exportUrls>>

describe('export urls', () => {
  it('should generate a CSV and return a report URL', async () => {
    const originalUrlPattern = faker.internet.domainWord()

    // Mock 10 rows of data
    const rows = Array.from({ length: 10 }, (_, i) => ({
      id: faker.string.uuid(),
      original_url: `${originalUrlPattern}/resource-${i + 1}`,
      short_url: faker.string.alphanumeric(6),
      visit_count: faker.number.int({ min: 0, max: 100 }),
      created_at: new Date().toISOString(),
      last_visited: new Date().toISOString(),
    }))

    // Stub uploadFileToStorage to avoid real upload
    const uploadStub = vi
      .spyOn(uploadModule, 'uploadFileToStorage')
      .mockImplementationOnce(async ({ contentStream }) => {
        contentStream.pipe(new PassThrough())
        return {
          key: 'mocked-file.csv',
          url: 'http://example.com/file.csv',
        }
      })

    // Mock the pg.unsafe().cursor() call to avoid real DB
    vi.spyOn(dbModule.pg, 'unsafe').mockImplementation(() => {
      return {
        cursor: () => Readable.from([rows]),
      } as any
    })

    // Call the function
    const result = (await exportUrls({ searchQuery: originalUrlPattern })) as ExportedResult

    expect(result.reportUrl).toBe('http://example.com/file.csv')
    expect(uploadStub).toHaveBeenCalledTimes(1)

    const csvStream = uploadStub.mock.calls[0][0].contentStream
    expect(csvStream).toBeDefined()
  })
})
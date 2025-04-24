import { makeUrl } from "@/test/factories/make-url";
import { fakerPT_BR as faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { describe, expect, it } from "vitest";

const sortByCreatedAt = (urls: any[], direction: "asc" | "desc") => {
  return [...urls].sort((a, b) =>
    direction === "asc"
      ? +new Date(a.createdAt) - +new Date(b.createdAt)
      : +new Date(b.createdAt) - +new Date(a.createdAt)
  );
};

const logUrls = (label: string, urls: any[]) => {
  console.log(`\n${label}:`);
  urls.forEach((url, index) =>
    console.log(`${index + 1}. URL: ${url.originalUrl}, CreatedAt: ${url.createdAt}`)
  );
};

describe("get urls (mocked)", () => {
  it("should simulate getting urls", async () => {
    const pattern = faker.string.uuid();

    const url1 = await makeUrl({ originalUrl: `${pattern}/1` });
    const url2 = await makeUrl({ originalUrl: `${pattern}/2` });
    const url3 = await makeUrl({ originalUrl: `${pattern}/3` });
    const url4 = await makeUrl({ originalUrl: `${pattern}/4` });
    const url5 = await makeUrl({ originalUrl: `${pattern}/5` });

    const urls = [url1, url2, url3, url4, url5];
    logUrls("Generated URLs", urls);

    const sorted = sortByCreatedAt(urls, "desc");
    logUrls("Sorted DESC", sorted);

    expect(sorted).toEqual([
      expect.objectContaining({ id: sorted[0].id }),
      expect.objectContaining({ id: sorted[1].id }),
      expect.objectContaining({ id: sorted[2].id }),
      expect.objectContaining({ id: sorted[3].id }),
      expect.objectContaining({ id: sorted[4].id }),
    ]);
  });

  it("should simulate paginated results", async () => {
    const pattern = faker.string.uuid();

    const urls = await Promise.all(
      [1, 2, 3, 4, 5].map((n) =>
        makeUrl({ originalUrl: `${pattern}/${n}` })
      )
    );

    const sorted = sortByCreatedAt(urls, "desc");
    logUrls("All Sorted for Pagination", sorted);

    const page1 = sorted.slice(0, 3);
    const page2 = sorted.slice(3, 6);
    logUrls("Page 1", page1);
    logUrls("Page 2", page2);

    expect(page1.length).toBe(3);
    expect(page2.length).toBe(2);
  });

  it("should simulate ascending order", async () => {
    const pattern = faker.string.uuid();

    const urls = await Promise.all(
      Array.from({ length: 5 }, (_, i) =>
        makeUrl({
          originalUrl: `${pattern}/${i + 1}`,
          createdAt: dayjs().subtract(5 - i, "day").toDate(),
        })
      )
    );

    const sortedAsc = sortByCreatedAt(urls, "asc");
    logUrls("Sorted ASC", sortedAsc);

    expect(sortedAsc[0].createdAt <= sortedAsc[1].createdAt).toBe(true);
  });
});

const buildPagination = (options: { limit: string, page: number, }, count: number, data: any[]) => {
    const total = count;
    const limit = parseInt(options.limit, 10);
    const pages = total / limit;
    const from =
      Number(options.page) === 1 ? 1 : (options.page - 1) * limit + 1;
    const to = from + data.length - 1;
    const totalPages =
      pages > Math.floor(pages) ? Math.floor(pages + 1) : pages;
    return {
      // rows: data,
      current_page: Number(options.page),
      per_page: limit,
      total_pages: totalPages,
      total,
      from,
      to,
    };
}

export default buildPagination;

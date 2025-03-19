import { db } from "@/db";
import { ProductFilterValidator } from "@/lib/validators/product-validator";
import { NextRequest } from "next/server";

class Filter {
  private filters: Map<string, string[]> = new Map();

  hasFilter() {
    return this.filters.size > 0;
  }

  add(key: string, operator: string, value: string | number) {
    const filter = this.filters.get(key) || [];
    filter.push(
      `${key} ${operator} ${typeof value === "number" ? value : `"${value}"`}`
    );
    this.filters.set(key, filter);
  }

  addRaw(key: string, rawFilter: string) {
    this.filters.set(key, [rawFilter]);
  }

  get() {
    const parts: string[] = [];
    this.filters.forEach(filter => {
      const groupedValues = filter.join(` OR `);
      parts.push(`(${groupedValues})`);
    });
    return parts.join(" AND ");
  }
}

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const { color, price, size, sort } = ProductFilterValidator.parse(
      body.filter
    );

    const filter = new Filter();

    if (color.length > 0)
      color.forEach(color => filter.add("color", "=", color));
    else if (color.length === 0) filter.addRaw("color", `color = ""`);

    if (size.length > 0) size.forEach(size => filter.add("size", "=", size));
    else if (size.length === 0) filter.addRaw("size", `size = ""`);

    filter.addRaw("price", `price >= ${price[0]} AND price <= ${price[1]}`);

    const products = await db.query({
      topK: 100,
      vector: [0, 0, 0],
      includeMetadata: true,
      filter: filter.hasFilter() ? filter.get() : undefined,
    });

    let sortedProducts = [...products];

    if (sort === "price-asc") {
      sortedProducts.sort(
        (a, b) => (a.metadata?.price || 0) - (b.metadata?.price || 0)
      );
    } else if (sort === "price-desc") {
      sortedProducts.sort(
        (a, b) => (b.metadata?.price || 0) - (a.metadata?.price || 0)
      );
    }

    sortedProducts = sortedProducts.slice(0, 12);

    return new Response(JSON.stringify(sortedProducts));
  } catch (err) {
    console.error(err);

    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};

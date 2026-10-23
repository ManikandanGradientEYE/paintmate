/**
 * Copies every table from Neon Postgres (DATABASE_URL) into Hostinger MySQL
 * (MYSQL_DATABASE_URL), keeping ids so relations and links stay intact.
 *
 *   npx tsx scripts/neon-to-mysql.ts               export to backup/, then import
 *   npx tsx scripts/neon-to-mysql.ts --export-only just write the backup JSON
 *
 * The import replaces whatever is in MySQL, so it is safe to re-run just before
 * switching over to pick up leads that came in since the last run.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { PrismaClient as PostgresClient } from "@prisma/client";
import { PrismaClient as MysqlClient } from "../prisma/mysql/client";

const exportOnly = process.argv.includes("--export-only");

const neon = new PostgresClient();
const mysql = new MysqlClient();

async function main() {
  console.log("Reading from Neon…");
  const data = {
    homeSize: await neon.homeSize.findMany(),
    paint: await neon.paint.findMany(),
    shade: await neon.shade.findMany(),
    addOn: await neon.addOn.findMany(),
    catalogProduct: await neon.catalogProduct.findMany(),
    pricingSetting: await neon.pricingSetting.findMany(),
    lead: await neon.lead.findMany(),
    colourRoom: await neon.colourRoom.findMany(),
    colourSwatch: await neon.colourSwatch.findMany(),
    review: await neon.review.findMany(),
    socialLink: await neon.socialLink.findMany(),
  };

  mkdirSync("backup", { recursive: true });
  const file = `backup/neon-${new Date().toISOString().replace(/[:.]/g, "-")}.json`;
  writeFileSync(file, JSON.stringify(data, null, 2));
  console.log(`Backup written to ${file}`);

  if (exportOnly) {
    printCounts(data);
    return;
  }

  console.log("Writing to MySQL…");
  // Children before parents when clearing, parents before children when inserting.
  await mysql.$transaction([
    mysql.colourSwatch.deleteMany(),
    mysql.colourRoom.deleteMany(),
    mysql.homeSize.deleteMany(),
    mysql.paint.deleteMany(),
    mysql.shade.deleteMany(),
    mysql.addOn.deleteMany(),
    mysql.catalogProduct.deleteMany(),
    mysql.pricingSetting.deleteMany(),
    mysql.lead.deleteMany(),
    mysql.review.deleteMany(),
    mysql.socialLink.deleteMany(),

    mysql.homeSize.createMany({ data: data.homeSize }),
    mysql.paint.createMany({ data: data.paint }),
    mysql.shade.createMany({ data: data.shade }),
    mysql.addOn.createMany({ data: data.addOn }),
    mysql.catalogProduct.createMany({ data: data.catalogProduct }),
    mysql.pricingSetting.createMany({ data: data.pricingSetting }),
    mysql.lead.createMany({ data: data.lead }),
    mysql.colourRoom.createMany({ data: data.colourRoom }),
    mysql.colourSwatch.createMany({ data: data.colourSwatch }),
    mysql.review.createMany({ data: data.review }),
    mysql.socialLink.createMany({ data: data.socialLink }),
  ]);

  const mysqlCounts: Record<string, number> = {
    homeSize: await mysql.homeSize.count(),
    paint: await mysql.paint.count(),
    shade: await mysql.shade.count(),
    addOn: await mysql.addOn.count(),
    catalogProduct: await mysql.catalogProduct.count(),
    pricingSetting: await mysql.pricingSetting.count(),
    lead: await mysql.lead.count(),
    colourRoom: await mysql.colourRoom.count(),
    colourSwatch: await mysql.colourSwatch.count(),
    review: await mysql.review.count(),
    socialLink: await mysql.socialLink.count(),
  };
  printCounts(data, mysqlCounts);

  const mismatched = Object.entries(data).filter(([t, rows]) => rows.length !== mysqlCounts[t]);
  if (mismatched.length) throw new Error(`Row counts differ for: ${mismatched.map(([t]) => t).join(", ")}`);
  console.log("Done — every table matches.");
}

function printCounts(data: Record<string, unknown[]>, mysqlCounts?: Record<string, number>) {
  console.table(
    Object.entries(data).map(([table, rows]) => ({
      table,
      neon: rows.length,
      ...(mysqlCounts && { mysql: mysqlCounts[table] }),
    }))
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await neon.$disconnect();
    await mysql.$disconnect();
  });

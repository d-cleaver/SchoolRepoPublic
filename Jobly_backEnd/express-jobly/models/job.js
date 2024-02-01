"use strict";

const db = require("../db");
const {NotFoundError} = require("../expressError");
const {sqlForPartialUpdate} = require("../helpers/sql");

/** Related functions for companies. */

class Job {
  /** Create a job (from data), update db, return new job data.
   *
   * data should be { title, salary, equity, companyHandle }
   *
   * Returns { id, title, salary, equity, companyHandle }
   *
   * */

  static async create(data) {
    const result = await db.query(
      `INSERT INTO jobs
           (title, salary, equity, company_handle)
           VALUES ($1, $2, $3, $4)
           RETURNING id, title, salary, equity, company_handle AS "companyHandle"`,
      [data.title, data.salary, data.equity, data.companyHandle]
    );
    const job = result.rows[0];

    return job;
  }

  /** Find all jobs.
   * Optional filter on jobFilters
   *
   * jobFilters (optional)
   * - title(will find case-insensitive, partial matches.)
   * - minSalary (filter to jobs with at least that salary.)
   * - hasEquity (if true, filter to jobs that provide a non-zero amount of equity. If false or not included in the filtering, list all jobs regardless of equity.)
   *
   * Returns [{ id, title, salary, equity, companyHandle, companyName }, ...]
   * */

  static async findAll(jobFilters = {}) {
    // start by creating variables to use in a broader SQL query
    let query = `SELECT 
                j.id, j.title, j.salary, j.equity,
                j.company_handle AS "companyHandle", c.name AS "companyName"
                FROM jobs AS j
                LEFT JOIN companies AS c
                ON c.handle = j.company_handle`;
    let whereStatements = [];
    let queryValues = [];

    const {title, minSalary, hasEquity} = jobFilters;

    // for each filter, push to appropriate array of whereStatements or queryValues. This will generate the correct SQL query

    if (title !== undefined) {
      queryValues.push(`%${title}%`);
      whereStatements.push(`title ILIKE $${queryValues.length}`);
    }

    if (minSalary !== undefined) {
      queryValues.push(minSalary);
      whereStatements.push(`salary >= $${queryValues.length}`);
    }

    if (hasEquity === true) {
      whereStatements.push(`equity > 0`);
    }

    if (whereStatements.length > 0) {
      query += " WHERE " + whereStatements.join(" AND ");
    }

    // complete query and return results

    query += " ORDER BY title ";
    const jobsRes = await db.query(query, queryValues);
    return jobsRes.rows;
  }

  /** Given a job id, return data about company.
   *
   * Returns { id, title, salary, equity, companyHandle, company }
   *   where company is {handle, name, description, numEmployees, logoUrl}
   *
   * Throws NotFoundError if not found.
   **/

  static async get(id) {
    const jobRes = await db.query(
      `SELECT
        id, title, salary, equity, company_handle AS "companyHandle"
        FROM jobs
        WHERE id = $1`,
      [id]
    );

    const job = jobRes.rows[0];

    if (!job) throw new NotFoundError(`No job: ${id}`);

    const companiesRes = await db.query(
      `SELECT handle,
          name, description, num_employees AS "numEmployees", logo_url AS "logoUrl"
          FROM companies
          WHERE handle = $1`,
      [job.companyHandle]
    );

    delete job.companyHandle;
    job.company = companiesRes.rows[0];

    return job;
  }

  /** Update job data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * Data can include: {title, salary, equity}
   *
   * Returns {id, title, salary, equity, companyHandle}
   *
   * Throws NotFoundError if not found.
   */

  static async update(id, data) {
    const {setCols, values} = sqlForPartialUpdate(data, {});
    const idVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE jobs 
                      SET ${setCols} 
                      WHERE id = ${idVarIdx} 
                      RETURNING id, 
                                title,
                                salary,
                                equity, 
                                company_handle AS "companyHandle"`;
    const result = await db.query(querySql, [...values, id]);
    const job = result.rows[0];

    if (!job) throw new NotFoundError(`No job: ${id}`);

    return job;
  }

  /** Delete given job from database; returns undefined.
   *
   * Throws NotFoundError if company not found.
   **/

  static async remove(id) {
    const result = await db.query(
      `DELETE
           FROM jobs
           WHERE id = $1
           RETURNING id`,
      [id]
    );
    const job = result.rows[0];

    if (!job) throw new NotFoundError(`No company: ${id}`);
  }
}

module.exports = Job;

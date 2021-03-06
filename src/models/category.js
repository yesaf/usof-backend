const Model = require('./index');

class Category extends Model {
  constructor() {
    super();
  }

  async findById({ id }) {
    try {
      const rows = await this.DB.query(
        'SELECT * FROM usof.categories WHERE category_id = ?',
        [id]
      );

      return rows[0];
    } catch (e) {
      console.log(e);
    }
  }

  async findByTitle({ title }) {
    try {
      const rows = await this.DB.query(
        'SELECT * FROM usof.categories WHERE title = ?',
        [title]
      );

      return rows[0];
    } catch (e) {
      console.log(e);
    }
  }

  async getAll() {
    try {
      const rows = await this.DB.query('SELECT * FROM categories');

      return rows[0];
    } catch (e) {
      console.log(e);
    }
  }

  async getAllPosts({ category_id }) {
    try {
      const rows = await this.DB.query(
        `SELECT post_id, author_id, title, content, status, publish_date
                 FROM posts
                 JOIN categories_posts USING (post_id)
                 WHERE category_id=?`,
        [category_id]
      );

      return rows[0];
    } catch (e) {
      console.log(e);
    }
  }

  async createNew({ title, description = '' }) {
    try {
      const result = await this.DB.query(
        'INSERT INTO usof.categories (title, description ) VALUES (?, ?)',
        [title, description]
      );
      console.log(result);
      return { status: 'ok', insertId: result[0]['insertId'] };
    } catch (e) {
      console.log(e);
      return { status: 'error', msg: e.sqlMessage };
    }
  }

  async update({ category_id, new_title, new_description }) {
    try {
      let result = await this.DB.query(
        `UPDATE categories 
                SET title=?, description=? WHERE category_id=?;`,
        [new_title, new_description, category_id]
      );
      console.log(result);
      return { status: 'ok' };
    } catch (e) {
      console.log(e);
      return { status: 'error', msg: e.sqlMessage };
    }
  }

  async delete({ id }) {
    try {
      const result = await this.DB.query(
        `DELETE FROM usof.categories WHERE category_id=?`,
        [id]
      );
      console.log(result);
      return { status: 'ok' };
    } catch (e) {
      console.log(e);
      return { status: 'error', msg: e.sqlMessage };
    }
  }
}

module.exports = new Category();

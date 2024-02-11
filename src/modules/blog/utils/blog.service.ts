import BlogModel from './../schema/blog.schema';
import MongoQuery from './../../../helpers/mongo.query';
class BlogService {
  #MongoHelper: any;
  constructor() {
    this.#MongoHelper = MongoQuery;
  }
  async createBlog() {
    try {
      
    } catch (err) {

    }
  }

  async getBlog() {
    try {

    } catch (err) {

    }
  }

  async getBlogById() {
    try {

    } catch (err) {

    }
  }

  async updateBlogById() {
    try {

    } catch (err) {

    }
  }

}

export default BlogService;
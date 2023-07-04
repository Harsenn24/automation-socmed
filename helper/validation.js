async function validate_body(req) {
  try {
    const { user_id, post_link } = req.body;

    if (!user_id) {
      throw { message: "User Id is required" };
    }

    if (!post_link) {
      throw { message: "Post link is required" };
    }
  } catch (error) {
    return error;
  }
}

module.exports = validate_body

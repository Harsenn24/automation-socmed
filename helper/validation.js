async function validate_body_like(req) {
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

async function validate_body_comment(req) {
  try {
    const { user_id, post_link, user_comment } = req.body;

    if (!user_id) {
      throw { message: "User Id is required" };
    }

    if (!post_link) {
      throw { message: "Post link is required" };
    }

    if (!user_comment) {
      throw { message: "User comment is required" };
    }
  } catch (error) {
    return error;
  }
}

async function validate_body_comment_multiple(req) {
  try {
    const { user_data, post_link } = req.body;

    if (!user_data) {
      throw { message: "User data is required" };
    }

    if (!post_link) {
      throw { message: "Post link is required" };
    }
  } catch (error) {
    return error;
  }
}

async function validate_body_follow(req) {
  try {
    const { user_id, profile_link } = req.body;

    if (!user_id) {
      throw { message: "User id is required" };
    }

    if (!profile_link) {
      throw { message: "Profile link is required" };
    }
  } catch (error) {
    return error;
  }
}

module.exports = {
  validate_body_like,
  validate_body_comment,
  validate_body_comment_multiple,
  validate_body_follow,
};

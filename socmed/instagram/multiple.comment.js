async function comment_ig_multiple(req, res) {
  try {
    const check_validate = await validate_body_comment_multiple(req);

    if (check_validate) {
      throw { message: check_validate.message };
    }
    
    const { user_data, post_link } = req.body;
  } catch (error) {
    console.log(error);
    res.status(400).json(global_response("FAILED", 400, error));
  }
}

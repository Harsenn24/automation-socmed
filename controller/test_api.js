const global_response = require("../global_response");
const helper_comment_fb = require("../services/facebook/comment.fb");
const helper_like_fb = require("../services/facebook/like.fb");
const {
  validate_body_comment_multiple,
  validate_body_like,
} = require("../helper/validation");
const test_worker = require("../helper/worker/worker");

// async function test_api(req, res) {
//   try {
//     const check_validate = await validate_body_comment_multiple(req);

//     if (check_validate) {
//       throw { message: check_validate.message };
//     }

//     const { user_data, post_link } = req.body;

//     const { headless } = req.query;

//     res.status(200).json(global_response("success", 200, "processing data"));

//     await test_worker(
//       user_data,
//       post_link,
//       helper_comment_fb,
//       headless,
//       "Comment Facebook"
//     );
//   } catch (error) {
//     console.log(error);
//     res.status(400).json(global_response("failed", 200, error.message));
//   }
// }

async function test_api(req, res) {
  try {
    const check_validate = await validate_body_like(req);

    if (check_validate) {
      throw { message: check_validate.message };
    }

    const { user_id, post_link } = req.body;

    const { headless } = req.query;

    res.status(200).json(global_response("success", 200, "processing data"));

    await test_worker(
      user_id,
      post_link,
      helper_like_fb,
      headless,
      "Like Facebook"
    );

    res.status(200).json(global_response("Success", 200, result));
  } catch (error) {
    console.log(error);
    res.status(400).json(global_response("Failed", 400, error.message));
  }
}

module.exports = test_api;

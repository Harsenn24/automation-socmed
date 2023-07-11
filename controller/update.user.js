const { User } = require("../models/index");

async function update_user_account(user_account, error_message) {
  try {
    const [result_update] = await User.update(
      {
        running: false,
        detail: error_message,
      },
      {
        where: {
          user_id: user_account,
        },
      }
    );

    console.log(result_update);
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = update_user_account;

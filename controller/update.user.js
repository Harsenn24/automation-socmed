const { User } = require("../models/index");

async function update_user_account(user_account, error_message, running_status) {
  try {
    const [result_update] = await User.update(
      {
        running: running_status,
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

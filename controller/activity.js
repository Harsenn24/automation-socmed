const { AdminActivity } = require("../models/index");

async function update_user_activity(user_id, activity, status, error_message) {
  try {
    const data_input = { user_id, activity, status, error_message };
    await AdminActivity.create(data_input);
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = update_user_activity;

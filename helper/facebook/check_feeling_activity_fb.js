async function check_feeling_activity_fb(input) {
  try {
    console.log(input);
    const list_feeling_activity = require("../../data_adspower/feeeling.json");

    console.log(list_feeling_activity);

    const find_feeling_activity = list_feeling_activity.find(
      (el) => el.feeling_activity === input
    );

    console.log(find_feeling_activity);

    if (!find_feeling_activity) {
      throw { message: "input feeling or activity is incorrect!" };
    }
  } catch (error) {
    return error;
  }
}

module.exports = check_feeling_activity_fb;

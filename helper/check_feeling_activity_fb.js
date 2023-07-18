async function check_feeling_activity_fb(input) {
  try {
    const list_feeling_activity = require("../data_adspower/feeeling.json");

    for (let i = 0; i < list_feeling_activity.length; i++) {
      const element = list_feeling_activity[i];

      if (element.feeling_activity !== input) {
        throw { message: "input feeling activity is not match!" };
      }
    }
  } catch (error) {
    return error;
  }
}

module.exports = check_feeling_activity_fb;

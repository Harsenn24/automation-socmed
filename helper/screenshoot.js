const fs = require("fs");

async function screenshoot(page, user_id, activity) {
  try {
    let current_full_date = new Date();

    let current_date = String(current_full_date.getDate()).padStart(2, "0");

    let current_month = String(current_full_date.getMonth() + 1).padStart(
      2,
      "0"
    );

    let current_year = current_full_date.getFullYear();

    const hours = String(current_full_date.getHours()).padStart(2, "0");

    const minutes = String(current_full_date.getMinutes()).padStart(2, "0");

    const seconds = String(current_full_date.getSeconds()).padStart(2, "0");

    const time_full = `${hours}${minutes}${seconds}`;

    let date_string = `${current_date}-${current_month}-${current_year}`;

    let folder_path_date = `./screenshoot/${date_string}`;

    const check_folder_date = fs.existsSync(folder_path_date);

    if (!check_folder_date) {
      fs.mkdirSync(folder_path_date);
    }

    let folder_path_user = `${folder_path_date}/${user_id}`;

    const check_folder_user = fs.existsSync(folder_path_user);

    if (!check_folder_user) {
      fs.mkdirSync(folder_path_user);
    }

    await page.setViewport({ width: 1920, height: 1080 });

    await page.screenshot({
      path: `${folder_path_user}/${activity}-${time_full}.jpg`,
      fullPage: true,
    });
  } catch (error) {
    console.log(error, "==> error screenshoot!");
    return error;
  }
}

module.exports = screenshoot;

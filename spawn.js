const cp = require("child_process");

const process_app = cp.spawn("node", ["app.js"]);

process_app.stdout.on("data", (data) => {
  console.log(data);
});

process_app.stderr.on("data", (data) => {
  console.log(data);
});

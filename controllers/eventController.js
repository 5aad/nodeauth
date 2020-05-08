const Event = require("../models/events");
//add
module.exports.addevent = async (req, res) => {
  const newEvent = new Event({
    userID: req.user._id,
    name: req.body.name,
    description: req.body.description,
  });
  console.log("add", newEvent);
  try {
    await newEvent.save();
  } catch (e) {
    console.log("Error:", e.message);
  }
  res.redirect("/dashboard");
};
//view
exports.viewevent = async (req, res) => {
  const id = { userID: req.user.id };
  const events = await Event.find(id).sort({ createdAt: "desc" });
  res.render("dashboard", { events, page: "dashboard" });
};
//delete
module.exports.deleteevent = async (req, res) => {
  const { id } = req.params;
  await Event.findByIdAndDelete(id);
  res.redirect("/dashboard");
};
//edit
module.exports.editevent = async (req, res) => {
  await Event.findByIdAndUpdate(req.body.id, {
    name: req.body.name,
    description: req.body.description,
  });
  res.redirect("/dashboard");
};

// exports.test = function (req, res) {
//     res.send('Greetings from the Test controller!');
// };

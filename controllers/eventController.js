const Event = require("../models/events");

module.exports.addevent = async (req, res) => {
 const newEvent = new Event({
     name:req.body.name,
     description:req.body.description
 })
  console.log("dddddd",newEvent)
  try{
   await newEvent.save();
  }catch(e){
    console.log('Error:', e.message)
  }
  res.redirect("/dashboard");
};

exports.viewevent = async (req, res) => {
  const events = await Event.find().sort({ createdAt: "desc" });
  console.log("dsdsds",events[0].name)
  res.render("dashboard", { events, page: "dashboard" });
};

module.exports.deleteevent = async (req, res) => {
    const { id } = req.params;
    await Event.findByIdAndDelete(id);
    res.redirect("/dashboard");
  };

module.exports.editevent = async (req, res) => {
    await Event.findByIdAndUpdate(req.body.id, {
        name:req.body.name,
        description:req.body.description
    })
    res.redirect("/dashboard");
};

// exports.test = function (req, res) {
//     res.send('Greetings from the Test controller!');
// };

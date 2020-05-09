const Event = require("../models/events");
const Users=require('../models/User')
const Invites=require('../models/invites')
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
  const users=await Users.find({})
  const invites= await Invites.find()
  
  console.log("d",events)
  let invitearr=[]
  let request=[]
  for(let i=0;i<invites.length;i++){
    console.log(invites[0])
    if(invites[i].recepientName===req.user.name){
      invitearr.push(invites[i])
    }
  }

  for(let i=0;i<invites.length-1;i++){
    if(invites[i].senderName===req.user.name){
      request.push(invites[i])
    }
  }
 
  res.render("dashboard", { events,invites:invitearr,request:request,user:req.user,users:users, page: "dashboard" });
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
module.exports.inviteevent=async(req,res)=>{
  let arr=[]
  if(typeof(req.body.inviteUsers)==='string'){
    const recID= Users.findOne({name:req.body.inviteUsers})
    const newInvite = new Invites({
      senderName: req.body.sendername,
      eventName: req.body.eventname,
      eventDesc:req.body.description,
      recepientName: req.body.inviteUsers,
      accepted:''
    });
    //console.log("add", newInvite);
    try {
      await newInvite.save();
    } catch (e) {
      console.log("Error:", e.message);
    }
  }else{
    arr=req.body.inviteUsers
    arr.map(item=>{
     
      const newInvite = new Invites({
        senderName: req.body.sendername,
        eventName: req.body.eventname,
        eventDesc:req.body.description,
        recepientName: item,
        accepted:''
      });
      //console.log("add", newInvite);
      try {
        newInvite.save();
      } catch (e) {
        console.log("Error:", e.message);
      }
    })
  }
  
  res.redirect("/dashboard");
}
module.exports.updateInvite=async (req,res)=>{
  const { id } = req.params;
  console.log(id)
  await Invites.findByIdAndUpdate(id, {
    accepted:'accepted'
  });
  res.redirect("/dashboard");

}

module.exports.updateDecline=async (req,res)=>{
  const { id } = req.params;
  console.log(id)
  await Invites.findByIdAndUpdate(id, {
    accepted:'rejected'
  });
  res.redirect("/dashboard");

}
module.exports.inviteview=async(req,res)=>{
  
  const invites= await Invites.find(us=>us.recepientID===req.user._id)
  console.log(invites)
  res.redirect('/dashboard',{invites:invites})
}
// exports.test = function (req, res) {
//     res.send('Greetings from the Test controller!');
// };

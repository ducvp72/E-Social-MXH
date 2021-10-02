const mongoose = require("mongoose");
const userModel = require("./models/users");
const followerModel = require("./models/followers");

mongoose.connect("mongodb://localhost:27017/E-SocialDB");
const moment = require("moment-timezone");
const messageModel = require("./models/messages");
const groupModel = require("./models/groups");
const notificationModel = require("./models/notifications");

const user = {
  fullname: "Vo Phu Lam",
  birth: new Date("2/7/2000Z"),
  // birth: moment.tz("2/8/2000", "Asia/Bangkok"),
  gender: true,
  university: "UTE",
  img: "Hinh",
  nickname: "coolboy lanh lung",
  email: "18110101@student.hcmute.edu.vn",
  username: "ducthuhai",
  password: "123456789",
};

// userModel.create(user, (err, _user) => {
//   if (err) throw err;
//   console.log(user);
// });
followerModel.updateOne(
  { _id: mongoose.Types.ObjectId("615721eb0d019e2af6ffcd94") },
  { $push: { followers: mongoose.Types.ObjectId("61572217152d93f0c8cc5497") } },
  { upsert: true },
  (err, _user) => {
    if (err) throw err;
    notificationModel.create({
      user: "61572217152d93f0c8cc5497",
      text: "dc f...",
    });
    console.log(_user);
  }
);

notificationModel.find({user: "61572217152d93f0c8cc5497"},(err, notify)=>{
  console.log(notify);
})

// messageModel.create({
//   sender: '615721eb0d019e2af6ffcd94',
//   reciever: '61572217152d93f0c8cc5497'
// }).then(()=>{
//   notificationModel.create({
//     user:'61572217152d93f0c8cc5497',
//     text:'co tin nhan tu ...'
//   }).then(()=>{})
// }).catch(err=>{
//   console.log(err);
// })

// groupModel.create(
//   {
//     groupname: "chatall",
//     admin: mongoose.Types.ObjectId("61572217152d93f0c8cc5497"),
//   },
//   (err) => {
//     if (err) return console.log(err);
//     console.log("created");
//   }
// );

// messageModel.create({
//   sender:  mongoose.Types.ObjectId('61572217152d93f0c8cc5497'),
//   groups: mongoose.Types.ObjectId('615728c7593ad47b66814f6b')
// }).then(()=>{
//   console.log('created');
// }).catch(err=>{
//   console.log(err);
// })

// const del = async (err) =>{
//     await userModel.deleteOne({fullname:'Vo Phu Duc'});
//     if(err) throw err;
//     console.log("Deleted");
// };
// del();

// userModel
//   .findByIdAndUpdate(
//     "6155dc8746868a8eb59529f3",
//     { fullname: "Vo Phu Duc" },
//     { new: true }
//   )
//   .exec((err, _user) => {
//     if (err) throw err;
//     console.log(_user);
//   });

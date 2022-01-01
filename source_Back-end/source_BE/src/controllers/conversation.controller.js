const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const { conversationService, messageService } = require('../services');

const getUser = catchAsync(async (req, res) => {
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  options.populate = 'members';
  const result = await conversationService.getUser(req.user.id, options);
  const results = [];
  const { page, limit, totalPages, totalResults } = result;
  // eslint-disable-next-line no-restricted-syntax
  for (const conver of result.results) {
    
    const newConver = {};
    const { members, id } = conver;
    let users
    if(members.length!=1){
      const user = members.filter((member) => member.id != req.user.id);
        users = user[0];
    }
    else{
      continue;
    }
   
   const userId = users.id;
    const { fullname, avatar } = users;
    const lastMessage = await messageService.getLastMessageFromConversation(req.user.id, conver.id);
    // eslint-disable-next-line no-await-in-loop
    results.push(
      Object.assign(newConver, {
        id,
        userId,
        fullname,
        avatar,
        lastMessage,
      })
    );
  }
  res.send({
    results,
    page,
    limit,
    totalPages,
    totalResults,
  });
});
const createPrivate = catchAsync(async (req, res) => {
  const conversation = await conversationService.createPrivate(req.user.id, req.body.userId);
  res.status(httpStatus.OK).send(conversation);
});
const createGroup = catchAsync(async (req, res) => {
  const conversation = await conversationService.createGroup(req.user.id, req.body.groupUserId);
  res.status(httpStatus.OK).send(conversation);
});
const addMemberToGroup = catchAsync(async (req, res) => {
  const conversation = await conversationService.addMemberToGroup(req.user.id, req.body.userId, req.body.conversationId);
  res.status(httpStatus.OK).send(conversation);
});
const getPrivateConversation = catchAsync(async (req, res) => {
  const conversation = await conversationService.getPrivate(req.user.id, req.body.userId);
  res.status(httpStatus.OK).send(conversation);
});
const outGroup = catchAsync(async (req, res) => {
  const conversation = await conversationService.outGroup(req.user.id, req.body.conversationId);
  res.status(httpStatus.OK).send(conversation);
});
module.exports = {
  getUser,
  createPrivate,
  addMemberToGroup,
  createGroup,
  getPrivateConversation,
  outGroup,
};

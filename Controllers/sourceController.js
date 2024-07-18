const expendType = require("../Models/AccountModel/expendTypeSchema");
const sourceModel = require("../Models/SourceModel/sourceSchema");
const { findModal, createModal } = require("./commonController");

exports.getSource = findModal(sourceModel,{groupId:true},"sourceName");
exports.createSource = createModal(sourceModel);
exports.getExpendType=findModal(expendType,{groupId:true},"expendName")
exports.createExpendType = createModal(expendType);
const expendType = require("../Model/AccountModels/expendTypeSchema");
const sourceModel = require("../Model/SourceModels/sourceSchema");
const { findModal, createModal } = require("./commonController");

exports.getSource = findModal(sourceModel,{},"sourceName");
exports.createSource = createModal(sourceModel);
exports.getExpendType=findModal(expendType,{},"expendName")
exports.createExpendType = createModal(expendType);
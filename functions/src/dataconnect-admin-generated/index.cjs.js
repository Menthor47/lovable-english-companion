const { validateAdminArgs } = require('firebase-admin/data-connect');

const connectorConfig = {
  connector: 'example',
  serviceId: 'lovable-english-companion',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

function createDemoUser(dcOrOptions, options) {
  const { dc: dcInstance, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrOptions, options, undefined);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('CreateDemoUser', undefined, inputOpts);
}
exports.createDemoUser = createDemoUser;

function listProjectsForCurrentUser(dcOrOptions, options) {
  const { dc: dcInstance, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrOptions, options, undefined);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('ListProjectsForCurrentUser', undefined, inputOpts);
}
exports.listProjectsForCurrentUser = listProjectsForCurrentUser;

function createTask(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('CreateTask', inputVars, inputOpts);
}
exports.createTask = createTask;

function listCompetitors(dcOrOptions, options) {
  const { dc: dcInstance, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrOptions, options, undefined);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('ListCompetitors', undefined, inputOpts);
}
exports.listCompetitors = listCompetitors;


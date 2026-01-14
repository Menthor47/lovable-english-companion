import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'lovable-english-companion',
  location: 'us-east4'
};

export const createDemoUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateDemoUser');
}
createDemoUserRef.operationName = 'CreateDemoUser';

export function createDemoUser(dc) {
  return executeMutation(createDemoUserRef(dc));
}

export const listProjectsForCurrentUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListProjectsForCurrentUser');
}
listProjectsForCurrentUserRef.operationName = 'ListProjectsForCurrentUser';

export function listProjectsForCurrentUser(dc) {
  return executeQuery(listProjectsForCurrentUserRef(dc));
}

export const createTaskRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateTask', inputVars);
}
createTaskRef.operationName = 'CreateTask';

export function createTask(dcOrVars, vars) {
  return executeMutation(createTaskRef(dcOrVars, vars));
}

export const listCompetitorsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListCompetitors');
}
listCompetitorsRef.operationName = 'ListCompetitors';

export function listCompetitors(dc) {
  return executeQuery(listCompetitorsRef(dc));
}


import { ConnectorConfig, DataConnect, OperationOptions, ExecuteOperationResponse } from 'firebase-admin/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;


export interface Competitor_Key {
  id: UUIDString;
  __typename?: 'Competitor_Key';
}

export interface CreateDemoUserData {
  user_insert: User_Key;
}

export interface CreateTaskData {
  task_insert: Task_Key;
}

export interface CreateTaskVariables {
  projectId: UUIDString;
  title: string;
  dueDate: DateString;
  status: string;
}

export interface Keyword_Key {
  id: UUIDString;
  __typename?: 'Keyword_Key';
}

export interface ListCompetitorsData {
  competitors: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    websiteUrl: string;
  } & Competitor_Key)[];
}

export interface ListProjectsForCurrentUserData {
  projects: ({
    id: UUIDString;
    name: string;
    description?: string | null;
  } & Project_Key)[];
}

export interface Project_Key {
  id: UUIDString;
  __typename?: 'Project_Key';
}

export interface Task_Key {
  id: UUIDString;
  __typename?: 'Task_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

/** Generated Node Admin SDK operation action function for the 'CreateDemoUser' Mutation. Allow users to execute without passing in DataConnect. */
export function createDemoUser(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateDemoUserData>>;
/** Generated Node Admin SDK operation action function for the 'CreateDemoUser' Mutation. Allow users to pass in custom DataConnect instances. */
export function createDemoUser(options?: OperationOptions): Promise<ExecuteOperationResponse<CreateDemoUserData>>;

/** Generated Node Admin SDK operation action function for the 'ListProjectsForCurrentUser' Query. Allow users to execute without passing in DataConnect. */
export function listProjectsForCurrentUser(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<ListProjectsForCurrentUserData>>;
/** Generated Node Admin SDK operation action function for the 'ListProjectsForCurrentUser' Query. Allow users to pass in custom DataConnect instances. */
export function listProjectsForCurrentUser(options?: OperationOptions): Promise<ExecuteOperationResponse<ListProjectsForCurrentUserData>>;

/** Generated Node Admin SDK operation action function for the 'CreateTask' Mutation. Allow users to execute without passing in DataConnect. */
export function createTask(dc: DataConnect, vars: CreateTaskVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateTaskData>>;
/** Generated Node Admin SDK operation action function for the 'CreateTask' Mutation. Allow users to pass in custom DataConnect instances. */
export function createTask(vars: CreateTaskVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateTaskData>>;

/** Generated Node Admin SDK operation action function for the 'ListCompetitors' Query. Allow users to execute without passing in DataConnect. */
export function listCompetitors(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<ListCompetitorsData>>;
/** Generated Node Admin SDK operation action function for the 'ListCompetitors' Query. Allow users to pass in custom DataConnect instances. */
export function listCompetitors(options?: OperationOptions): Promise<ExecuteOperationResponse<ListCompetitorsData>>;


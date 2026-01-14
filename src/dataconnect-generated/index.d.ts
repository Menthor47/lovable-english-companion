import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

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

interface CreateDemoUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateDemoUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateDemoUserData, undefined>;
  operationName: string;
}
export const createDemoUserRef: CreateDemoUserRef;

export function createDemoUser(): MutationPromise<CreateDemoUserData, undefined>;
export function createDemoUser(dc: DataConnect): MutationPromise<CreateDemoUserData, undefined>;

interface ListProjectsForCurrentUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListProjectsForCurrentUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListProjectsForCurrentUserData, undefined>;
  operationName: string;
}
export const listProjectsForCurrentUserRef: ListProjectsForCurrentUserRef;

export function listProjectsForCurrentUser(): QueryPromise<ListProjectsForCurrentUserData, undefined>;
export function listProjectsForCurrentUser(dc: DataConnect): QueryPromise<ListProjectsForCurrentUserData, undefined>;

interface CreateTaskRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTaskVariables): MutationRef<CreateTaskData, CreateTaskVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateTaskVariables): MutationRef<CreateTaskData, CreateTaskVariables>;
  operationName: string;
}
export const createTaskRef: CreateTaskRef;

export function createTask(vars: CreateTaskVariables): MutationPromise<CreateTaskData, CreateTaskVariables>;
export function createTask(dc: DataConnect, vars: CreateTaskVariables): MutationPromise<CreateTaskData, CreateTaskVariables>;

interface ListCompetitorsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListCompetitorsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListCompetitorsData, undefined>;
  operationName: string;
}
export const listCompetitorsRef: ListCompetitorsRef;

export function listCompetitors(): QueryPromise<ListCompetitorsData, undefined>;
export function listCompetitors(dc: DataConnect): QueryPromise<ListCompetitorsData, undefined>;


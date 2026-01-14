import { CreateDemoUserData, ListProjectsForCurrentUserData, CreateTaskData, CreateTaskVariables, ListCompetitorsData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateDemoUser(options?: useDataConnectMutationOptions<CreateDemoUserData, FirebaseError, void>): UseDataConnectMutationResult<CreateDemoUserData, undefined>;
export function useCreateDemoUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateDemoUserData, FirebaseError, void>): UseDataConnectMutationResult<CreateDemoUserData, undefined>;

export function useListProjectsForCurrentUser(options?: useDataConnectQueryOptions<ListProjectsForCurrentUserData>): UseDataConnectQueryResult<ListProjectsForCurrentUserData, undefined>;
export function useListProjectsForCurrentUser(dc: DataConnect, options?: useDataConnectQueryOptions<ListProjectsForCurrentUserData>): UseDataConnectQueryResult<ListProjectsForCurrentUserData, undefined>;

export function useCreateTask(options?: useDataConnectMutationOptions<CreateTaskData, FirebaseError, CreateTaskVariables>): UseDataConnectMutationResult<CreateTaskData, CreateTaskVariables>;
export function useCreateTask(dc: DataConnect, options?: useDataConnectMutationOptions<CreateTaskData, FirebaseError, CreateTaskVariables>): UseDataConnectMutationResult<CreateTaskData, CreateTaskVariables>;

export function useListCompetitors(options?: useDataConnectQueryOptions<ListCompetitorsData>): UseDataConnectQueryResult<ListCompetitorsData, undefined>;
export function useListCompetitors(dc: DataConnect, options?: useDataConnectQueryOptions<ListCompetitorsData>): UseDataConnectQueryResult<ListCompetitorsData, undefined>;

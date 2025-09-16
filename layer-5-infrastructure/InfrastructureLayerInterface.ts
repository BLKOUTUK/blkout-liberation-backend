/**
 * Task 1.3 Layer 6: Infrastructure Layer Interface
 * 
 * SCOPE: Interface contracts for infrastructure operations ONLY
 * DOES NOT: Make governance decisions, implement data sovereignty policies, or handle business logic
 * ONLY: Defines infrastructure service contracts and platform reliability operations
 */

import { DataOperation, DataOperationResult } from '../Task_1_2_Community_Data_Sovereignty_Layer/CommunityDataSovereigntyInterface';

/**
 * Core infrastructure service interface - INFRASTRUCTURE OPERATIONS ONLY
 */
export interface InfrastructureLayerInterface {
  // Executes infrastructure operations as instructed by Layer 5
  executeInfrastructureOperation(operation: InfrastructureOperation): Promise<InfrastructureOperationResult>;
  
  // Provides infrastructure services to support data sovereignty
  provideInfrastructureService(request: InfrastructureServiceRequest): Promise<InfrastructureServiceResponse>;
  
  // Reports infrastructure status back to Layer 5
  reportInfrastructureStatus(serviceType: string): Promise<InfrastructureStatus>;
}

/**
 * Database Infrastructure Service - DATABASE OPERATIONS ONLY
 */
export interface DatabaseInfrastructureService {
  // Connection Management - infrastructure only
  establishConnection(config: SupabaseConfig): Promise<SupabaseClient>;
  manageConnectionPool(maxConnections: number): ConnectionPool;
  handleConnectionFailover(): Promise<void>;
  
  // Query Execution - no data sovereignty decisions
  executeQuery(query: string, params: any[]): Promise<QueryResult>;
  executeBatch(queries: BatchQuery[]): Promise<BatchResult>;
  handleQueryTimeout(query: Query): Promise<void>;
  
  // Schema Management - Layer 5 directed
  applySchemaChanges(migrations: Migration[]): Promise<void>;
  enforceRowLevelSecurity(policies: RLSPolicy[]): Promise<void>;
  
  // Database Health - infrastructure monitoring only
  monitorDatabaseHealth(): Promise<DatabaseHealth>;
}

/**
 * Redis Infrastructure Service - CACHING OPERATIONS ONLY
 */
export interface RedisInfrastructureService {
  // Cache Management - infrastructure only
  establishRedisConnection(config: RedisConfig): Promise<RedisClient>;
  manageCacheExpiry(key: string, ttl: number): Promise<void>;
  handleCacheFailover(): Promise<void>;
  
  // Pub/Sub Operations - message delivery only
  publishMessage(channel: string, message: any): Promise<void>;
  subscribeToChannel(channel: string, handler: MessageHandler): Promise<void>;
  manageSubscriptions(): Promise<SubscriptionStatus>;
  
  // Coordination Services - infrastructure coordination only
  coordinateServiceCommunication(services: ServiceEndpoint[]): Promise<void>;
  handleCoordinationFailure(service: string): Promise<void>;
  
  // Redis Health - infrastructure monitoring only
  monitorRedisHealth(): Promise<RedisHealth>;
}

/**
 * N8N Workflow Infrastructure Service - WORKFLOW EXECUTION ONLY
 */
export interface N8NInfrastructureService {
  // Workflow Execution - automation only
  executeWorkflow(workflowId: string, data: WorkflowData): Promise<WorkflowResult>;
  monitorWorkflowExecution(executionId: string): Promise<WorkflowExecutionStatus>;
  handleWorkflowFailure(executionId: string): Promise<void>;
  
  // Workflow Management - infrastructure management only
  deployWorkflow(workflow: N8NWorkflow): Promise<DeploymentResult>;
  updateWorkflowConfiguration(config: WorkflowConfig): Promise<void>;
  manageWorkflowScheduling(schedule: WorkflowSchedule): Promise<void>;
  
  // N8N Health - infrastructure monitoring only
  monitorN8NHealth(): Promise<N8NHealth>;
}

/**
 * API Gateway Infrastructure Service - API OPERATIONS ONLY
 */
export interface APIGatewayInfrastructureService {
  // Request Routing - infrastructure routing only
  routeRequest(request: APIRequest): Promise<APIResponse>;
  handleServiceDiscovery(services: ServiceRegistry): Promise<void>;
  manageLoadBalancing(endpoints: ServiceEndpoint[]): Promise<void>;
  
  // Rate Limiting - infrastructure protection only
  enforceRateLimit(clientId: string, limits: RateLimit): Promise<RateLimitResult>;
  handleRateLimitViolation(violation: RateLimitViolation): Promise<void>;
  
  // Security - infrastructure security only
  enforceAPIAuthentication(token: string): Promise<AuthenticationResult>;
  validateAPIAuthorization(request: APIRequest): Promise<AuthorizationResult>;
  
  // API Health - infrastructure monitoring only
  monitorAPIHealth(): Promise<APIHealth>;
}

/**
 * Infrastructure Monitoring Service - MONITORING OPERATIONS ONLY
 */
export interface InfrastructureMonitoringService {
  // System Health Monitoring - infrastructure monitoring only
  monitorSystemHealth(components: string[]): Promise<SystemHealth>;
  trackPerformanceMetrics(services: ServiceMetrics[]): Promise<PerformanceReport>;
  handleHealthCheckFailures(failures: HealthCheckFailure[]): Promise<void>;
  
  // Error Tracking - infrastructure error tracking only
  trackInfrastructureErrors(errors: InfrastructureError[]): Promise<void>;
  generateErrorReports(timeframe: TimeRange): Promise<ErrorReport>;
  
  // Uptime Monitoring - infrastructure reliability only
  monitorServiceUptime(services: string[]): Promise<UptimeReport>;
  handleServiceDowntime(service: string): Promise<void>;
  
  // Infrastructure Transparency - community transparency only
  generatePublicDashboard(metrics: CommunityMetrics): Promise<PublicDashboard>;
  provideCommunityTransparency(data: TransparencyData): Promise<void>;
}

/**
 * Infrastructure operation structure
 */
export interface InfrastructureOperation {
  operationId: string;
  operationType: 'database' | 'cache' | 'workflow' | 'api' | 'monitoring';
  serviceTarget: string;
  operationInstructions: string;
  layerFiveDirectives: string; // Instructions from Layer 5
  governanceCompliance: boolean;
  timestamp: Date;
  
  // Infrastructure-specific parameters
  infraConfig: InfrastructureConfig;
  performanceRequirements: PerformanceRequirements;
  reliabilityRequirements: ReliabilityRequirements;
}

/**
 * Infrastructure operation result structure
 */
export interface InfrastructureOperationResult {
  operationId: string;
  success: boolean;
  timestamp: Date;
  infrastructureServicesExecuted: string[];
  performanceMet: boolean;
  reliabilityMaintained: boolean;
  
  // Results for Layer 5 reporting
  serviceStatus: ServiceStatus[];
  infrastructureHealth: InfrastructureHealthSummary;
  
  // Error handling
  errors: InfrastructureError[];
  recoveryActions: string[];
}

/**
 * Infrastructure service request structure
 */
export interface InfrastructureServiceRequest {
  requestId: string;
  serviceType: 'database' | 'cache' | 'workflow' | 'api' | 'monitoring';
  serviceOperation: string;
  layerFiveInstructions: string;
  governanceCompliance: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
}

/**
 * Infrastructure service response structure
 */
export interface InfrastructureServiceResponse {
  requestId: string;
  serviceProvided: boolean;
  serviceType: string;
  responseData: any;
  performanceMetrics: ServicePerformanceMetrics;
  reliabilityStatus: ServiceReliabilityStatus;
}

/**
 * Infrastructure status structure
 */
export interface InfrastructureStatus {
  serviceType: string;
  statusType: 'healthy' | 'degraded' | 'offline' | 'maintenance';
  uptime: number;
  lastHealthCheck: Date;
  performanceMetrics: ServicePerformanceMetrics;
  errorRate: number;
  
  // Community transparency data
  communityVisible: boolean;
  transparencyLevel: 'full' | 'partial' | 'minimal';
}

// ===== INFRASTRUCTURE CONFIGURATION INTERFACES =====

/**
 * Supabase configuration structure
 */
export interface SupabaseConfig {
  url: string;
  anonKey: string;
  serviceRoleKey: string;
  maxConnections: number;
  connectionTimeout: number;
  rlsEnabled: boolean;
}

/**
 * Redis configuration structure
 */
export interface RedisConfig {
  host: string;
  port: number;
  password: string;
  database: number;
  maxConnections: number;
  reconnectAttempts: number;
}

/**
 * Infrastructure configuration structure
 */
export interface InfrastructureConfig {
  environment: 'development' | 'staging' | 'production';
  region: string;
  scalingPolicy: ScalingPolicy;
  backupPolicy: BackupPolicy;
  monitoringEnabled: boolean;
  communityTransparencyEnabled: boolean;
}

/**
 * Performance requirements structure
 */
export interface PerformanceRequirements {
  maxResponseTime: number;
  maxThroughput: number;
  minAvailability: number;
  maxErrorRate: number;
}

/**
 * Reliability requirements structure
 */
export interface ReliabilityRequirements {
  maxDowntime: number;
  backupFrequency: number;
  failoverTimeout: number;
  recoveryTimeObjective: number;
}

// ===== INFRASTRUCTURE DATA STRUCTURES =====

/**
 * Supabase client interface
 */
export interface SupabaseClient {
  from: (table: string) => SupabaseQueryBuilder;
  rpc: (fn: string, params?: any) => Promise<any>;
  auth: SupabaseAuth;
  storage: SupabaseStorage;
}

/**
 * Connection pool interface
 */
export interface ConnectionPool {
  acquire(): Promise<Connection>;
  release(connection: Connection): void;
  size(): number;
  available(): number;
}

/**
 * Query result structure
 */
export interface QueryResult {
  data: any[];
  error: Error | null;
  count: number;
  status: number;
  statusText: string;
}

/**
 * Batch query structure
 */
export interface BatchQuery {
  query: string;
  params: any[];
  priority: 'low' | 'medium' | 'high';
}

/**
 * Migration structure
 */
export interface Migration {
  version: string;
  up: string;
  down: string;
  timestamp: Date;
}

/**
 * Row Level Security policy structure
 */
export interface RLSPolicy {
  table: string;
  policyName: string;
  policyDefinition: string;
  roles: string[];
}

/**
 * Database health structure
 */
export interface DatabaseHealth {
  connectionStatus: 'healthy' | 'degraded' | 'offline';
  activeConnections: number;
  queryPerformance: PerformanceMetrics;
  errorRate: number;
  lastHealthCheck: Date;
}

/**
 * Redis client interface
 */
export interface RedisClient {
  get: (key: string) => Promise<string | null>;
  set: (key: string, value: string, ttl?: number) => Promise<void>;
  del: (key: string) => Promise<number>;
  publish: (channel: string, message: string) => Promise<void>;
  subscribe: (channel: string) => Promise<void>;
}

/**
 * Message handler interface
 */
export interface MessageHandler {
  (channel: string, message: string): void;
}

/**
 * Service endpoint structure
 */
export interface ServiceEndpoint {
  serviceName: string;
  url: string;
  port: number;
  protocol: 'http' | 'https' | 'ws' | 'wss';
  healthCheck: string;
}

/**
 * N8N workflow structure
 */
export interface N8NWorkflow {
  id: string;
  name: string;
  nodes: WorkflowNode[];
  connections: WorkflowConnection[];
  settings: WorkflowSettings;
}

/**
 * Workflow data structure
 */
export interface WorkflowData {
  input: Record<string, any>;
  context: WorkflowContext;
  triggers: WorkflowTrigger[];
}

/**
 * API request structure
 */
export interface APIRequest {
  method: string;
  url: string;
  headers: Record<string, string>;
  body: any;
  clientId: string;
  timestamp: Date;
}

/**
 * Rate limit structure
 */
export interface RateLimit {
  requestsPerMinute: number;
  requestsPerHour: number;
  requestsPerDay: number;
  burstLimit: number;
}

/**
 * Service performance metrics structure
 */
export interface ServicePerformanceMetrics {
  responseTime: number;
  throughput: number;
  errorRate: number;
  cpuUsage: number;
  memoryUsage: number;
}

/**
 * Service reliability status structure
 */
export interface ServiceReliabilityStatus {
  uptime: number;
  lastFailure: Date | null;
  recoveryTime: number;
  mtbf: number; // Mean Time Between Failures
  mttr: number; // Mean Time To Recovery
}

/**
 * Infrastructure health summary structure
 */
export interface InfrastructureHealthSummary {
  overallHealth: 'healthy' | 'degraded' | 'offline';
  serviceHealth: Record<string, ServiceHealth>;
  performanceScore: number;
  reliabilityScore: number;
}

/**
 * Service health structure
 */
export interface ServiceHealth {
  status: 'healthy' | 'degraded' | 'offline';
  lastCheck: Date;
  issues: HealthIssue[];
  recommendations: string[];
}

/**
 * Infrastructure error structure
 */
export interface InfrastructureError {
  errorId: string;
  service: string;
  errorType: string;
  message: string;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high' | 'critical';
  resolved: boolean;
}

/**
 * Public dashboard structure for community transparency
 */
export interface PublicDashboard {
  dashboardId: string;
  metrics: CommunityVisibleMetrics;
  services: ServiceStatus[];
  uptime: UptimeMetrics;
  performance: PublicPerformanceMetrics;
  lastUpdated: Date;
}

/**
 * Community visible metrics structure
 */
export interface CommunityVisibleMetrics {
  totalUsers: number;
  activeServices: number;
  systemUptime: number;
  responseTime: number;
  communityDataProtected: boolean;
  creatorSovereigntyMaintained: boolean;
}
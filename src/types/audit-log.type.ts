export interface AuditLog {
  id: string;
  time: Date;
  userId: string;
  userName: string;
  service: string;
  action: string;
  duration: string;
  ipAddress: string;
  browser: string;
  parameters: string;
}

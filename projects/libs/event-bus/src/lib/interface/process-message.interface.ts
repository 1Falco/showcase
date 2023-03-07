export interface ProcessMessage {
  commandType: CommandType;
  commandId: string;
  userId: string;
  caseElementId: number;
  caseId: string;
  status: ProcessStatus;
  featureId: number;
  modelId: string;
  body: any;
}

interface ProcessStatus {

}
enum CommandType {

}

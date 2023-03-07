import { Injectable } from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from '@microsoft/signalr';
import { EventBusService } from '../event-bus.service';
import { EmitEvent } from '../emit-event';
import { ProcessMessage } from '../interface/process-message.interface';
import { ProcessingEmitEvent } from '../enums/processing-emit-event';

@Injectable({ providedIn: 'platform' })
export class SignalrService {
  private connection: HubConnection | undefined;

  private readonly featureProcessingCommands = [];
  private readonly caseProcessingCommands = [];
  // private readonly caseProcessingCommands = [
  //   CommandType.UPLOAD_DICOM,
  //   CommandType.UPLOAD_STL,
  //   CommandType.UPLOAD_OBJ,
  //   CommandType.UPLOAD_VIDEO,
  //   CommandType.UPLOAD_PRESENTATION,

  //   CommandType.UPLOAD_PHOTO,
  //   CommandType.UPLOAD_AUDIO,
  //   CommandType.UPLOAD_GUIDE,
  //   CommandType.UPLOAD_PLANNING,
  //   CommandType.UPLOAD_TEXT,
  //   CommandType.UPLOAD_DICOM_VIDEO,
  //   CommandType.UPLOAD_GUIDE_RESULT,

  //   CommandType.MERGE_MESH,
  // ];
  // private readonly featureProcessingCommands = [
  //   CommandType.SEGMENTATION,
  //   CommandType.SPECT,
  // ];

  constructor(private eventService: EventBusService) {}

  public stopConnection() {
    this.connection?.stop();
  }

  private buildConnection(signalRHost: string, userID: string): HubConnection {
    const token: string = sessionStorage.getItem('accessToken') as string;
    return new HubConnectionBuilder()
      .withUrl(
        `${signalRHost}/hubs/messagesHub?userId=${userID}&access_token=${token}`,
        { accessTokenFactory: () => token }
      )
      .configureLogging(LogLevel.Error)
      .build();
  }

  public startConnection(signalRHost: string, userID: string): HubConnection | undefined {
    if (
      this.connection?.state == HubConnectionState.Connected ||
      this.connection?.state == HubConnectionState.Connecting ||
      this.connection?.state == HubConnectionState.Reconnecting
    ) {
      return;
    }
    if (this.connection?.state == HubConnectionState.Disconnected) {
      this.connect();
      return;
    }

    this.connection = this.buildConnection(signalRHost, userID);
    this.connection.on('receiveMessage', (response: ProcessMessage) => {
      if (
        this.caseProcessingCommands.some(
          (type) => type === response.commandType
        )
      ) {
        this.eventService.emit(
          new EmitEvent(ProcessingEmitEvent.EventProcessing, response)
        );
        return;
      }
      if (
        this.featureProcessingCommands.some(
          (type) => type === response.commandType
        )
      ) {
        this.eventService.emit(
          new EmitEvent(ProcessingEmitEvent.FeatureProcessing, response)
        );
        return;
      }
    });
    this.connect();
    return this.connection;
  }

  private connect() {
    this.connection?.start().catch((err) => {
      console.error('Error while starting connection: ' + err);
    });
  }
}

import ConnectorClient from "./connector/ConnectorClient";
import MetricClient from "./metric/MetricClient";
import AuthClient from "./mgmt/AuthClient";
import ModelClient from "./model/ModelClient";
import OperationClient from "./operation/OperationClient";
import PipelineClient from "./pipeline/PipelineClient";
import { Nullable } from "./types";

class InstillClient {
  public Pipeline: PipelineClient;
  public Auth: AuthClient;
  public Connector: ConnectorClient;
  public Metric: MetricClient;
  public Model: ModelClient;
  public Operation: OperationClient;

  constructor(
    baseUrl: string,
    appVersion: string,
    accessToken: Nullable<string>
  ) {
    this.Pipeline = new PipelineClient(baseUrl, appVersion, accessToken);
    this.Auth = new AuthClient(baseUrl, appVersion, accessToken);
    this.Connector = new ConnectorClient(baseUrl, appVersion, accessToken);
    this.Metric = new MetricClient(baseUrl, appVersion, accessToken);
    this.Model = new ModelClient(baseUrl, appVersion, accessToken);
    this.Operation = new OperationClient(baseUrl, appVersion, accessToken);
  }
}

export * from "./types";
export * from "./connector";
export * from "./helper";
export * from "./metric";
export * from "./mgmt";
export * from "./model";
export * from "./operation";
export * from "./pipeline";
export default InstillClient;

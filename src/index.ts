import ConnectorClient from "./connector/ConnectorClient";
import MetricClient from "./metric/MetricClient";
import AuthClient from "./mgmt/AuthClient";
import ModelClient from "./model/ModelClient";
import OperationClient from "./operation/OperationClient";
import PipelineClient from "./pipeline/PipelineClient";
import OrganizationClient from "./organization/OrganizationClient";

class InstillClient {
  public Pipeline: PipelineClient;
  public Auth: AuthClient;
  public Connector: ConnectorClient;
  public Metric: MetricClient;
  public Model: ModelClient;
  public Operation: OperationClient;
  public Organization: OrganizationClient;

  constructor(baseUrl: string, appVersion: string, apiToken: string) {
    this.Pipeline = new PipelineClient(baseUrl, appVersion, apiToken);
    this.Auth = new AuthClient(baseUrl, appVersion, apiToken);
    this.Connector = new ConnectorClient(baseUrl, appVersion, apiToken);
    this.Metric = new MetricClient(baseUrl, appVersion, apiToken);
    this.Model = new ModelClient(baseUrl, appVersion, apiToken);
    this.Operation = new OperationClient(baseUrl, appVersion, apiToken);
    this.Organization = new OrganizationClient(baseUrl, appVersion, apiToken);
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
export * from "./organization";
export default InstillClient;

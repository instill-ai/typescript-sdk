export type Operation = {
  name: string;
  response: any;
  metadata: any;
  done: boolean;
};

export type GetModelOperationResponse = {
  operation: Operation;
};

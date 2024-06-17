export interface Process {
  id: number;
  npu: string;
  dataCadastro: Date;
  dataVisualizacao?: Date;
  municipio: string;
  uf: string;
  documento: string;
  visualizado: boolean;
}

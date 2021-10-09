import { Cliente } from "./clientes";
import { Tecnico } from "./tecnicos";

export interface Chamado {
    id?:             any;
    dataAbertura?:   string;
    dataFechamento?: string;
    prioridade:      string;
    status:          string;
    titulo:          string;
    observacoes:     string;
    tecnico:         any; // ou any se der pau
    cliente:         any; // ou any se der pau
    nomeCliente:     string;
    nomeTecnico:     string;
}
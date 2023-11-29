import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  ligado: boolean = true;
  memoria: string = "";
  is_novo_calculo: boolean = false;
  verifica_zero: boolean = true;

  primeiro_elemento: string = "";

  operador_inserido: boolean = false;
  operador: string = "";

  segundo_elemento: string = "";
  is_segundo_elemento: boolean = false;

  resultado: string = "0";
  resultadoAnterior: string = ""

  constructor(private toastController: ToastController) { }

  digitos(valor: string) {
    if (!this.ligado) return;

    const combinedInputLength = this.resultado.length + this.operador.length + this.segundo_elemento.length;

    if (combinedInputLength >= 20) {
      this.alerta("O limite de caracteres foi atingido.");
      return;
    }

    if (this.is_novo_calculo) {
      this.resetar();
      if (this.is_segundo_elemento && !this.operador.includes('%')) {
        this.segundo_elemento += valor;
        this.resultado += valor;
      } else {
        if (!this.operador.includes('%')) {
          if (this.verifica_zero) {
            this.resultado = valor;
            this.verifica_zero = false;
          } else {
            this.resultado += valor;
          }
        } else {
          this.alerta("Não é possível adicionar mais números após a operação de porcentagem.");
        }
      }
    } else {
      if (this.is_segundo_elemento && !this.operador.includes('%')) {
        this.segundo_elemento += valor;
        this.resultado += valor;
      } else {
        if (!this.operador.includes('%')) {
          if (this.verifica_zero) {
            this.resultado = valor;
            this.verifica_zero = false;
          } else {
            this.resultado += valor;
          }
        } else {
          this.alerta("Não é possível adicionar mais números após a operação de porcentagem.");
        }
      }
    }
  }

  operadores(operador: string) {
    if (!this.ligado) return;

    const combinedInputLength = this.resultado.length + this.operador.length;

    if (combinedInputLength >= 20) {
      this.alerta("O limite de caracteres foi atingido.");
      return;
    }

    if (!this.operador_inserido && this.verifica_zero == false) {
      this.primeiro_elemento = this.resultado;
      this.resultado += operador;
      this.operador_inserido = true;
      this.operador = operador;
      this.is_segundo_elemento = true;
    }
  }

  calcular() {
    if (!this.ligado) return;

    if (this.operador == "+" && this.segundo_elemento != "") {
      this.resultado = (parseFloat(this.primeiro_elemento) + parseFloat(this.segundo_elemento)).toString();
      this.memoria = this.primeiro_elemento + this.operador + this.segundo_elemento + " = " + this.resultado;
      this.resultadoAnterior = this.resultado;
      this.resetarCalculo();
    } else if (this.operador == "-" && this.segundo_elemento != "") {
      this.resultado = (parseFloat(this.primeiro_elemento) - parseFloat(this.segundo_elemento)).toString();
      this.memoria = this.primeiro_elemento + this.operador + this.segundo_elemento + " = " + this.resultado;
      this.resultadoAnterior = this.resultado;
      this.resetarCalculo();
    } else if (this.operador == "*" && this.segundo_elemento != "") {
      this.resultado = (parseFloat(this.primeiro_elemento) * parseFloat(this.segundo_elemento)).toString();
      this.memoria = this.primeiro_elemento + this.operador + this.segundo_elemento + " = " + this.resultado;
      this.resultadoAnterior = this.resultado;
      this.resetarCalculo();
    } else if (this.operador == "/" && this.segundo_elemento != "") {
      this.resultado = (parseFloat(this.primeiro_elemento) / parseFloat(this.segundo_elemento)).toString();
      this.memoria = this.primeiro_elemento + this.operador + this.segundo_elemento + " = " + this.resultado;
      this.resultadoAnterior = this.resultado;
      this.resetarCalculo();
    } else if (this.operador == "%") {
      this.resultado = (parseFloat(this.primeiro_elemento) / 100).toString();
      this.memoria = this.primeiro_elemento + this.operador + " = " + this.resultado;
      this.resultadoAnterior = this.resultado;
      this.resetarCalculo();
      this.is_segundo_elemento = false;
    } else {
      if (this.operador == "") {
        this.alerta("Nenhum operador foi selecionado.");
      } else if (this.segundo_elemento == "") {
        this.alerta("O segundo elemento não foi definido.");
      } else {
        this.alerta("Tudo está definido corretamente.");
      }
    }
  }

  continuarOperacao() {
    if (this.resultadoAnterior !== "") {
      this.primeiro_elemento = this.resultadoAnterior;
      this.resultado = this.resultadoAnterior;
      this.operador_inserido = true;
      this.is_novo_calculo = false;
    }
  }

  resetarCalculo() {
    this.segundo_elemento = "";
    this.operador = "";
    this.operador_inserido = false;
    this.is_segundo_elemento = false;
    this.is_novo_calculo = false;
  }

  async alerta(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  virgula() {
    if (!this.ligado) return;

    if (!this.resultado.includes('.')) {
      this.resultado += '.';
    }
  }

  backspace() {
    if (!this.ligado) return;

    if (this.is_segundo_elemento && this.segundo_elemento !== "") {
      this.segundo_elemento = this.segundo_elemento.slice(0, -1);
      this.resultado = this.resultado.slice(0, -1);
    } else {
      this.primeiro_elemento = this.primeiro_elemento.slice(0, -1);
      this.resultado = this.resultado.slice(0, -1);
      this.operador = "";
      this.operador_inserido = false;
    }
  }

  power() {
    this.ligado = !this.ligado;
    if (!this.ligado) {
      this.resetar();
    }
  }

  resetar() {
    if (!this.ligado) return;

    this.resultado = "0";
    this.verifica_zero = true;
    this.operador_inserido = false;
    this.is_segundo_elemento = false;
    this.primeiro_elemento = "";
    this.segundo_elemento = "";
    this.operador = "";
    this.is_novo_calculo = false;
  }

  resetmemoria() {
    if (!this.ligado) return;

    this.memoria = "";
  }
}

/* IMPLEMENTAÇÕES E ALTERAÇÕES:
BOTÃO DE ON/OFF. {
  Implementamos a variável this.ligado, onde inserimos um verificador
  no ínicio de todas as variáveis para apenas iniciarem se o botão
  estiver ligado.
}

RESET APENAS PARA A MEMÓRIA. {
  Criamos uma variável apena para o reset da memória,
  onde ao acioná-lo, deixa o conteúdo atual vazio.
}

BACKSPACE {
  Criei uma variável que remove -1 elemento
  utilizando o método slice em cada elemento
  (primeiro elemento, operadores e segundo elemento).
}

VÍRGULA {
  Criação da variável vírgula possibilitando sua aativação
  alterando o método parseInt para parseFloat, onde altera 
  o número para possibilidade decimal.
}

NUMERO PI {
  Adicionamos o núemro PI arredondado, como um
  dígito diretamente como os números normais.
}

PORCENTAGEM {
  Utilizamos apenas o funcionamento do primeiro elemento
  para a realização da operação porcentagem, dividindo
  o mesmo por 100 e ignorando o segundo elemento.

  Para impedir o segundo elemento, implementei uma verificação
  no método Digitos, assim emitindo alertas.
}

LIMITE CARACTERES {
  Adicionamos um limite de 20 caractéres nos botões
  da calculadora (digitos e operadores).
}

ALERTAS {
  Implementamos botões de alerta utilizando o 
  método alerta para cada situação.
}

CONTINUAÇÃO DE OPERAÇÕES {
  Criamos a função para que seja possível
  a continuação de operações a partir do 
  resultado da última operação, definindo o
  resultado como primeiro elemento.
}

ALTERAÇÃO DE NOVO CALC PARA RESET {
  Troquei a função is_novo_calculo para
  resertCalculo para melhor eficiência e 
  usá-lo também para a continuação de operações
  a partir do resultado.
  Utilizei o is_novo_calculo como um  é true ele ativa o resetar
  se falso, ele mantem as operações em andamento.
}

*/

/* ERROS E BUGS:
*/

/* CORREÇÕES:
RESET MEMÓRIA OK
BOTÃO ON/OFF OK
VÍRGULA (Não adiciona decimal nas operações) OK
NÚMERO PI (Não viável nos metodos) OK
LIMITE DE CARACTERES OK
BACKSPACE (Buga o operador e não altera a operação) OK
PORCENTAGEM (Permite segundo elemento) OK
TESTAR ALERTAS (Alertas com erros) OK
OPERADOR NÃO FUNCIONA DEPOIS DE UMA OPERAÇÃO Ok
*/
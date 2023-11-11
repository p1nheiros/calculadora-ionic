import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  ligado: boolean = true;
  resultado: string = "0";
  memoria: string = "";
  verifica_zero: boolean = true;
  operador_inserido: boolean = false;
  is_segundo_elemento: boolean = false;
  primeiro_elemento: string = "";
  segundo_elemento: string = "";
  operador: string = "";
  is_novo_calculo: boolean = false;


  constructor(private toastController: ToastController) { }
  
  digitos(valor: string) {
    if (!this.ligado) return;

    console.log(this.is_novo_calculo);
    if (this.is_novo_calculo) {
      console.log("É novo calculo");
      this.resetar();
      if (this.is_segundo_elemento) {
        this.segundo_elemento += valor;
        this.resultado += valor;
      } else {
        if (this.verifica_zero) {
          this.resultado = valor;
          this.verifica_zero = false;
        } else {
          this.resultado += valor;
        }
      }
    } else {
      console.log("Não é novo calculo");
      if (this.is_segundo_elemento) {
        this.segundo_elemento += valor;
        this.resultado += valor;
      } else {
        if (this.verifica_zero) {
          this.resultado = valor;
          this.verifica_zero = false;
        } else {
          this.resultado += valor;
        }
      }
    }

  }

  operadores(operador: string) {
    if (!this.ligado) return;

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

    if (this.operador == " + " && this.segundo_elemento != "") {
      this.resultado = (parseFloat(this.primeiro_elemento) + parseFloat(this.segundo_elemento)).toString();
      this.memoria = this.primeiro_elemento + this.operador + this.segundo_elemento + " = " + this.resultado;
      this.is_novo_calculo = true;
    } else if (this.operador == " - " && this.segundo_elemento != "") {
      this.resultado = (parseFloat(this.primeiro_elemento) - parseFloat(this.segundo_elemento)).toString();
      this.memoria = this.primeiro_elemento + this.operador + this.segundo_elemento + " = " + this.resultado;
      this.is_novo_calculo = true;
    } else if (this.operador == " * " && this.segundo_elemento != "") {
      this.resultado = (parseFloat(this.primeiro_elemento) * parseFloat(this.segundo_elemento)).toString();
      this.memoria = this.primeiro_elemento + this.operador + this.segundo_elemento + " = " + this.resultado;
      this.is_novo_calculo = true;
    } else if (this.operador == " / " && this.segundo_elemento != "") {
      this.resultado = (parseFloat(this.primeiro_elemento) / parseFloat(this.segundo_elemento)).toString();
      this.memoria = this.primeiro_elemento + this.operador + this.segundo_elemento + " = " + this.resultado;
      this.is_novo_calculo = true;
    } else if (this.operador == " % " && this.segundo_elemento != "") {
      this.resultado = (parseFloat(this.primeiro_elemento) % parseFloat(this.segundo_elemento)).toString();
      this.memoria = this.primeiro_elemento + this.operador + this.segundo_elemento + " = " + this.resultado;
      this.is_novo_calculo = true;
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

    this.resultado = this.resultado.slice(0, -1);
    if (this.resultado === "") {
      this.resultado = "0";
      this.verifica_zero = true;
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
BOTÃO DE ON/OFF.
RESET APENAS PARA A MEMÓRIA.
BACKSPACE.
FUNCIONAMENTO DA VIRGULA NAS OPERAÇÕES, ALTERANDO O parseInt para parseFloat.
*/

/* ERROS E BUGS:
BACKSPACE BUGA O OPERADOR
PORCENTAGEM ESTA COM BUG
TESTAR ALERTAS
*/
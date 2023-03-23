import { IsBooleanString, IsNumber, IsNumberString, IsString, validate } from "./validate";

class Carro {
    velocidade: number = 0;
    cor: string = "preto";
    vendido: boolean = false;

    @validate
    acelerar(@IsNumberString velocidade: string|number) {
        console.log(`mudando velocidade para: ${velocidade}`);
        console.log(`tipo da velocidade: ${typeof velocidade}` );
        this.velocidade = Number(velocidade);
    }

    @validate
    pintar(@IsString novaCor: string) {
        console.log(`pintando novo carro de ${novaCor}`);
        console.log(`tipo da novacor: ${typeof novaCor}` );
        this.cor = novaCor;
    }

    @validate
    foiVendido(@IsBooleanString foiVendido: string | boolean) {
        console.log(`carro foi vendido: ${foiVendido}`);
        console.log(`tipo de foiVendido: ${typeof foiVendido}`);
        this.vendido = foiVendido.toString() === "true" ? true : false;
    }
}

const carro = new Carro();

carro.acelerar("80");
carro.acelerar(50);

carro.pintar("amarelo");

carro.foiVendido("true");
console.log({vendido: carro.vendido});

carro.foiVendido("false");
console.log({vendido: carro.vendido});

try {
    carro.foiVendido("azul");
} catch (error) {
    console.error(error);
}

carro.foiVendido(true);
console.log({vendido: carro.vendido});
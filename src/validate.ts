import "reflect-metadata";

const isStringMetadata = Symbol("string");
const isNumberMetadata = Symbol("number");
const isBooleanMetadata = Symbol("boolean");
const isNumberStringMetadata = Symbol("numberString");
const isBooleanStringMetadata = Symbol("booleanString");


export function IsString(target: Object, propertyKey: string | symbol, parameterIndex: number) {
    let existingStringParameters: number[] = Reflect.getOwnMetadata(isStringMetadata, target, propertyKey) || [];

    existingStringParameters.push(parameterIndex);

    Reflect.defineMetadata(isStringMetadata, existingStringParameters, target, propertyKey);
}

export function IsNumber(target: Object, propertyKey: string | symbol, parameterIndex: number) {
    let existingNumberMetadata: number[] = Reflect.getOwnMetadata(isNumberMetadata, target, propertyKey) || [];

    existingNumberMetadata.push(parameterIndex);

    Reflect.defineMetadata(isNumberMetadata, existingNumberMetadata, target, propertyKey);
}

export function IsBooleanMetadata(target: Object, propertyKey: string | symbol, parameterIndex: number) {
    let existingBooleanMetadata: number[] = Reflect.getOwnMetadata(isBooleanMetadata, target, propertyKey) || [];

    existingBooleanMetadata.push(parameterIndex);

    Reflect.defineMetadata(isBooleanMetadata, existingBooleanMetadata, target, propertyKey);
}

export function IsNumberString(target: Object, propertyKey: string | symbol, parameterIndex: number) {
    let existingNumberStringMetadata: number[] = Reflect.getOwnMetadata(isNumberStringMetadata, target, propertyKey) || [];

    existingNumberStringMetadata.push(parameterIndex);

    Reflect.defineMetadata(isNumberStringMetadata, existingNumberStringMetadata, target, propertyKey);
}

export function IsBooleanString(target: Object, propertyKey: string | symbol, parameterIndex: number) {
    let existingBooleanStringMetadata: number[] = Reflect.getOwnMetadata(isBooleanStringMetadata, target, propertyKey) || [];

    existingBooleanStringMetadata.push(parameterIndex);

    Reflect.defineMetadata(isBooleanStringMetadata, existingBooleanStringMetadata, target, propertyKey);
}

export function validate(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<any>) {
    let method = descriptor.value;

    descriptor.value = function() {
        let stringParameters: number[] = Reflect.getOwnMetadata(isStringMetadata, target, propertyName);
        validateStringsParameters(arguments, stringParameters);

        let numberParameters: number[] = Reflect.getOwnMetadata(isNumberMetadata, target, propertyName);
        validateNumberParameters(arguments, numberParameters);

        let booleanParameters: number[] = Reflect.getOwnMetadata(isBooleanMetadata, target, propertyName);
        validateBooleanParameters(arguments, booleanParameters);

        let numberStringParameters: number[] = Reflect.getOwnMetadata(isNumberStringMetadata, target, propertyName);
        validateNumberStringParameters(arguments, numberStringParameters);

        let booleanStringParameters: number[] = Reflect.getOwnMetadata(isBooleanStringMetadata, target, propertyName);
        validateBooleanStringParameters(arguments, booleanStringParameters);

        return method?.apply(this, arguments);
    }
}

function validateType(value: any, typeName: string) {
    if (typeof value !== typeName) throw new Error(`${value} is not from type ${typeName}`);
}

function valiteIsNotNaN(value: string|number) {
    if (Number(value).toString() === "NaN") {
        throw new Error(`${value} is NaN`);
    }
}

function validateStringsParameters(args: any, stringParameters?: Array<number>) {
    if (!stringParameters) return;

    if (stringParameters) {
        for (let parameterIndex of stringParameters) {
            validateType(args[parameterIndex], "string");
        }
    }
}

function validateNumberParameters(args: any, stringParameters?: Array<number>) {
    if (!stringParameters) return;

    if (stringParameters) {
        for (let parameterIndex of stringParameters) {
            validateType(args[parameterIndex], "number");
        }
    }
}

function validateBooleanParameters(args: any, stringParameters?: Array<number>) {
    if (!stringParameters) return;

    if (stringParameters) {
        for (let parameterIndex of stringParameters) {
            validateType(args[parameterIndex], "boolean");
        }
    }
}

function validateNumberStringParameters(args: any, stringParameters?: Array<number>) {
    if (!stringParameters) return;

    if (stringParameters) {
        for (let parameterIndex of stringParameters) {
            try {
                validateType(args[parameterIndex], "number");
            } catch(error) {
                valiteIsNotNaN(args[parameterIndex]);
            }
        }
    }
}

function validateBooleanStringParameters(args: any, stringParameters?: Array<number>) {
    if (!stringParameters) return;

    if (stringParameters) {
        for (let parameterIndex of stringParameters) {
            try {
                validateType(args[parameterIndex], "boolean");
            }
            catch {
                if (args[parameterIndex] != "true" && args[parameterIndex] != "false") {
                    throw new Error(`${args[parameterIndex]} is not a stringBoolean`);
                }
            }
        }
    }
}
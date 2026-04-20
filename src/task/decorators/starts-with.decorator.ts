import { registerDecorator, type ValidationOptions, type ValidationArguments } from "class-validator";

export function StartsWith (prefix: string, validationOptions?: ValidationOptions) {
    return (object: Object, propertyName: string) => {
        registerDecorator({
            name: 'StartsWith',
            target:  object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return typeof value === 'string' && value.startsWith(prefix);
                },
                defaultMessage(args: ValidationArguments) {
                    return `Назва повинна починатись з "${prefix}"`;
                }
            }
        })
    }  
}   
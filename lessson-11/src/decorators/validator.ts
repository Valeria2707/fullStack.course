import { HttpError } from "routing-controllers";

export function ValidateArgs(test: string) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const body = args[0];

      if (body.user !== undefined && body.user.length < 2) {
        throw new HttpError(
          400,
          "User name must be at least 2 characters long"
        );
      }

      if (body.email !== undefined && !body.email.includes("@")) {
        throw new HttpError(400, "Invalid email format");
      }

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}

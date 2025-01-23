# yuca-validator 🎯

**yuca-validator** es una librería de validación de datos en TypeScript, diseñada para ser simple, flexible y extensible. Con yuca-validator, puedes definir esquemas de validación para objetos, cadenas, correos electrónicos y más, utilizando una API fluida y fácil de usar.

## Instalación

Puedes instalar yuca-validator usando npm:

```bash
npm install yuca-validator
```

3. **Uso Básico**:

```javascript
import { Yvalidator } from "yuca-validator";

const schema = Yvalidator.string().addValidator(Yvalidator.minLength(3));

const result = schema.validate("hello");
console.log(result);
// { success: true, data: 'hello' }
```

```javascript
import { Yvalidator } from "yuca-validator";

const schema = Yvalidator.email();

const result = schema.validate("test@example.com");
console.log(result);
// { success: true, data: 'test@example.com' }
```

```javascript
import { Yvalidator } from "yuca-validator";

const userSchema = Yvalidator.object({
  name: Yvalidator.string().addValidator(Yvalidator.minLength(3)),
  email: Yvalidator.email(),
  address: Yvalidator.object({
    city: Yvalidator.string(),
    zip: Yvalidator.string().addValidator(Yvalidator.minLength(5)),
  }),
});

const result = userSchema.validate({
  name: "John",
  email: "john@example.com",
  address: {
    city: "New York",
    zip: "12345",
  },
});

console.log(result); // { success: true, data: { ... } }
```

4. **API**: 
SchemaFactory

- string(): Crea un esquema para validar cadenas.

- email(): Crea un esquema para validar correos electrónicos.

- minLength(length: number): Crea un validador para verificar la longitud mínima de una cadena.

- object(schema: Record<string, Schema>): Crea un esquema para validar objetos anidados.

Schema

- validate(data: any): Valida los datos proporcionados y devuelve un objeto con el resultado.

5. **Contribuir**: ¡Las contribuciones son bienvenidas! Si encuentras un error o tienes una sugerencia, por favor abre un issue o envía un pull request.
6. **Licencia**:
   - Indica que el proyecto está bajo la MIT License y enlaza al archivo `LICENSE`.

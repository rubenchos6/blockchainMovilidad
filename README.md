# Sistema descentralizado para movilidad segura
_Este es un proyecto de Tesis para Ingeniería en Computación y Telecomunicaciones_

## Distribución de directorios

### Build/contracts 

Dentro se encuentran los contratos inteligentes en formato JSON tras ser compilados con 
```
truffle compile --network besu
```

### contracts

Dentro se encuentran los contratos de prueba .sol y el contrato principal SafeMov.sol utilizado en las transacciones de la red.

### flaskServices

Dentro se encuentra el código del servicio desplegado por Flask para correr las transacciones con el registro de puntos de acceso y timestamps en las pruebas. Para correr el servicio, se utiliza

```
flask run -- host :0.0.0.0
```

### migrations

Dentro se encuentran los códigos de migración para pasar los contratos inteligentes a la blockchain de Besu. Para ejecutar estas migraciones se utiliza

```
truffle migrate --network besu --reset
```

### pruebas_campo

Dentro se encuentran 2 archivos de texto que fueron el resultado de pruebas tras ejecutar el servicio Post de Flask para registrar puntos de acceso.

### safemovapp/webApp

Dentro se encuentra un proyecto de Angular en el que están las páginas y los servicios para la aplicación web utilizada en el proyecto. Para correr la página es necesario utilizar el comando 

```
ng serve
```

### test

Dentro se encuentran los códigos de prueba de los contratos inteligentes, está el de funcionalidad normal y el de estrés. Para correr las pruebas se utiliza

```
truffle test --network besu 
```

## Autores ✒️

**Rubén Romero** - *Diseño y desarrollo* - [GitHub](https://github.com/rubenchos6)

# Guía de instalación y ejecución

## Requisitos previos

- **Node.js** v22.8.0 o superior instalado en tu máquina. [Descargar Node.js](https://nodejs.org/en/download/package-manager)

## Configuración de permisos de ejecución de scripts (solo para Windows)

Es necesario habilitar la ejecución de scripts remotos para evitar restricciones. Sigue estos pasos:

1. Abre PowerShell como administrador.
2. Ejecuta el siguiente comando para permitir la ejecución de scripts remotos:
   ```powershell
   Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

3. Cuando se te pregunte, presiona "S" y luego Enter.

## Instalación de dependencias
1. Ve al directorio del repositorio en Visual Studio o tu terminal preferida.

2. Abre una terminal y ejecuta el siguiente comando para instalar las 
   dependencias:

```bash
npm install
```

## Ejecución del proyecto
Para iniciar el proyecto con vue (que permite la recarga automática al detectar cambios en el código), ejecuta el siguiente comando:

```
npm run serve
```


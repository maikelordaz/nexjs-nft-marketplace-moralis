Si escribo

```HTML
          <MoralisProvider initializeOnMount={false}>
              (Aqui adentro pongo los llamados a los componentes y eso)
          </MoralisProvider>
```

quiere decir "No voy a usar un servidor
de Moralis, solo usaré las herramientas de codigo abierto que da yarn"
Para usar los servidores de moralis uso

```HTML
          <MoralisProvider appId={APP_ID} serverURL={SERVER_URL}>
              (Aqui adentro pongo los llamados a los componentes y eso)
          </MoralisProvider>
```

Para poder usar variables ENV en mi frontend debo iniciar su nombre con NEXT\*PUBLIC**\*\*\***
De otra forma el frontend no las leer l documentación de Moralis

https://v1docs.moralis.io/

Las APP_ID y SERVER_URL los obtengo abriendo un servidor logueandome en

https://moralis.io/

Luego debo ir a mi dashboard en Moralis, en el menu de la izquierda elijo "networks"
Luego settings. Esto me abrirá DevChain Proxy Server, abro el link y descargo el frpc correspondiente
Para que sea mas facil todo en la ubicación de mi proyecto creo una carpeta que se llame frp
y pego los archivos llamados

> frpc.exe
> frpc.ini

En la pagina de DevChain Proxy Server estan las indicaciones de configuración según lo que
vaya a usar sea Ganache o Hardhat. Agarro la que necesite, copio y sustituyo todo lo que esta
en el frpc.ini por esto que acabo de copiar. luego entro a la carpeta

> cd frp

y mantengo este terminal en espera. Luego debo abrir otro terminal y dirigirme al directorio de
mi backend, de mi smart contract, aqui ejecuto

yarn hardhat node

Y dejo corriendo el nodo. Vuelvo al terminal que esta en la carpeta frp y ejecuto

> ./frpc.exe -c frpc.ini

Si me dice success todo salio bien. Si me dice permission denied hago

> chmod +x frpc.exe

Con esto otorgo los permisos y luego si ejecuto

> ./frpc.exe -c frpc.ini

Otra manera es usando Moralis Admin CLI, para esto hago

> yarn global add moralis-admin-cli

Aqui ya lo instalo de forma global en la computadora y puedo correr el comando

> moralis-admin-cli

Y puedo ver todo lo que puedo hacer el equivalente a conectarme al servidor seria

> moralis-admin-cli connect-local-devchain

Puedo crear un script para esto en mi package.json

> "moralis:sync": "moralis-admin-cli connect-local-devchain --chain hardhat --moralisSubdomain (aqui voy a poner de mi server URL desde justo despues de https:// hasta el .com incluido) --frpcPath ./frp/frpc"

Aqui me pediria mi API KEY y mi SECRET KEY los tomo de la pagina de Moralis en mi imagen de perfil

Pero podria añadirlas a mi .env de la siguiente forma

> moralisApiKey=**\*\***
> moralisApiSecret=**\***

De esta forma no me la pide

Luego en mi pagina DevChain puedo refrescar el estatus y verificar que este conectado mi nodo
al servidor de Moralis

Al final tendre cuatro terminales

1. Para el frontend en el directorio de mi proyecto de front corriendo "yarn dev"
2. Para el nodo en el directorio del backend corriendo "yarn hardhat node"
3. Para la sincronizacion en la carpeta frp corriendo "./frpc.exe -c frpc.ini" o mi script
4. Para cualquier otra cosa que necesite como correr scripts

Cuando ya estoy conectado al servidor de moralis toca decirle de los eventos
Una forma es por la interfaz grafica en la pagina. En el dashboard de mi app en el menu de
la izquierda elijo "Syncs" y creo un nuevo evento y voy llenando los datos que me pide
La otra forma es programarlo a traves de scripts. Esto lo haré en el archivo

addEvents.js

En la documentacion puedo ver ejemplos de como conectar con NodeJs

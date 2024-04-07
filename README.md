
# Threeio/Front-End

Esse é o Front-End da aplicação de teste do desafio técnico dessa vaga. Ele foi feito usando React, Typescript, TailwindCSS, Docker e Docker-Compose (infelizmente não consegue ser executado devido a um erro que será tratado posteriormente)

## Comandos para executar

Primeiro de tudo, certifique-se de que sua máquina possuí o docker baixado.

Após isso execute:

```
    docker build -t threeio/frontend .
```

Depois rode o container com:

```
    docker run -p 5173:5173 threeio/frontend
```

Após isso sua aplicação estará rodando e já poderá ser acessada na URL do navegador. Lembrando que primeiro é necessário iniciar o Back-End.

Obs.: O docker-compose não está funcionando direito no projeto devido a um erro no npm com depências opcionais, como pode ser acesso/visto a seguir

* Error: Cannot find module @rollup/rollup-linux-x64-musl. npm has a bug related to optional dependencies (https://github.com/npm/cli/issues/4828). Please try `npm i` again after removing both package-lock.json and node_modules directory.*

Caso queira ver o erro pessoalmente rode:

```
    docker-compose up --build
```




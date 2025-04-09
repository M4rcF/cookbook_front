# Stage 1: Build da aplicação
FROM node:19.2.0-alpine as build

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependência para aproveitar o cache
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Cria o build de produção (ajuste o comando conforme o script definido no package.json)
RUN npm run build

# Stage 2: Imagem final de produção
FROM node:19.2.0-alpine

# Instala o "serve" globalmente para servir os arquivos estáticos
RUN npm install -g serve

# Define o diretório de trabalho
WORKDIR /app

# Copia o build da aplicação da etapa anterior
COPY --from=build /app/build ./build

# Expõe a porta que será utilizada
EXPOSE 3000

# Comando para iniciar a aplicação em modo produção
CMD ["serve", "-s", "build", "-l", "3000"]

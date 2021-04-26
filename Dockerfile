FROM node:14.16.0

WORKDIR /SMB_API_PJ

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . .

EXPOSE 4200

CMD ["npm", "run", "start:dev"]
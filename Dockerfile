FROM node
WORKDIR /app
COPY package.json ./
COPY ./ ./
RUN npm install -g npm@8.4.1
RUN npm i
CMD ["npm", "start"] 

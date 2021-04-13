FROM registry.redhat.io/ubi8/nodejs-12 as builder
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent
COPY . ./
RUN npm run build

# Expose ports
EXPOSE 10000

# start app
CMD ["npm", "start"]

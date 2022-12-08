FROM node
WORKDIR ./
COPY package.json .
# RUN npm install mui-datatables --save --force
RUN npm install
COPY . .
ENV REACT_APP_ORGANISATION_NAME=mosip-intern
ENV REACT_APP_TOKEN=adf
EXPOSE 3000
CMD ["npm","start"]

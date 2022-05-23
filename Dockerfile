FROM node:16-alpine
# stuff needed to get Electron to run
# RUN apt-get update && apt-get install \
#     git libx11-xcb1 libxcb-dri3-0 libxtst6 libnss3 libatk-bridge2.0-0 libgtk-3-0 libxss1 libasound2 \
#     -yq --no-install-suggests --no-install-recommends \
#     && apt-get clean && rm -rf /var/lib/apt/lists/*
RUN npm install -g nodemon
WORKDIR /app
COPY package.json ./
RUN npm install
RUN npx electron-rebuild
COPY ./ ./
EXPOSE 3001
CMD ["npm", "start"]
FROM node:16 as kubebuild
RUN apt-get update && apt-get install -y apt-transport-https ca-certificates curl
RUN curl -fsSLo /usr/share/keyrings/kubernetes-archive-keyring.gpg https://packages.cloud.google.com/apt/doc/apt-key.gpg
RUN echo "deb [signed-by=/usr/share/keyrings/kubernetes-archive-keyring.gpg] https://apt.kubernetes.io/ kubernetes-xenial main" | tee /etc/apt/sources.list.d/kubernetes.list
RUN apt-get update && apt-get install -y kubectl



#ADD https://storage.googleapis.com/kubernetes-release/release/v1.6.4/bin/linux/amd64/kubectl /usr/local/bin/kubectl
#ENV HOME=/config \
#    KUBECONFIG=/etc/kubernetes/admin.conf
#RUN set -x && \
#    apk add --no-cache curl ca-certificates && \
#    chmod +x /usr/local/bin/kubectl

#your app container
FROM kubebuild as armada

WORKDIR /usr/src/app

RUN npm install -g webpack nodemon

COPY . /usr/src/app/

RUN npm install

RUN npm run build

EXPOSE 3001

# CMD [ "npm", "run", "dev" ]
CMD [ "npm", "run", "start" ]

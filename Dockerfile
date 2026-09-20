FROM node:22-alpine AS build

ARG VERSION=1.0.20260920
ARG NEXT_PUBLIC_GISCUS_REPO
ARG NEXT_PUBLIC_GISCUS_REPO_ID
ARG NEXT_PUBLIC_GISCUS_CATEGORY
ARG NEXT_PUBLIC_GISCUS_CATEGORY_ID

WORKDIR /app

COPY package.json package-lock.json ./
RUN rm -f package-lock.json && npm install

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

FROM nginx:1.27-alpine

COPY --from=build /app/out /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

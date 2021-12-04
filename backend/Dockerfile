FROM ruby:2.7.1-alpine
WORKDIR /myapp
COPY . /myapp
RUN apk add --no-cache -t .build-dependencies \
    alpine-sdk \
    build-base \
 && apk add bash \
 && gem install bundler:2.0.2 \
 && bundle install \
 && apk del --purge .build-dependencies

CMD /bin/sh -c "while sleep 1000; do :; done"
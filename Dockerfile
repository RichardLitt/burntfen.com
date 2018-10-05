FROM ruby:2.2

RUN mkdir -p /src
WORKDIR /src
COPY . /src

RUN gem install bundler && bundle install
ENTRYPOINT bundle exec jekyll serve --host 0.0.0.0

# Dante Visualised
Visualising Dante's Divine Comedy

The site is visible at https://ginestra.github.io/dante-visualised/

MSc Computer Science Project - 2018

Birkbeck University, London, UK

## About
Taking into account the strict linguistic rules that Dante Alighieri adopted when writing his _Divine Comedy_ at the beginning of the XIII Century, this project will attempt at visualising the text structure, the unique rhyme scheme (_terza rima_) adopted by the Italian poet with the objective to highlight patterns and exceptions.

**TODO:** Expand for stylometric analysis. 

## Requirements
* [Ruby](https://www.ruby-lang.org/en/downloads/) version 2.2.5 or above, including all development headers
* [RubyGems](https://rubygems.org/pages/download)
* [GCC](https://gcc.gnu.org/install/) and [Make](https://www.gnu.org/software/make/)
* [Bundler](https://bundler.io/)
* [Jekyll](https://jekyllrb.com/)

## Set up the local environment
**Note:** _Make sure your system satisfies the requirements above_

* Run in the terminal `gem install bundler jekyll`
* Clone the repository `git clone git@github.com:ginestra/dante-visualised.git`
* `cd` into the repository
* Install everything you need in your project folder (rather than at system level): `bundle install --path bundle && bundle install`

## Run locally

* Run in the terminal `bundle exec jekyll serve --watch --incremental` (the flags `--watch` and `--incremental` are optional, they are useful if editing the project)
* The site is now locally accessible at `http://localhost:4000/`
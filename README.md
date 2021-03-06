[![CircleCI](https://img.shields.io/circleci/project/BrunoCamargos/meta-work-js.svg)](https://circleci.com/gh/BrunoCamargos/meta-work-js)
[![Gemnasium](https://img.shields.io/gemnasium/BrunoCamargos/meta-work-js.svg)](https://gemnasium.com/github.com/BrunoCamargos/meta-work-js)
[![Known Vulnerabilities](https://snyk.io/test/github/BrunoCamargos/meta-work-js/badge.svg)](https://snyk.io/test/github/BrunoCamargos/meta-work-js)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/9d78441d792143a78c99d52d54145117)](https://www.codacy.com/app/bruno-camargos/meta-work-js?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=BrunoCamargos/meta-work-js&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/9d78441d792143a78c99d52d54145117)](https://www.codacy.com/app/bruno-camargos/meta-work-js?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=BrunoCamargos/meta-work-js&amp;utm_campaign=Badge_Coverage)
[![GitHub license](https://img.shields.io/github/license/BrunoCamargos/meta-work-js.svg)](https://github.com/BrunoCamargos/meta-work-js)
[![Coverage Status](https://coveralls.io/repos/github/BrunoCamargos/meta-work-js/badge.svg?branch=master)](https://coveralls.io/github/BrunoCamargos/meta-work-js?branch=master)
[![bitHound Dependencies](https://www.bithound.io/github/BrunoCamargos/meta-work-js/badges/dependencies.svg)](https://www.bithound.io/github/BrunoCamargos/meta-work-js/master/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/BrunoCamargos/meta-work-js/badges/devDependencies.svg)](https://www.bithound.io/github/BrunoCamargos/meta-work-js/master/dependencies/npm)
[![Code Climate](https://codeclimate.com/github/BrunoCamargos/meta-work-js/badges/gpa.svg)](https://codeclimate.com/github/BrunoCamargos/meta-work-js)
[![Test Coverage](https://codeclimate.com/github/BrunoCamargos/meta-work-js/badges/coverage.svg)](https://codeclimate.com/github/BrunoCamargos/meta-work-js/coverage)
[![Issue Count](https://codeclimate.com/github/BrunoCamargos/meta-work-js/badges/issue_count.svg)](https://codeclimate.com/github/BrunoCamargos/meta-work-js)

# Visão Geral
O propósito desse projeto é ser um *boilerplate* para construir novos microserviços em ES6. Ele implementa boas práticas, qualidade, segurança e remove preocupações com assuntos irrelevantes ao domínio da solução.
Ou seja, esse *template* é um projeto NodeJS com basicamente infraestrutura.

Está sendo construído em ES6. Atualmente utiliza [Babel](https://babeljs.io/) apenas para *import* e *export* e conta com:
- Task runners
	- Npm (test, build, serve, start, version)
	- Gulp (test, build, serve)
- Babel (apenas *modules - import/export*)
- Mocha (sinon, rewire, supertest, chai)
- Istanbul/Isparta
- Depcheck
- Gemnasium
- Snyk
- ESLint (airbnb)
- Coveralls, Code Climate, Codacy e bitHound
- Bunyan ou Winston*
- Circle CI, Travis CI, Codeship e HoundCI*
- Docker*

\* TODO

# Rápida Introdução

## Colocando para rodar

Clone o repositório:
```bash
git clone git@github.com:BrunoCamargos/meta-work-js.git
cd meta-work-js
```

Então
```bash
npm start
```
ou
```bash
gulp start
```

## Adaptando para seu projeto

1. Clone o repositório;
2. Edite as pastas ```test``` e ```lib``` e o arquivo ```package.json```;
3. Customize o restante do projeto.

# Explicação Detalhada

## Task Runners

Para efeitos comparativos, foram utilizados dois dentre alguns possíveis. São eles [Gulp](http://gulpjs.com/) e [Npm](https://www.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/). O primeiro é mais verboso e depende de uma abstração a mais para utilizar um pacote, além do próprio gulp. Por esse motivo foi abandonado.

Tarefas:
- Test - Exucuta testes, cobertura de código e valida o percentual coberto. Pacotes utilizados: [mocha](https://mochajs.org/), [chai](http://chaijs.com/), [sinon](http://sinonjs.org/), [rewire](https://github.com/jhnns/rewire), [supertest-as-promised](https://github.com/WhoopInc/supertest-as-promised), [istanbul](http://gotwarlost.github.io/istanbul/) e [isparta (necessário com gulp)](https://github.com/douglasduteil/isparta).
- Build - Cria a distribuição do pacote. Exclui a pasta ```dist```, transforma o código ES6 para ES5 (modulo somente) através do Babel e copia para a pasta já então criada.
- Start - Inicia a aplicação. Executa a tarefa ```build``` antes.
- Serve - Inicia a aplicação e reinicia em caso de algum arquivo alterado - utiliza o pacote nodemon. Executa a tarefa ```build``` antes.
- [Version](https://docs.npmjs.com/cli/version) - Gera um novo release. Executa a tarefa ```test``` antes, em seguida incrementa o ´´´package.json´´´, cria o commit, gera a tag e faz push. Será preciso utilizar [gpg key](https://help.github.com/articles/generating-a-gpg-key/). Talvez seja necessário instalar o *haveged* para conseguir gerar a chave. ```bash sudo apt-get install haveged```

## Babel

Na atual versão do node, o novo sistema de modulos ainda não foi implementado, por isso a necessidade de babel. Para transformar cada ```import``` e ```export``` em CommonJS formato.

## Mocha

Test runner utilizado para executar os testes. Juntamente com mocha, é utilizado também sinon e rewire para testes de unidade, chai como TDD/BDD *assertion library*, supertest para os testes de integração em APIs Rest e cobertura de código com istanbul e isparta, que é necessário para o gulp.

## Istanbul/Isparta

Faz análise e cobertura estática do código. Isparta é um plugin de instrumentação para o istanbul, necessário quando utiliza gulp task runner

## [Depcheck](https://github.com/depcheck/depcheck)

Busca por pacotes que não estejam sendo utilizados.

## [Snyk](https://snyk.io/)

Busca por vulnerabilidades nos pacotes utilizados. Pode também monitorar o projeto e emitir alertas.
Similares:
 - [Gemnasium](https://gemnasium.com/): De maneira unificada, exibe informações de changelog dos pacotes, ideal para analisar possíveis atualizações.
 - [NSP](https://github.com/nodesecurity/nsp): É mais utilizado que o snyk e uma das bases de informações que o snyk consulta.

## [Eslint](http://eslint.org/)

Analisa o código fonte em busca de violações aos padrões e boas práticas adotadas ([airbnb](https://github.com/airbnb/javascript))

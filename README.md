# TsUML

![Logo](/assets/logo.png)

Forked From: <https://github.com/remojansen/TsUML>

:construction: WORK IN PROGRESS :construction:

Generate UML diagram for your TypeScript applications powered by <https://yuml.me/>

![CLI example](/assets/cli-preview.gif)

## Build Status

[![Build Status](https://travis-ci.com/seushermsft/TsUML.svg?branch=master)](https://travis-ci.com/seushermsft/TsUML)

## Security (YUML ONLY)

This tool sends the class hierarchy of your typescript codebase to [yuml.me](yuml.me).

If you run a [self-hosted yuml.me instance](https://yuml.me/selfhosting), you should specify the correct address in the `--yumluri` parameter.

## Installation

```sh
npm install -g tsuml
```

## Usage

### YUML.ME

```bash
tsuml --glob './src/**/*.ts'
```

To show the generated the [yuml.me](yuml.me) syntax:

```bash
tsuml --glob './src/**/*.ts' --showyuml
```

Specify a self-hosted yuml.me service:

```bash
tsuml --glob './src/**/*.ts' --yumluri 'https://.......'
```

The diagram generated for the code under the [demo folder](https://github.com/seushermsft/TsUML/tree/master/src/demo) looks as follows:

![Demo YUML Diagram](/assets/uml_diagram.svg)

### PlantUML

```bash
tsuml --glob './src/**/*.ts' --umlTarget plantuml
```

The generated PlantUML syntax for the code under the [demo folder](https://github.com/seushermsft/TsUML/tree/master/src/demo) looks as follows:

```text
interface Weapon

interface Named

class BaseWeapon {
damage;

}

class Katana {
name;
tryHit();
}

BaseWeapon <|-- Katana

Weapon <|-- Katana

Named <|-- Katana

class Ninja {
_weapon;
fight();
}
```

![Demo PlantUML diagram](/assets/plantuml_diagram.png)

Link: [Demo PlantUML diagram link](http://www.plantuml.com/plantuml/png/oymhIIrAIqnELGXFJIp8p-FYGeZu9UQcfd1n9USa5XShE2KMfqAKA5HpfIJc9gQdMdDnrSAalHDB4lCIWL9vYRb0YPAYIe_C4WrDQv0A9AqsDRgwKBLSNDZ4m7OY2y4iyClComAP7ryErcNDbPQPdW6n0G00)

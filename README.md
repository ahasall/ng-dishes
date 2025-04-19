# Les signaux dans Angular

La version 19 d'Angular marque une nouvelle ère pour le framework avec la stabilisation des API basées sur les signaux et des améliorations significatives de l'expérience développeur (DX).
Tout cela pour permettre de créer des applications encore plus performantes.

Input signals, output functions, Signal Queries, computed signals, linkedSignal, resources... Ce sont des termes dont vous avez probablement entendu parler récemment, mais que vous n'avez peut-être pas encore eu l'occasion d'explorer à travers des exemples concrets ou un projet pratique.

Ce workshop interactif est l'occasion idéale ! Nous construirons ensemble une application complète à partir de zéro, en mettant en pratique toutes ces notions clés.
Si vous avez manqué les évolutions d'Angular depuis la version 16, ce sera également l'opportunité parfaite pour vous remettre à jour.

À l'issue de ce workshop, les participants disposeront des connaissances essentielles pour développer une application complète et moderne en tirant parti des fonctionnalités de la dernière version d'Angular.

# Slides du workshop
[Angular 19 - L'ère des applications complètes basées sur les signaux.pdf](Angular_19-L'ère_des_applications_complètes_basées_sur_les_signaux.pdf)

# Démarrer le projet

## Récupérer le code source

```bash
git clone https://github.com/ahasall/ng-dishes
cd ng-dishes
npm install
```

## Démarrer le frontend

```bash
ng serve --open
```

## Démarrer le backend

```bash
npm run start:server
```

# Exercices

## 1. Premier pas avec les signaux

### But

Découvrir les primitives `signal`, `computed` et `effect`.

### Tâches

Nous allons principalement travailler sur le composant `DishListPage`.

1. Convertir toutes les propriétés de la classe `DishListPage` en `signal`.
2. Utiliser `computed` pour créer des signaux dérivés.
3. Utiliser `effect` pour observer des signaux et déclencher des side effects comme ouvrir une notification en cas d'erreur (voir `ToastService`) ou loguer la valeur de `dishes`.

## 2. Communication entre composants

### But

Utiliser `input`, `output` et `model`.

### Tâches

Nous allons principalement travailler sur les composants `DishCardComponent`, `FavoriteComponent` et `DishDeleteComponent`.

1. Convertir tous les `@Input` en `input`.
2. Convertir tous les `@Output` en `output`.

## 3. Interopérabilité avec RxJS

### But

Comprendre comment naviguer entre le monde des signaux et celui des observables.

### Tâches

1. Remplacer le pipe `async` par `toSignal` dans `DishDetailsPage`.
2. Implémenter un typeahead pour le filtre dans `DishListPage` en utilisant `toObservable`.

## 4. Les signaux et le monde asynchrone

### But

Comprendre comment intégrer du code asynchrone dans le monde des signaux.

### Tâches

1. Utiliser `rxResource` dans `DishListPage`.

## 5. Les signaux et les requêtes HTTP

### But

Comprendre comment les signaux s'intègrent avec le client HTTP d'Angular.

### Tâches

1. Utiliser `httpResource` dans `DishDetailsPage`.

## 6. Exercice final

### But

Consolider nos connaissances sur les signaux.

### Tâches

1. Utiliser tout ce qu'on a appris pour implémenter `DishDiscountCalculatorPage`.

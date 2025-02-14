# CiProject

## Description du projet
Ce projet met en place une CI/CD pour deux APIs :
- **Perspective API**
- **API Discord**

### Fonctionnalités principales
1. **Authentification via OAuth avec Discord** : Permet aux utilisateurs de se connecter à Discord via OAuth.
2. **Analyse de toxicité des messages** : Envoi d'un message à l'API Perspective pour évaluer la probabilité qu'il soit toxique.

### Évolution du projet
Initialement, nous souhaitions scraper des données de Discord pour les intégrer à l'API Perspective. Cependant, cette approche nécessitait la création d'un bot Discord, ce qui demandait trop de temps. Nous avons donc décidé de nous limiter à l'implémentation de l'authentification OAuth.

## Intégration Continue (CI)
Nous avons mis en place des tests end-to-end (E2E) sur l'API Perspective, qui sont exécutés automatiquement via la CI. Cependant, un problème persiste :
- Nous n'avons pas réussi à activer le rejet automatique des merge requests lorsque les tests échouent.
- Le professeur a été informé, mais n'a pas pu expliquer pourquoi cela fonctionnait pour d'autres équipes et pas pour nous.

## Livraison Continue (CD)
Malgré le problème mentionné, nous avons mis en place plusieurs bonnes pratiques pour sécuriser le processus de merge :
- Obligation d'approbation après un merge.
- Ajout du SHA lors du merge.
- Réalisation d'une release comme demandé.

## Conclusion
La CI/CD est entièrement fonctionnelle, et les étapes essentielles du pipeline sont en place, garantissant la fiabilité et la qualité du projet.


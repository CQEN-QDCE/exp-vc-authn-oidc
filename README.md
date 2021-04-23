[![img](https://img.shields.io/badge/Cycle%20de%20Vie-Phase%20d%C3%A9couverte-339999)](https://www.quebec.ca/gouv/politiques-orientations/vitrine-numeriqc/accompagnement-des-organismes-publics/demarche-conception-services-numeriques)
[![License](https://img.shields.io/badge/Licence-LiLiQ--R-blue)](LICENSE)
# Authentification par attestation d'identitée vérifiable via OpenID Connect
Ce dépôt est le siège d'une expérimentation pour mettre en place l'authentification par [attestation d'identitée vérifiables](https://www.w3.org/TR/vc-data-model) via [OpenID Connect](https://openid.net/connect). 
## Table des matières

1. [Objectifs](#10-objectifs)

2. [Contexte](#20-contexte)

3. [Environnement d\'expérimentation](#30-environnement-dexpérimentation)
---

## 1.0 Objectifs

- Permettre à un utilisateur de s'authentifier via un fournisseur OpenID Connect, par exemple [Keycloak](https://www.keycloak.org/), en présentant une attestation d'identitée vérifiable.

- Émettre des attestations d'identitée vérifiables d'authentification aux utilisateurs qui le désirent.

- Démontrer la possibilité d'étendre le fournisseur OpenID standard (Keycloak) afin qu'il prenne en charge l'authentification à partir d'un justificatif d'identité vérifiable.

- Configurer une partie dépendante (relying party)(Openshift) pour utiliser cette méthode d'authentification.
## 2.0 Contexte

Une [attestation d'identitée vérifiable](https://www.w3.org/TR/vc-data-model) est essentiellement un ensemble d'affirmations délivrées par une autorité de confiance que l'on nomme habituellement: "Émetteur". Ces affirmations sont faites sur un sujet (une personne, une compagnie, etc.) de telle sorte que, lorsqu'elles sont présentées à un vérificateur, leur authenticité peut être vérifiée de manière cryptographique.

OpenID Connect est un protocole d'authentification basé sur [OAuth2.0](https://oauth.net/2). Dans une implémentation standard, une partie utilisatrice va former une demande d'authentification puis elle l'envoie à un fournisseur OpenID de confiance qui se charge d'authentifier l'utilisateur au nom de la partie utilisatrice. Le fournisseur OpenID gère et conserve les identités réelles des utilisateurs et la manière de les authentifier. Twitter, Facebook et Github sont des fournisseurs OpenID Connect parmi les plus populaires. Pour authentifier et identifier un utilisateur, le fournisseur OpenID lui demande, le plus souvent, un nom d'utilisateur et un mot de passe. Avec ces informations, il construit un jeton d'identité et le renvoie à la partie utilisatrice. Ici, la question posée par la partie utilisatrice doit être la suivante : pouvez-vous demander à cet utilisateur de présenter une attestation d'identitée vérifiable qui répond à ces contraintes? Lorsque la partie utilisatrice qui se fie à l'authentification utilise cette méthode, elle peut imposer un ensemble de contraintes, dont voici quelques exemples :

- Émetteur du justificatif - Par qui a-t-il été émis?
- Schéma du justificatif - De quel type de justificatif s'agit-il ?
- Attributs du justificatif - Quels sont les affirmations qui présentent un intérêt ?

Le résultat final pour une partie utilisatrice est le même qu'avec le flux OpenID Connect traditionnel en ce sens qu'elle obtient ce que l'on appelle un jeton d'identité, la seule différence réelle étant la manière dont ce jeton est construit. Plutôt que d'être alimenté sur la base des informations de l'utilisateur détenues par le fournisseur OpenID, il est construit en utilisant les affirmations dans l'attestation d'identitée vérifiables que l'utilisateur présente.
## 3.0 Environnement d\'expérimentation

### Construit avec
* [C#](https://fr.reactjs.org), [React](https://fr.reactjs.org)

### Prérequis

* [npm](https://www.npmjs.com)
* [Docker](https://www.docker.com)
* [von-network](https://github.com/bcgov/von-network)
* [esatus](https://apps.apple.com/ca/app/esatus-wallet/id1496769057)
* [ngrok](https://ngrok.com/)

### Facultatifs

* [VSCode](https://code.visualstudio.com)
* [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)

### Déploiment
Voir les instructions de [déploiment sur OpenShift](openshift/templates/README.md).

## 9.0 Licence
Distribué sous Licence Libre du Québec – Réciprocité (LiLiQ-R). Voir [LICENCE](LICENSE) pour plus d'informations.

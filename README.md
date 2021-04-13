## À propos du projet
Ce dépôt est le siège d'une expérimentation pour mettre en place l'authentification par [justificatifs d'identité vérifiables](https://www.w3.org/TR/vc-data-model) via [OpenID Connect](https://openid.net/connect). 

### Objectifs

- Permettre à un utilisateur de s'authentifier via un fournisseur OpenID Connect, par exemple [Keycloak](https://www.keycloak.org/), en présentant un justificatif d'identité vérifiable.

- Émettre des justificatifs d'identité vérifiables d'authentification aux utilisateurs qui le désirent.

### Contexte

Un [justificatif d'identité vérifiable](https://www.w3.org/TR/vc-data-model) est essentiellement un ensemble d'affirmations délivrées par une autorité de confiance que l'on nomme habituellement: "Émetteur". Ces affirmations sont faites sur un sujet (une personne, une compagnie, etc.) de telle sorte que, lorsqu'elles sont présentées à un vérificateur, leur authenticité peut être vérifiée de manière cryptographique.

OpenID Connect est un protocole d'authentification basé sur [OAuth2.0](https://oauth.net/2). Dans une implémentation standard, une partie utilisatrice va former une demande d'authentification puis elle l'envoie à un fournisseur OpenID de confiance qui se charge d'authentifier l'utilisateur au nom de la partie utilisatrice. Le fournisseur OpenID gère et conserve les identités réelles des utilisateurs et la manière de les authentifier. Twitter, Facebook et Github sont des fournisseurs OpenID Connect parmi les plus populaires. Pour authentifier et identifier un utilisateur, le fournisseur OpenID lui demande, le plus souvent, un nom d'utilisateur et un mot de passe. Avec ces informations, il construit un jeton d'identité et le renvoie à la partie utilisatrice. Ici, la question posée par la partie utilisatrice doit être la suivante : pouvez-vous demander à cet utilisateur de présenter un justificatif d'identité vérifiable qui répond à ces contraintes? Lorsque la partie utilisatrice qui se fie à l'authentification utilise cette méthode, elle peut imposer un ensemble de contraintes, dont voici quelques exemples :

- Émetteur du justificatif - Par qui a-t-il été émis?
- Schéma du justificatif - De quel type de justificatif s'agit-il ?
- Attributs du justificatif - Quels sont les affirmations qui présentent un intérêt ?

Le résultat final pour une partie utilisatrice est le même qu'avec le flux OpenID Connect traditionnel en ce sens qu'elle obtient ce que l'on appelle un jeton d'identité, la seule différence réelle étant la manière dont ce jeton est construit. Plutôt que d'être alimenté sur la base des informations de l'utilisateur détenues par le fournisseur OpenID, il est construit en utilisant les affirmations dans le justificatif d'identité vérifiables que l'utilisateur présente.

### Construit avec
* [C#](https://fr.reactjs.org), [React](https://fr.reactjs.org)

## Pour commencer

### Prérequis

* [npm](https://www.npmjs.com)
* [Docker](https://www.docker.com)
* [von-network](https://github.com/bcgov/von-network)
* [esatus](https://apps.apple.com/ca/app/esatus-wallet/id1496769057)
* [ngrok](https://ngrok.com/)

### Facultatifs

* [VSCode](https://code.visualstudio.com)
* [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)

### Installation

1. Cloner le dépôt.
```
git clone https://github.com/CQEN-QDCE/vc-authn.git
```

2. Créer une url ngrok sur le port 5000 (controlleur) et une autre sur le port 5679 (agent acapy).
```
ngrok http 5000
ngrok http 5679
```

3. Démarrer le service VCAuthn et ses dépendances associées, ainsi qu'une instance de keycloak, en exécutant les commandes suivantes depuis le dossier vc-authn-oidc/docker.
```

./manage build
./manage start GENESIS_URL={url du fichier genesis} NGROK_CONTROLLER_URL={url du controlleur} NGROK_AGENT_URL={url de l'agent acapy}
```

4. Créer le schéma du justificatif d'identité pour l'authentification.
```
curl -X POST "http://localhost:5678/schemas" -H "accept: application/json" -H "X-Api-Key: test" -H "Content-Type: application/json-patch+json" -d "{\"schema_version\": \"1.0\",\"attributes\": [\"username\",\"email\",\"first_name\",\"last_name\"],\"schema_name\": \"CQEN_AUTHENTICATION\"}"
```

5. Créer la définition du justificatif d'identité pour l'authentification.
> **_NOTE:_** La valeur "schema_id" doit être remplacée par celle obtenue à la sortie de l'étape précédente.
```
curl -X POST "http://localhost:5678/credential-definitions" -H "accept: application/json" -H "X-Api-Key: test" -H "Content-Type: application/json-patch+json" -d "{\"support_revocation\": false,\"tag\": \"vc-authn-oidc\",\"schema_id\": "{id du schéma ici}"}"
```
> **_NOTE:_** Conserver la valeur "credential_definition_id"

6. Configurer la requête de présentation.
```
curl -X POST "http://localhost:5000/api/vc-configs" -H "accept: application/json" -H "X-Api-Key: controller-api-key" -H "Content-Type: application/json-patch+json" -d "{ \"id\": \"test-request-config\", \"subject_identifier\": \"email\", \"configuration\": { \"name\": \"Basic Proof\", \"version\": \"1.0\", \"requested_attributes\": [ { \"name\": \"username\", \"restrictions\": [] }, { \"name\": \"email\", \"restrictions\": [] }, { \"name\": \"first_name\", \"restrictions\": [] }, { \"name\": \"last_name\", \"restrictions\": [] } ], \"requested_predicates\": [] }}"
```

7. Installer les paquetages npm depuis le dossier vc-authn-issuer.
```
npm install
npm audit fix
```

8. Modifier le fichier .env avec les valeurs générées à l'étape 4 et 5.

9. Compiler & exécuter.
```
npm run build
npm start
```

10. Pour émettre un justificatif d'identité d'authentification, accéder à l'[émetteur](http://localhost:10000).

11. Suite à l'émission dans le portefeuille, il est possible de s'authentifier via la [page de connexion](http://localhost:5000/vc/connect/authorize?scope=openid+vc_authn&amp;state=EI3kI8RFbpuIqZE_MEI0xsv18NjQOS1lkbrBtj3x2CE.wOX0F5IZd74.security-admin-console&amp;response_type=code&amp;client_id=keycloak&amp;redirect_uri=http%3A%2F%2Flocalhost%3A8180%2Fauth%2Frealms%2Fvc-authn%2Fbroker%2Fvc-authn%2Fendpoint&amp;nonce=eEJ7joxB5CC8j_LaOaw3Dg&amp;pres_req_conf_id=test-request-config) de Keycloak.

### Déboguer avec VSCode

1. Installer Google Chrome et l'extension 'Debugger for Chrome' dans VSCode au besoin.

2. Ouvrir un terminal via l'option 'Nouveau Terminal' du menu 'Terminal'.

3. Fermer tout autre terminal exécutant l'application.

4. Lancer l'application en mode déboggage.
```
npm run debug
```

5. Exécuter le déboggage.

## Déploiment
Voir les instructions de [déploiment sur OpenShift](openshift/templates/README.md).

## Licence
Distribué sous Licence Libre du Québec – Permissive (LiLiQ-P). Voir [LICENCE](licenses/LiLiQ-P11unicode.txt) pour plus d'informations.

# Installation sur OpenShift

## Créer le projet

```
oc new-project vc-authn --display-name="Authentification par justificatif d'identité vérifiable" --description="Preuve de concept pour démontrer la possibilité de s'authentifier à partir d'un justificatif d'identité vérifiable."
oc project vc-authn
```

## Créer les clés de déploiment SSH

```
ssh-keygen -C "openshift-source-builder/vc-authn@github" -f vc-authn -N ''
```

## Configurer la clé privée de déploiment dans le projet OpenShift

```
oc create secret generic vc-authn --from-file=ssh-privatekey=vc-authn --type=kubernetes.io/ssh-auth
oc secrets link builder vc-authn
```

## Configurer la clé publique de déploiment dans le projet GitHub

```
xclip -sel c < vc-authn.pub
ouvrir le site https://github.com/CQEN-QDCE/vc-authn
dans l'onglet 'Settings', sous onglet 'Deploy keys', supprimer la clé nommée 'openshift-source-builder' si elle existe
Ajouter une clé nommée 'openshift-source-builder' et coller le contenu de la clé publique récupérée avec la commande xclip (CTRL-V)
```

## Supprimer les fichiers de clés.

```
rm vc-authn
rm vc-authn.pub
```

## Exécuter les gabarits de création.

```
oc process -f vc-authn-template.yaml | oc apply -f -
oc process -f vc-authn-database-template.yaml | oc apply -f -
oc process -f vc-authn-wallet-template.yaml | oc apply -f -
oc process -f vc-authn-agent-template.yaml | oc apply -f -
oc process -f vc-authn-controller-template.yaml | oc apply -f -
```

## Ajustements post-déploiement

Certains déploiements nécessitent des ajustements supplémentaires après leur exécution. En particulier :

### Contrôleur d'authentification (vc-authn-controller)

1. Accéder à la console OpenShift;

2. Accéder au projet vc-authn;

3. Dans les "Deployment Configs", ouvrir la configuration de déploiment "vc-authn-agent";

4. Dans l'onglet "Environment", modifier les valeurs suivantes:
    
    a. IdentityServer__ConnectionStrings__Database -> Username et Password par les valeurs du secret vc-authn-database

    b. UrlShortenerService__ConnectionStrings__Database -> Copier la valeur de IdentityServer__ConnectionStrings__Database
    
    c. IdentityServer__PublicOrigin -> url publique du contrôleur d'authentification

    d. ACAPY__AgentUrl -> url publique de l'agent d'authentification

    e. UrlShortenerService__BaseUrl -> Copier la valeur de IdentityServer__PublicOrigin et ajouter "/url" à la fin

    f. SessionStorageService__ConnectionStrings_Database -> Copier la valeur de IdentityServer__ConnectionStrings__Database

### Agent d'authentification (vc-authn-agent)

1. Accéder à la console de la chaîne de blocs [chaîne de blocs](http://vonx.pocquebec.org:9000);

2. Dans la section "Authenticate a New DID", créer un nouveau DID public à partir de l'option "Register from seed";

3. Accéder à la console OpenShift;

4. Accéder au projet vc-authn;

5. Dans les "Secrets", ouvrir le secret "vc-authn-agent-wallet-credentials"

6. Replacer les valeurs "seed", "did" et "key" par celles obtenues à l'étape no.2;

7. Dans les "Deployment Configs", ouvrir la configuration de déploiment "vc-authn-agent";

8. Dans l'onglet "Environment", modifier les valeurs suivantes:
    
    a. CONTROLLER_WEBHOOK_URL -> url publique du contrôleur d'authentification
    
    b. AGENT_ENDPOINT -> url publique de l'agent d'authentification
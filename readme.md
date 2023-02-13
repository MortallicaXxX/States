# State

Le projet **`States`** implémente une solution pour gérer l'état global d'une application JavaScript en utilisant la notion d'objets immuables. Cela signifie que lorsque vous voulez mettre à jour l'état de votre application, vous devez en créer une nouvelle instance au lieu de simplement le modifier. Cela peut aider à garantir la stabilité de l'application et faciliter le débogage et le développement.

Le coeur du projet se trouve dans la classe **`State`**. Cette classe définit la structure de l'état global et implémente les méthodes pour ajouter, supprimer et gérer les écoutes pour les mutations de l'état. La classe **`States`** est utilisée pour créer et gérer les instances de la classe **`State`**.

L'API publique du projet est la fonction **`useState`**, qui permet de créer un nouvel état global. L'utilisation de **`useState`** est similaire à celle de la fonction **`useState`** dans React, vous pouvez spécifier une valeur initiale pour l'état et obtenir une référence à la valeur actuelle de l'état ainsi qu'une fonction pour mettre à jour la valeur.

# **Explication**

## **Classe `State`**

La classe **`State`** est la classe principale pour gérer l'état global de l'application. Elle définit une propriété **`value`** qui représente la valeur actuelle de l'état. La propriété **`value`** est définie en utilisant la notation de private field, ce qui signifie qu'elle ne peut pas être directement accédée en dehors de la classe **`State`**.

La méthode **`addMutationListener`** est utilisée pour ajouter une écoute pour les mutations de l'état. Elle accepte un élément HTML de référence et une fonction de rappel en tant que paramètres et renvoie un identifiant d'abonnement unique qui peut être utilisé pour supprimer l'écoute plus tard. L'identifiant d'abonnement est généré en utilisant la fonction **`crypto.randomUUID`**.

La méthode **`removeMutationListener`** est utilisée pour supprimer une écoute pour les mutations de l'état en utilisant l'identifiant d'abonnement. Si l'identifiant d'abonnement n'existe pas, la méthode ne fait rien.

### **La méthode mutator**

La méthode **`mutator`** est utilisée pour obtenir une référence à la valeur actuelle de l'état ainsi qu'une fonction pour mettre à jour la valeur. Cette méthode retourne un tableau contenant deux éléments : un premier élément qui est une référence à l'instance **`State`** en cours, et un second élément qui est une fonction **`(value) => { ... }`** qui peut être utilisée pour mettre à jour la valeur de l'état.

Lorsque cette fonction de mise à jour est appelée, elle appelle d'abord la méthode privée **`#_mutationCallback`** pour déclencher les callbacks d'écoute des mutations, puis elle retourne la valeur mise à jour en appelant la méthode privée **`#_update`**. Cette dernière méthode met à jour la valeur interne **`#_value`** et la retourne.

### **Les callbacks d'écoute des mutations**

Les callbacks d'écoute des mutations sont des fonctions qui sont enregistrées avec la méthode **`addMutationListener`** et qui seront appelées chaque fois que la valeur de l'état sera mise à jour. Cette méthode retourne un identifiant unique qui peut être utilisé pour retirer le callback d'écoute à l'aide de la méthode **`removeMutationListener`**.

Les callbacks d'écoute des mutations sont stockés dans la propriété privée **`#_mutation_callback_stack`** qui est un objet de type **`Map`**. Cet objet stocke les callbacks en associant une clé (l'identifiant unique retourné par **`addMutationListener`**) à un objet qui définit la cible (l'élément HTML) et la fonction de callback.

Avant d'appeler les callbacks, la méthode **`#_mutationCallback`** vérifie si la cible est toujours présente dans le document en utilisant la méthode **`contains`** de l'objet **`ownerDocument`**. Si la cible n'est plus présente, le callback correspondant est retiré de la pile en utilisant **`delete`**.

### **Utilisation avec la fonction `useState`**

La fonction **`useState`** est une fonction d'aide qui permet d'obtenir une référence à un état en utilisant une syntaxe simple et concise. Cette fonction retourne un tableau contenant une référence à l'instance **`State`** et une fonction pour mettre à jour la valeur. La fonction peut être appelée avec un argument qui définit la valeur initiale de l'état.

La fonction **`useState`** utilise une instance de la classe **`States`** pour gérer les états. La classe **`States`** utilise un Map pour stocker les différents états avec leurs valeurs respectives. La fonction **`useState`** ajoutera une nouvelle instance de la classe **`State`** à ce Map et retournera la valeur de **`State`** et la fonction mutatrice pour mettre à jour la valeur.

La classe **`State`** est utilisée pour stocker la valeur d'un état spécifique et permet d'ajouter des observateurs de mutation qui seront déclenchés lorsque la valeur de l'état change. La fonction **`addMutationListerner`** permet d'ajouter un nouvel observateur de mutation en spécifiant un élément de référence HTML et une fonction de rappel. Un identifiant unique sera généré pour l'observateur de mutation et sera utilisé pour le supprimer plus tard en utilisant la fonction **`removeMutationListener`**.

Lorsque la valeur de l'état change, la méthode **`_mutationCallback`** sera appelée pour déclencher tous les observateurs de mutation. Cette méthode vérifie si l'élément de référence de chaque observateur de mutation est toujours présent dans le document, et si c'est le cas, déclenche la fonction de rappel. Si l'élément de référence n'est plus présent, l'observateur de mutation sera supprimé.

En résumé, la classe **`State`** permet de gérer les états de manière centralisée et de déclencher des actions lorsque la valeur d'un état change, tandis que la fonction **`useState`** facilite l'ajout et la gestion des états.

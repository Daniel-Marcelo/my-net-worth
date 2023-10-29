import { admin, db } from "../config/admin";

async function deleteQueryBatch(
  database: admin.firestore.Firestore,
  query: admin.firestore.Query<admin.firestore.DocumentData>,
  resolve: (value?: unknown) => void
) {
  const snapshot = await query.get();

  const batchSize = snapshot.size;
  if (batchSize === 0) {
    // When there are no documents left, we are done
    resolve();
    return;
  }

  // Delete documents in a batch
  const batch = database.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();

  // Recurse on the next process tick, to avoid
  // exploding the stack.
  process.nextTick(() => {
    deleteQueryBatch(database, query, resolve);
  });
}

export class FirebaseService<T> {
  protected readonly collectionRef: admin.firestore.CollectionReference<admin.firestore.DocumentData>;

  constructor(public readonly collectionName: string) {
    this.collectionRef = db.collection(collectionName);
  }

  create(item: T) {
    return this.collectionRef.add(item);
  }

  delete(id: string) {
    return this.collectionRef.doc(id).delete();
  }

  async get(id: string) {
    console.log("Getting item by id", id);
    const document = await this.collectionRef.doc(id).get();
    const item = document.data() as T;

    if (item) {
      return {
        id: document.id,
        ...item,
      } as T;
    }
    throw new Error("Document does not exist");
  }

  async getList() {
    const list = [] as T[];
    const querySnapshot = await this.collectionRef.get();
    querySnapshot.forEach((document) => {
      const item = document.data() as T;
      list.push({
        id: document.id,
        ...item,
      });
    });
    return list;
  }

  deleteList(ids: string[]) {
    const query = this.collectionRef.where(admin.firestore.FieldPath.documentId(), "in", ids).limit(100);
    return new Promise((resolve, reject) => {
      deleteQueryBatch(db, query, resolve).catch(reject);
    });
  }
}

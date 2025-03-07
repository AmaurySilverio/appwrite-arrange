import { Client, Databases, ID } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(import.meta.env.VITE_PROJECT_ID);

const databases = new Databases(client);

const getAll = () => {
  const request = databases.listDocuments(
    import.meta.env.VITE_DATABASE_ID,
    import.meta.env.VITE_CONTACTS_COLLECTION_ID
  );
  return request.then((response) => response.documents);
};
const create = (newObject) => {
  const request = databases.createDocument(
    import.meta.env.VITE_DATABASE_ID,
    import.meta.env.VITE_CONTACTS_COLLECTION_ID,
    ID.unique(),
    newObject
  );
  return request.then((response) => response);
};
const update = ($id, newObject) => {
  const request = databases.updateDocument(
    import.meta.env.VITE_DATABASE_ID,
    import.meta.env.VITE_CONTACTS_COLLECTION_ID,
    $id,
    newObject
  );
  return request.then((response) => response);
};
const remove = ($id) => {
  const request = databases.deleteDocument(
    import.meta.env.VITE_DATABASE_ID,
    import.meta.env.VITE_CONTACTS_COLLECTION_ID,
    $id
  );
  return request.then((response) => response);
};
export default {
  getAll,
  create,
  update,
  remove,
};

/// <reference path="../pb_data/types.d.ts" />

migrate((app) => {
  const projects = new Collection({
    "name": "projects",
    "type": "base",
    "fields": [
      {
        "name": "name",
        "type": "text",
        "required": true
      },
      {
        "name": "slug",
        "type": "text",
        "required": true,
        "unique": true
      },
      {
        "name": "user_id",
        "type": "relation",
        "required": true,
        "collectionId": "_pb_users_auth_",
        "cascadeDelete": true,
        "maxSelect": 1
      },
      {
        "name": "template",
        "type": "text"
      }
    ],
    "listRule": "user_id = @request.auth.id",
    "viewRule": "user_id = @request.auth.id",
    "createRule": "@request.auth.id != ''",
    "updateRule": "user_id = @request.auth.id",
    "deleteRule": "user_id = @request.auth.id"
  })

  app.save(projects)

  const collectionsConfig = new Collection({
    "name": "collections_config",
    "type": "base",
    "fields": [
      {
        "name": "project_id",
        "type": "relation",
        "required": true,
        "collectionId": projects.id,
        "cascadeDelete": true,
        "maxSelect": 1
      },
      {
        "name": "name",
        "type": "text",
        "required": true
      },
      {
        "name": "slug",
        "type": "text",
        "required": true
      },
      {
        "name": "fields",
        "type": "json",
        "required": true
      },
      {
        "name": "is_singleton",
        "type": "bool"
      }
    ],
    "listRule": "project_id.user_id = @request.auth.id",
    "viewRule": "project_id.user_id = @request.auth.id",
    "createRule": "project_id.user_id = @request.auth.id",
    "updateRule": "project_id.user_id = @request.auth.id",
    "deleteRule": "project_id.user_id = @request.auth.id"
  })

  app.save(collectionsConfig)

  const records = new Collection({
    "name": "records",
    "type": "base",
    "fields": [
      {
        "name": "project_id",
        "type": "relation",
        "required": true,
        "collectionId": projects.id,
        "cascadeDelete": true,
        "maxSelect": 1
      },
      {
        "name": "collection_slug",
        "type": "text",
        "required": true
      },
      {
        "name": "data",
        "type": "json",
        "required": true
      }
    ],
    "listRule": "project_id.user_id = @request.auth.id",
    "viewRule": "project_id.user_id = @request.auth.id",
    "createRule": "project_id.user_id = @request.auth.id",
    "updateRule": "project_id.user_id = @request.auth.id",
    "deleteRule": "project_id.user_id = @request.auth.id"
  })

  app.save(records)

  const media = new Collection({
    "name": "media",
    "type": "base",
    "fields": [
      {
        "name": "project_id",
        "type": "relation",
        "required": true,
        "collectionId": projects.id,
        "cascadeDelete": true,
        "maxSelect": 1
      },
      {
        "name": "file",
        "type": "file",
        "required": true,
        "maxSelect": 1,
        "maxSize": 5242880 // 5MB
      },
      {
        "name": "record_id",
        "type": "relation",
        "collectionId": records.id,
        "cascadeDelete": true,
        "maxSelect": 1
      }
    ],
    "listRule": "project_id.user_id = @request.auth.id",
    "viewRule": "project_id.user_id = @request.auth.id",
    "createRule": "project_id.user_id = @request.auth.id",
    "updateRule": "project_id.user_id = @request.auth.id",
    "deleteRule": "project_id.user_id = @request.auth.id"
  })

  app.save(media)

}, (app) => {
  // eliminar en orden inverso
  try {
    const media = app.findCollectionByNameOrId("media")
    app.delete(media)
  } catch(e) {}

  try {
    const records = app.findCollectionByNameOrId("records")
    app.delete(records)
  } catch(e) {}

  try {
    const collectionsConfig = app.findCollectionByNameOrId("collections_config")
    app.delete(collectionsConfig)
  } catch(e) {}

  try {
    const projects = app.findCollectionByNameOrId("projects")
    app.delete(projects)
  } catch(e) {}
})
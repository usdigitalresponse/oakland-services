const resourcesSeed = require("../data/formatted/resources");

exports.seed = function (knex) {
  const uniqueLanguages = new Set();

  resourcesSeed.map((resource, idx) => {
    if (resource.data) {
      for (let i = 0; resource.data["lanaguage__" + i + "__language"]; i++) {
        if (!resource.data["lanaguage__" + i + "__language"].isEmpty) {
          uniqueLanguages.add(resource.data["lanaguage__" + i + "__language"]);
        }
      }
    }
  });

  const languageInserts = Array.from(uniqueLanguages).map((language, idx) => {
    return {
      id: idx + 1,
      name: language,
    };
  });

  const languageIdMap = new Map();
  languageInserts.forEach((languageInsert) => {
    languageIdMap.set(languageInsert.name, languageInsert.id);
  });

  const resourceLanguageInserts = [];
  resourcesSeed.map((resource, idx) => {
    if (resource.data) {
      for (let i = 0; resource.data["lanaguage__" + i + "__language"]; i++) {
        if (!resource.data["lanaguage__" + i + "__language"].isEmpty) {
          resourceLanguageInserts.push({
            resource_id: idx + 1,
            language_id: languageIdMap.get(
              resource.data["lanaguage__" + i + "__language"]
            ),
          });
        }
      }
    }
  });

  return knex("languages")
    .del()
    .then(function () {
      return knex("languages").insert(languageInserts);
    })
    .then(function () {
      return knex("resource_languages").insert(resourceLanguageInserts);
    });
};

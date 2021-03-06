define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "API_JustClick/apidoc/main.js",
    "group": "/home/confirm/Desktop/progetto_ltw+rdc/JustClick/API_JustClick/apidoc/main.js",
    "groupTitle": "/home/confirm/Desktop/progetto_ltw+rdc/JustClick/API_JustClick/apidoc/main.js",
    "name": ""
  },
  {
    "type": "get",
    "url": "/api/getByCategory?q=category",
    "title": "GetByCategory: Returns all courses of a specified category",
    "name": "GetByCategory",
    "description": "<p>Returns all courses of a specified category The category must be one of these (mind the case!): Musica, Informatica, Videogiochi, Moda, Notizie, Scuola, Sport</p>",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404SearchError",
            "description": "<p>No Courses found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"No Courses Found\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -X GET http://localhost:8889/api/search?q=Informatica",
        "type": "curl"
      }
    ],
    "group": "Courses",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  'content-type': 'application/json'\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "Array",
            "description": "<p>[{Object}] Array that conatins a list with all courses of the selected category</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "[{\n     \"_id\":\"InformaticGeek\",\n     \"_rev\":\"280-25a03b9f863e6d2c0e1cf47db12309e1\",\n     \"courseName\":\"InformaticGeek\",\n     \"author\":\"Valerio\",\n     \"desc\":\"undefined\",\n     \"image\":\"loaded\",\n     \"category\":\"Informatica\",\n     \"courseFollower\":0,\n     \"coursePublications\":0,\n     \"firstEvidenza\":[],\n     \"secondEvidenza\":[],\n     \"thirdEvidenza\":[],\n     \"courses\":[],\n     \"follower\": []\n }]",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "API_JustClick/API_JustClick.js",
    "groupTitle": "Courses",
    "sampleRequest": [
      {
        "url": "http://localhost:8889/api/getByCategory?q=category"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/getCorso/:courseName",
    "title": "GetCorso: Returns the course named courseName",
    "name": "GetCorso",
    "description": "<p>Returns the public data for the course named courseName</p>",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404SearchError",
            "description": "<p>Course Not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Course Not Found\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -X GET http://localhost:8889/api/getCorso/InformaticGeek",
        "type": "curl"
      }
    ],
    "group": "Courses",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  'content-type': 'application/json'\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Object",
            "description": "<p>with the public data of the specified course</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     \"_id\":\"InformaticGeek\",\n     \"_rev\":\"280-25a03b9f863e6d2c0e1cf47db12309e1\",\n     \"courseName\":\"InformaticGeek\",\n     \"author\":\"Valerio\",\n     \"desc\":\"undefined\",\n     \"image\":\"loaded\",\n     \"category\":\"Informatica\",\n     \"courseFollower\":0,\n     \"coursePublications\":0,\n     \"firstEvidenza\":[],\n     \"secondEvidenza\":[],\n     \"thirdEvidenza\":[],\n     \"courses\":[],\n     \"follower\": []\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "API_JustClick/API_JustClick.js",
    "groupTitle": "Courses",
    "sampleRequest": [
      {
        "url": "http://localhost:8889/api/getCorso/:courseName"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/getMateriale/:courseName",
    "title": "GetMateriale: Returns the material of courseName",
    "name": "GetCorso",
    "description": "<p>Returns the material of the course named courseName (if it exists)</p>",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404SearchError",
            "description": "<p>Material Not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Material Not Found\"\n}\n\nHTTP/1.1 400 Bad Request\n{\n  \"error\": \"Course Pippo does not exist\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -X GET http://localhost:8889/api/getMateriale/InformaticGeek",
        "type": "curl"
      }
    ],
    "group": "Courses",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  'content-type': 'application/json'\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "Array[]",
            "description": "<p>Array with the material of the specified course</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "[\n     [\"create.jpg\",\"\",\"image/jpg\"],\n     [\"coldplay.mp3\",\"that's a song!\",\"audio/mpeg\"]\n ]",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "API_JustClick/API_JustClick.js",
    "groupTitle": "Courses",
    "sampleRequest": [
      {
        "url": "http://localhost:8889/api/getMateriale/:courseName"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/getPopolari",
    "title": "GetPopolari: Returns popular courses",
    "name": "GetPopolari",
    "description": "<p>gets all the popular courses returned in a JSON file</p> <p>example object: { corsi: [ {course1...},{course2...}, ...]}</p>",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404PopularError",
            "description": "<p>No popular courses found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"No Popular Courses Found\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -X GET http://localhost:8889/api/getPopolari",
        "type": "curl"
      }
    ],
    "group": "Courses",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  'content-type': 'application/json'\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "Course",
            "description": "<p>Object that conatins a list with all popular courses</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ \n  \"corsi\":[{\n     \"_id\":\"InformaticGeek\",\n     \"_rev\":\"280-25a03b9f863e6d2c0e1cf47db12309e1\",\n     \"courseName\":\"InformaticGeek\",\n     \"author\":\"Valerio\",\n     \"desc\":\"undefined\",\n     \"image\":\"loaded\",\n     \"category\":\"Informatica\",\n     \"courseFollower\":0,\n     \"coursePublications\":0,\n     \"firstEvidenza\":[],\n     \"secondEvidenza\":[],\n     \"thirdEvidenza\":[],\n     \"courses\":[],\n     \"follower\": []\n   }]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "API_JustClick/API_JustClick.js",
    "groupTitle": "Courses",
    "sampleRequest": [
      {
        "url": "http://localhost:8889/api/getPopolari"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/search?search=regex",
    "title": "Search: Returns all courses whose name matches regex",
    "name": "Search",
    "description": "<p>Returns all courses whose name matches regex (case insensitive)</p>",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404SearchError",
            "description": "<p>No Courses found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"No Courses Found\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -X GET http://localhost:8889/api/search?search=inf",
        "type": "curl"
      }
    ],
    "group": "Courses",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  'content-type': 'application/json'\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "Array[]",
            "description": "<p>Array that conatins a list with all searched courses</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "[{\n     \"_id\":\"InformaticGeek\",\n     \"_rev\":\"280-25a03b9f863e6d2c0e1cf47db12309e1\",\n     \"courseName\":\"InformaticGeek\",\n     \"author\":\"Valerio\",\n     \"desc\":\"undefined\",\n     \"image\":\"loaded\",\n     \"category\":\"Informatica\",\n     \"courseFollower\":0,\n     \"coursePublications\":0,\n     \"firstEvidenza\":[],\n     \"secondEvidenza\":[],\n     \"thirdEvidenza\":[],\n     \"courses\":[],\n     \"follower\": []\n }]",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "API_JustClick/API_JustClick.js",
    "groupTitle": "Courses",
    "sampleRequest": [
      {
        "url": "http://localhost:8889/api/search?search=regex"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/corsiUtente",
    "title": "GetCorsiUtente: Returns a user's courses",
    "name": "GetCorsiUtente",
    "description": "<p>returns the json file with the courses data of the specified user</p> <p>example object: { courses: [{corso1...},{corso2...} ...]}</p>",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404PopularError",
            "description": "<p>User not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"User not found\"\n}",
          "type": "json"
        }
      ]
    },
    "group": "Users",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -X POST http://localhost:8889/api/corsiUtente?username=prova1",
        "type": "curl"
      }
    ],
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  'content-type': 'application/json'\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "Course",
            "description": "<p>Object that conatins the courses data of a specified user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"id\": \"123456\",\n  \"rev\": \"a1b2c3\",\n  \"courseName\": \"Name\",\n  \"desc\": desc,\n  ...\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "API_JustClick/API_JustClick.js",
    "groupTitle": "Users",
    "sampleRequest": [
      {
        "url": "http://localhost:8889/api/corsiUtente"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/profiloUtente",
    "title": "GetPofiloUtente: Returns a user's profile",
    "name": "GetProfiloUtente",
    "description": "<p>returns the json file with the specified user data</p> <p>example object: { user: {info1,info2, ...}}</p>",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404PopularError",
            "description": "<p>User not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"User not found\"\n}",
          "type": "json"
        }
      ]
    },
    "group": "Users",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -X POST http://localhost:8889/api/profiloUtente?username=prova55",
        "type": "curl"
      }
    ],
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  'content-type': 'application/json'\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "User",
            "description": "<p>Object that conatins the data of a user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"username\": \"Username\",\n  \"Name\": \"NameUser\",\n  \"Surname\": \"SurnameUser\",\n  \"Email\": emailUser@mail.domain,\n  ...\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "API_JustClick/API_JustClick.js",
    "groupTitle": "Users",
    "sampleRequest": [
      {
        "url": "http://localhost:8889/api/profiloUtente"
      }
    ]
  }
] });
